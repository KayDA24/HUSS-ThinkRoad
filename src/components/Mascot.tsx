import { useState } from "react";
import mascotImage from "../assets/thinkingroad-mascot.png";

type MascotProps = {
  size?: "small" | "medium" | "large";
  calm?: boolean;
  label?: string;
};

export function Mascot({ size = "medium", calm = false, label = "ThinkingRoad 마스코트" }: MascotProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`mascot mascot-${size} ${calm ? "mascot-calm" : ""}`} aria-label={label}>
      {!failed ? <img src={mascotImage} alt="" onError={() => setFailed(true)} /> : <MascotFallback />}
    </div>
  );
}

function MascotFallback() {
  return (
    <div className="mascot-fallback">
      <span className="mascot-face">
        <i />
        <i />
      </span>
    </div>
  );
}
