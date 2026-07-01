import { ArrowUpRight, CheckCircle2, Clock3, TrendingUp, Users } from "lucide-react";
import { Badge, Card, ProgressBar } from "../components/ui";
import { assignments, recentStudents } from "../data/thinkroadData";
import { ProfessorLayout } from "../layouts/ProfessorLayout";

export function ProfessorDashboard() {
  const stats = [
    { label: "진행 중 과제", value: "3개", icon: Clock3 },
    { label: "제출 완료 학생", value: "28 / 32명", icon: CheckCircle2 },
    { label: "평균 사고흐름 완성도", value: "86%", icon: TrendingUp },
    { label: "평균 사고력 성장", value: "+24%", icon: ArrowUpRight }
  ];

  return (
    <ProfessorLayout title="전체 수업 현황">
      <section className="stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} variant="professor" className="stat-card">
              <Icon size={22} />
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </Card>
          );
        })}
      </section>

      <section className="professor-two-column">
        <Card variant="professor">
          <div className="section-heading">
            <h2>진행 중 과제</h2>
            <Badge tone="blue">3개 운영 중</Badge>
          </div>
          <div className="assignment-stack">
            {assignments.map((assignment) => (
              <article key={assignment.title} className="compact-assignment">
                <div>
                  <strong>{assignment.title}</strong>
                  <span>{assignment.type} · 마감일 {assignment.dueDate}</span>
                </div>
                <ProgressBar value={(assignment.submitted / assignment.total) * 100} />
                <small>{assignment.submitted}/{assignment.total}명 제출</small>
              </article>
            ))}
          </div>
        </Card>

        <Card variant="professor">
          <div className="section-heading">
            <h2>최근 제출 학생</h2>
            <Users size={20} />
          </div>
          <div className="student-list">
            {recentStudents.map((student, index) => (
              <div key={student}>
                <span>{student}</span>
                <small>{index + 1}시간 전 제출</small>
              </div>
            ))}
          </div>
        </Card>
      </section>

    </ProfessorLayout>
  );
}
