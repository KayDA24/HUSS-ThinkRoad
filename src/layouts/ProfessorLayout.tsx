import type { ReactNode } from "react";
import { ProfessorHeader } from "../components/ProfessorHeader";
import { ProfessorSidebar } from "../components/ProfessorSidebar";

export function ProfessorLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="professor-shell">
      <ProfessorSidebar />
      <main className="professor-main">
        <ProfessorHeader title={title} />
        {children}
      </main>
    </div>
  );
}
