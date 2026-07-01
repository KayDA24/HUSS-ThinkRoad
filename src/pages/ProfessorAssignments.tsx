import { ExternalLink, Plus, Trash2, UploadCloud, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Badge, Card, ProgressBar } from "../components/ui";
import { assignments } from "../data/thinkroadData";
import { ProfessorLayout } from "../layouts/ProfessorLayout";

type AssignmentCard = {
  title: string;
  description?: string;
  type: string;
  submitted: number;
  total: number;
  status: string;
  tone: string;
  submissionFormat?: string;
  criteria?: string;
  references?: string;
  coachingRules?: string[];
};

const storageKey = "thinkroad-professor-assignments";
const coachingOptions = ["정답 제공 금지", "모범답안 제공 금지", "예시 결론 제공 금지", "질문 기반 사고 확장만 허용"];

function loadSavedAssignments() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved) as AssignmentCard[];
    return parsed.filter((assignment) => assignment.title !== "2");
  } catch {
    localStorage.removeItem(storageKey);
    return [];
  }
}

function isUserCreatedAssignment(assignment: AssignmentCard) {
  return !assignments.some((base) => base.title === assignment.title);
}

export function ProfessorAssignments() {
  const [assignmentList, setAssignmentList] = useState<AssignmentCard[]>(assignments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    submissionFormat: "",
    criteria: "",
    references: "",
    coachingRules: coachingOptions
  });

  useEffect(() => {
    const parsed = loadSavedAssignments();
    localStorage.setItem(storageKey, JSON.stringify(parsed));
    if (parsed.length > 0) {
      setAssignmentList([...assignments, ...parsed]);
    }
  }, []);

  function handleDelete(title: string) {
    const nextSavedAssignments = loadSavedAssignments().filter((assignment) => assignment.title !== title);
    localStorage.setItem(storageKey, JSON.stringify(nextSavedAssignments));
    setAssignmentList([...assignments, ...nextSavedAssignments]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim()) return;

    const newAssignment: AssignmentCard = {
      title: form.title.trim(),
      description: form.description.trim(),
      type: form.type.trim() || "새 과제",
      submitted: 0,
      total: 0,
      status: "미시작",
      tone: "draft",
      submissionFormat: form.submissionFormat.trim(),
      criteria: form.criteria.trim(),
      references: form.references.trim(),
      coachingRules: form.coachingRules
    };
    const savedAssignments = assignmentList.filter(isUserCreatedAssignment);
    const nextSavedAssignments = [...savedAssignments, newAssignment];

    localStorage.setItem(storageKey, JSON.stringify(nextSavedAssignments));
    setAssignmentList([...assignments, ...nextSavedAssignments]);
    setForm({
      title: "",
      description: "",
      type: "",
      submissionFormat: "",
      criteria: "",
      references: "",
      coachingRules: coachingOptions
    });
    setIsModalOpen(false);
  }

  function toggleCoachingRule(rule: string) {
    setForm((previous) => ({
      ...previous,
      coachingRules: previous.coachingRules.includes(rule)
        ? previous.coachingRules.filter((item) => item !== rule)
        : [...previous.coachingRules, rule]
    }));
  }

  return (
    <ProfessorLayout title="과제 목록">
      <div className="assignment-page-toolbar">
        <div>
          <p className="eyebrow blue-text">과제 설계</p>
          <h2>사고 과정을 드러내는 과제를 만들고 관리하세요.</h2>
        </div>
        <button className="create-assignment-button" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> 새 과제 생성
        </button>
      </div>

      <section className="assignment-card-grid">
        {assignmentList.map((assignment) => (
          <Card key={assignment.title} variant="professor" className="assignment-card">
            <div className="assignment-card-top">
              <Badge tone={assignment.tone === "done" ? "green" : assignment.tone === "review" ? "yellow" : assignment.tone === "draft" ? "gray" : "blue"}>
                {assignment.status}
              </Badge>
              <div className="assignment-card-actions">
                <span>{assignment.type}</span>
                {isUserCreatedAssignment(assignment) ? (
                  <button type="button" className="icon-button assignment-delete-button" aria-label="과제 삭제" onClick={() => handleDelete(assignment.title)}>
                    <Trash2 size={16} />
                  </button>
                ) : null}
              </div>
            </div>
            <h2>{assignment.title}</h2>
            {assignment.description ? <p className="assignment-description">{assignment.description}</p> : null}
            <div className="submission-row">
              <span>제출 현황</span>
              <strong>{assignment.total === 0 ? "0 / 0명" : `${assignment.submitted}/${assignment.total}명`}</strong>
            </div>
            <ProgressBar value={assignment.total === 0 ? 0 : (assignment.submitted / assignment.total) * 100} />
            <button className="outline-button">
              과제 관리하기 <ExternalLink size={16} />
            </button>
          </Card>
        ))}
      </section>

      {isModalOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <form className="assignment-modal" onSubmit={handleSubmit}>
            <div className="modal-title-row">
              <div>
                <p className="eyebrow blue-text">새 과제 생성</p>
                <h2>ThinkRoad 과제 설계</h2>
              </div>
              <button type="button" className="icon-button" aria-label="닫기" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <label>
              과제명
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="예) 생성형 AI 시대, 대학 과제는 결과물보다 사고 과정을 평가해야 하는가?"
                required
              />
            </label>
            <label>
              과제 설명
              <textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                placeholder="예) 생성형 AI로 누구나 그럴듯한 과제물을 빠르게 만들 수 있는 시대입니다. 학생이 어떤 과정을 거쳐 자기 생각을 만들었는지도 함께 평가할 수 있는 방식을 제안하세요."
                rows={3}
              />
            </label>
            <div className="form-grid-two">
              <label>
                과제 유형
                <input value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} placeholder="예) 인문·사회 논증형 과제" />
              </label>
              <label>
                제출 형식
                <input
                  value={form.submissionFormat}
                  onChange={(event) => setForm({ ...form, submissionFormat: event.target.value })}
                  placeholder="예) 최종 글 + 사고흐름 기록"
                />
              </label>
            </div>
            <label>
              평가 기준
              <input
                value={form.criteria}
                onChange={(event) => setForm({ ...form, criteria: event.target.value })}
                placeholder="예) 관점 확장, 비판적 사고, 논리적 구조, 근거 활용, 주장 정교화"
              />
            </label>
            <label>
              참고 문서
              <div className="file-upload-placeholder">
                <UploadCloud size={22} />
                <span>PDF, 강의자료, 참고문헌을 추가하세요</span>
              </div>
            </label>
            <fieldset>
              <legend>AI 코칭 방식</legend>
              <div className="coaching-options">
                {coachingOptions.map((option) => (
                  <label key={option}>
                    <input type="checkbox" checked={form.coachingRules.includes(option)} onChange={() => toggleCoachingRule(option)} />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="modal-actions">
              <button type="button" className="outline-button" onClick={() => setIsModalOpen(false)}>
                취소
              </button>
              <button type="submit" className="create-assignment-button">
                과제 생성하기
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </ProfessorLayout>
  );
}
