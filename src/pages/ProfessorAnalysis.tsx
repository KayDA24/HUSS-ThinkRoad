import { ArrowRight, BrainCircuit } from "lucide-react";
import { Badge, Card } from "../components/ui";
import { flowSteps, radarAxes } from "../data/thinkroadData";
import { ProfessorLayout } from "../layouts/ProfessorLayout";

export function ProfessorAnalysis() {
  return (
    <ProfessorLayout title="사고흐름 분석">
      <section className="analysis-grid">
        <Card variant="professor" className="thinking-path-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow blue-text">학생 제출 분석</p>
              <h2>김지훈</h2>
            </div>
            <div className="analysis-heading-tools">
              <Badge tone="green">제출 완료</Badge>
            </div>
          </div>
          <div className="thinking-flow-graph">
            {flowSteps.map((step, index) => {
              const nodeType = index === 0 ? "start" : index === flowSteps.length - 1 ? "final" : "middle";
              return (
                <div className="flow-graph-item" key={step.title}>
                  <div className={`thinking-node ${nodeType}`}>
                    <span className="node-index">{index + 1}</span>
                    <strong>{step.title}</strong>
                    <p>{step.summary}</p>
                  </div>
                  {index < flowSteps.length - 1 && index !== 3 ? (
                    <div className="node-connector" aria-hidden="true">
                      <span />
                      <ArrowRight size={18} />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="analysis-summary-grid">
            <div>
              <span>주장 변화</span>
              <strong>결과물 중심 평가의 한계 인식 → 과정 포함 평가 설계</strong>
            </div>
            <div>
              <span>핵심 전환점</span>
              <strong>AI 사용 여부보다 평가 방식 설계가 중요함</strong>
            </div>
            <div>
              <span>교수 확인 포인트</span>
              <strong>최종 주장, 전환 지점, 과제 유형별 모델링</strong>
            </div>
          </div>
        </Card>

        <Card variant="professor" className="radar-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow blue-text">사고력 성장 분석</p>
              <h2>초기 수준과 최종 수준 비교</h2>
            </div>
            <BrainCircuit size={24} />
          </div>
          <RadarChart />
          <div className="legend-row">
            <span><i className="initial" />초기 수준</span>
            <span><i className="final" />최종 수준</span>
          </div>
          <div className="radar-growth-summary">
            <strong>가장 큰 성장을 보인 영역</strong>
            <span>관점 확장: 2 → 4</span>
            <span>비판적 사고: 3 → 5</span>
            <span>주장 정교화: 2 → 4</span>
          </div>
        </Card>
      </section>
    </ProfessorLayout>
  );
}

function RadarChart() {
  const size = 360;
  const center = size / 2;
  const radius = 125;
  const rings = [0.25, 0.5, 0.75, 1];
  const initialPoints = radarAxes.map((axis, index) => point(index, axis.initial / 100));
  const finalPoints = radarAxes.map((axis, index) => point(index, axis.final / 100));

  function point(index: number, ratio: number) {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / radarAxes.length;
    return {
      x: center + Math.cos(angle) * radius * ratio,
      y: center + Math.sin(angle) * radius * ratio
    };
  }

  function polygon(points: Array<{ x: number; y: number }>) {
    return points.map((p) => `${p.x},${p.y}`).join(" ");
  }

  return (
    <svg className="radar-svg" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="사고력 성장 레이더 차트">
      {rings.map((ring) => (
        <polygon key={ring} points={polygon(radarAxes.map((_, index) => point(index, ring)))} className="radar-ring" />
      ))}
      {radarAxes.map((axis, index) => {
        const end = point(index, 1);
        const label = point(index, 1.18);
        return (
          <g key={axis.label}>
            <line x1={center} y1={center} x2={end.x} y2={end.y} className="radar-axis" />
            <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle">
              {axis.label}
            </text>
          </g>
        );
      })}
      <polygon points={polygon(initialPoints)} className="radar-area initial-area" />
      <polygon points={polygon(finalPoints)} className="radar-area final-area" />
      {finalPoints.map((p, index) => (
        <circle key={radarAxes[index].label} cx={p.x} cy={p.y} r="4" className="radar-dot" />
      ))}
    </svg>
  );
}
