import { BarChart3, Bell, ClipboardList, LayoutDashboard, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Mascot } from "./Mascot";

const menu = [
  { label: "대시보드", path: "/professor/dashboard", icon: LayoutDashboard },
  { label: "과제 목록", path: "/professor/assignments", icon: ClipboardList },
  { label: "학생 제출 현황", path: "/professor/submissions", icon: Users },
  { label: "사고흐름 분석", path: "/professor/analysis", icon: BarChart3 }
];

export function ProfessorSidebar() {
  return (
    <aside className="professor-sidebar">
      <div className="professor-brand">
        <Mascot size="small" calm />
        <div>
          <strong>ThinkRoad</strong>
          <span>교수자 도구</span>
        </div>
      </div>
      <nav>
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}>
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="sidebar-notice">
        <Bell size={18} />
        <p>오늘 검토할 제출물이 4건 남아 있습니다.</p>
      </div>
    </aside>
  );
}
