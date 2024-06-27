import React from "react";
import "./App.css";
import Calendar from "./Calendar";
import dayjs from "dayjs";

function App() {
  return (
    <div className="App">
      <Calendar
        value={dayjs("2024-6-26")}
        // locale="en-US"
        // dateInnerContent={(value) => {
        //   return (
        //     <div>
        //       <p style={{ background: "yellowgreen", height: "30px" }}>
        //         {value.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}
      />
    </div>
  );
}

export default App;
