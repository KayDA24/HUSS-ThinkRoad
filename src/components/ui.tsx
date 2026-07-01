import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: "student" | "professor" | "plain";
};

export function Card({ children, className = "", variant = "plain" }: CardProps) {
  return <section className={`card card-${variant} ${className}`}>{children}</section>;
}

type BadgeProps = {
  children: ReactNode;
  tone?: "pink" | "blue" | "green" | "yellow" | "gray";
};

export function Badge({ children, tone = "blue" }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function ProgressBar({ value, tone = "blue" }: { value: number; tone?: "blue" | "pink" }) {
  return (
    <div className={`progress progress-${tone}`} aria-label={`${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
