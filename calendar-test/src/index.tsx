import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PicChart } from "./components/PicChart";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PicChart ratio={1} />
    <PicChart ratio={0.9} />
    <PicChart ratio={0.8} />
    <PicChart ratio={0.7} />
    <PicChart ratio={0.6} />
    <PicChart ratio={0.5} />
    <PicChart ratio={0.4} />
    <PicChart ratio={0.3} />
    <PicChart ratio={0.2} />
    <PicChart ratio={0.1} />
    <PicChart ratio={0} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
