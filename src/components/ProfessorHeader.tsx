import { Bell } from "lucide-react";

export function ProfessorHeader({ title }: { title: string }) {
  return (
    <header className="professor-header">
      <div>
        <p className="eyebrow blue-text">ThinkRoad 교수자 대시보드</p>
        <h1>{title}</h1>
      </div>
      <div className="header-actions">
        <button aria-label="알림">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}
