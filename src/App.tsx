import React from "react";
import "./App.css";
import Calendar from "./Calendar";
import dayjs from "dayjs";

function App() {
  return (
    <div className="App">
      <Calendar value={dayjs()}></Calendar>
    </div>
  );
}

export default App;
