import { Check, CheckCircle2, Map, MessageCircle } from "lucide-react";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Mascot } from "../components/Mascot";
import { Card } from "../components/ui";
import { studentTurns } from "../data/thinkroadData";
import { StudentLayout } from "../layouts/StudentLayout";

type ChatMessage = {
  id: string;
  type: "ai" | "student";
  turnIndex: number;
  title?: string;
  insight?: string;
  text: string;
  record?: string;
};

export function StudentDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "ai-0",
      type: "ai",
      turnIndex: 0,
      title: studentTurns[0].title,
      insight: studentTurns[0].insight,
      text: studentTurns[0].message
    }
  ]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [answer, setAnswer] = useState(compactAnswer(studentTurns[0].student));
  const [isThinking, setIsThinking] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedTurns = useMemo(() => messages.filter((message) => message.type === "student").length, [messages]);
  const isComplete = completedTurns === studentTurns.length;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
    };
  }, []);

  function handleSend() {
    if (isThinking) return;

    if (isComplete) {
      setSubmitted(true);
      return;
    }

    const trimmedAnswer = compactAnswer(answer).trim();
    if (!trimmedAnswer) return;

    const nextTurnIndex = currentTurn + 1;
    const nextMessages: ChatMessage[] = [
      {
        id: `student-${currentTurn}`,
        type: "student",
        turnIndex: currentTurn,
        text: trimmedAnswer,
        record: studentTurns[currentTurn].record
      }
    ];

    setMessages((previous) => [...previous, ...nextMessages]);
    setAnswer("");

    if (nextTurnIndex >= studentTurns.length) {
      setCurrentTurn(studentTurns.length - 1);
      return;
    }

    setIsThinking(true);
    thinkingTimerRef.current = setTimeout(() => {
      const nextTurn = studentTurns[nextTurnIndex];
      setMessages((previous) => [
        ...previous,
        {
          id: `ai-${nextTurnIndex}`,
          type: "ai",
          turnIndex: nextTurnIndex,
          title: nextTurn.title,
          insight: nextTurn.insight,
          text: nextTurn.message
        }
      ]);
      setCurrentTurn(nextTurnIndex);
      setAnswer(compactAnswer(nextTurn.student));
      setIsThinking(false);
    }, 1200);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <StudentLayout>
      <main className="student-dashboard">
        <section className="student-hero">
          <div>
            <h1>ThinkRoad 학생 포털</h1>
          </div>
        </section>

        <section className="student-grid">
          <Card variant="student" className="assignment-panel">
            <p className="eyebrow pink-text">과제 요약</p>
            <h2>결과보다 사고 과정을 평가할 수 있을까?</h2>
            <p>
              생성형 AI가 글쓰기 결과물을 빠르게 만들어내는 시대에, 대학 과제 평가는 학생의 사고 변화와
              근거 형성 과정을 어떻게 확인해야 하는지 탐구합니다.
            </p>
            <div className="summary-list">
              <span>핵심 역량: 비판적 사고</span>
              <span>평가 방식: 과정 기록 + 최종 주장</span>
            </div>
          </Card>

          <Card variant="student" className="conversation-panel">
            <div className="panel-title">
              <MessageCircle size={21} />
              <h2>ThinkRoad 사고 코칭 대화</h2>
            </div>
            <div className="chat-list">
              {messages.map((message) => (
                <article className={`chat-turn ${message.type === "ai" ? "ai-turn" : "student-turn"}`} key={message.id}>
                  {message.type === "ai" ? (
                    <>
                      <Mascot size="medium" />
                      <div className="coach-bubble">
                        <h3>{message.title}</h3>
                        <p>{message.text}</p>
                      </div>
                    </>
                  ) : (
                    <div className="student-message-stack">
                      <div className="student-bubble">
                        <strong>나의 답변</strong>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  )}
                </article>
              ))}
              {isThinking ? (
                <article className="chat-turn ai-turn">
                  <Mascot size="medium" />
                  <div className="coach-bubble thinking-bubble compact-thinking">
                    <div className="thinking-dots" aria-label="생각 중">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </article>
              ) : null}
              <div ref={messagesEndRef} />
            </div>
            <div className="student-input">
              <textarea
                value={isThinking ? "" : isComplete ? "모든 사고 코칭을 완료했습니다. 최종 과제를 제출할 수 있습니다." : compactAnswer(answer)}
                onChange={(event) => setAnswer(compactAnswer(event.target.value))}
                onKeyDown={handleKeyDown}
                readOnly={isComplete || isThinking}
                placeholder={compactAnswer(studentTurns[currentTurn].student)}
                rows={2}
              />
              <button onClick={handleSend} disabled={isThinking || (!isComplete && !answer.trim())}>
                {isComplete ? "최종 과제 제출하기" : isThinking ? "생각 중" : "보내기"}
              </button>
            </div>
          </Card>

          <Card variant="student" className="flow-map-panel">
            <div className="panel-title">
              <Map size={21} />
              <h2>사고 흐름 맵</h2>
            </div>
            <div className="flow-map">
              {studentTurns.slice(0, 7).map((turn, index) => {
                const state = index < completedTurns ? "done" : index === currentTurn && !isComplete ? "current" : "future";
                return (
                  <div key={turn.insight} className={`flow-node ${state}`}>
                    <span>{state === "done" ? <Check size={17} /> : index + 1}</span>
                    <div>
                      <strong>{turn.insight}</strong>
                      <small>{state === "done" ? "완료됨" : state === "current" ? "현재 단계" : "다음 단계 대기"}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>
      </main>

      {submitted ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="submit-modal">
            <CheckCircle2 size={48} />
            <h2>최종 과제 제출 완료</h2>
            <p>사고 코칭 기록과 최종 주장이 함께 제출되었습니다.</p>
            <button onClick={() => setSubmitted(false)}>확인</button>
          </div>
        </div>
      ) : null}

      <div className="student-orb orb-one" />
      <div className="student-orb orb-two" />
    </StudentLayout>
  );
}

function compactAnswer(value: string) {
  return value.replace(/\n{2,}/g, "\n");
}
