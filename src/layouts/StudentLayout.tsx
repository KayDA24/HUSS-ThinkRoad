import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Mascot } from "../components/Mascot";

export function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="student-shell">
      <header className="student-header">
        <Link to="/" className="student-brand" aria-label="홈으로 이동">
          <Mascot size="small" />
          <div>
            <strong>ThinkRoad</strong>
            <span>학생 포털</span>
          </div>
        </Link>
        <nav>
          <Link to="/professor/dashboard">교수자 화면 보기</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
