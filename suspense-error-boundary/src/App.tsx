import React, { Suspense } from "react";
import "./App.css";
// 异步加载暂时用不到的路由
const LazyAaa = React.lazy(() => import("./Aaa"));

function App() {
  return (
    <div>
      <Suspense fallback={"lading..."}>
        <LazyAaa></LazyAaa>
      </Suspense>
    </div>
  );
}

export default App;
