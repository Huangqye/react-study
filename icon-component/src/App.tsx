import "./App.css";
import { createFromIconFont } from "./Icon/createFrontIconfont";
import { IconAdd } from "./Icon/icons/IconAdd";

const IconFont = createFromIconFont(
  "//at.alicdn.com/t/c/font_4066996_d052yem1to8.js"
);

function App() {
  return (
    <div style={{ padding: "50px" }}>
      <IconAdd size="40px" spin style={{ color: "blue" }}></IconAdd>
      <IconFont type="icon-zhongdian" size="40px" fill="blue"></IconFont>
    </div>
  );
}

export default App;
