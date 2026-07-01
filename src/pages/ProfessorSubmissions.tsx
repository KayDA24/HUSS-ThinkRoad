import { useMemo, useState } from "react";
import { Badge, Card } from "../components/ui";
import { submissions } from "../data/thinkroadData";
import { ProfessorLayout } from "../layouts/ProfessorLayout";

const filters = ["전체", "제출 완료", "검토 중", "작성 중", "미제출"];

export function ProfessorSubmissions() {
  const [filter, setFilter] = useState("전체");
  const filteredSubmissions = useMemo(
    () => (filter === "전체" ? submissions : submissions.filter((submission) => submission.status === filter)),
    [filter]
  );

  return (
    <ProfessorLayout title="학생 제출 현황">
      <Card variant="professor" className="submissions-card">
        <div className="filter-row">
          {filters.map((item) => (
            <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="submission-table">
          <div className="table-head">
            <span>학생명</span>
            <span>과제</span>
            <span>제출 상태</span>
            <span>사고흐름 단계</span>
            <span>최종 주장 요약</span>
            <span>핵심 전환점</span>
            <span>관리</span>
          </div>
          {filteredSubmissions.map((submission) => (
            <div className="table-row" key={submission.name}>
              <strong>{submission.name}</strong>
              <span>{submission.assignment}</span>
              <Badge tone={getStatusTone(submission.status)}>{submission.status}</Badge>
              <span>{submission.stage}</span>
              <span>{submission.claim}</span>
              <span>{submission.turningPoint}</span>
              <button>보기</button>
            </div>
          ))}
        </div>
      </Card>
    </ProfessorLayout>
  );
}

function getStatusTone(status: string) {
  if (status === "제출 완료") return "green";
  if (status === "검토 중") return "blue";
  if (status === "작성 중") return "yellow";
  return "gray";
}
