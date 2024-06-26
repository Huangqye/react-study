import { memo } from "react";
import "./index.css";

export const PicChart: React.FC<{ ratio: number }> = memo(({ ratio }) => {
  const r = ratio <= 0.5 ? ratio : ratio - 0.5;
  return (
    <div className="pie">
      {/* <div
        style={{
          backgroundColor: ratio <= 0.5 ? "inherit" : "blue",
          transform: `rotate(${r}turn)`,
        }}
      ></div> */}
    </div>
  );
});
