import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Mascot } from "../components/Mascot";

export function HomePage() {
  return (
    <main className="home-page">
      <div className="home-card">
        <div className="home-mascot">
          <Mascot size="large" />
        </div>
        <p className="eyebrow">ThinkRoad 웹 프로토타입</p>
        <h1>사고 과정을 평가하는 수업 대시보드</h1>
        <p>학생은 단계별 코칭 대화를 진행하고, 교수자는 제출 현황과 사고흐름 분석을 확인할 수 있습니다.</p>
        <div className="home-actions">
          <Link to="/student" className="primary-link pink-link">
            학생 대시보드 보기 <ArrowRight size={18} />
          </Link>
          <Link to="/professor/dashboard" className="primary-link blue-link">
            교수자 대시보드 보기 <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
