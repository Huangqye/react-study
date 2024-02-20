import React from "react";
import "./App.css";
import Calendar from "./Calendar";
import dayjs from "dayjs";

function App() {
  return (
    <div className="App">
      <Calendar
        value={dayjs()}
        onChange={(date) => {
          alert(date.format("YYYY-MM-DD"));
        }}
        // locale="en-US"
        // dateRender={(value) => {
        //   return (
        //     <div>
        //       <p style={{ background: "yellowgreen", height: "3s0px" }}>
        //         {value.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}
        // dateInnerContent={(value) => {
        //   return (
        //     <div>
        //       <p style={{ background: "yellowgreen", height: "30px" }}>
        //         {value.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}
      ></Calendar>
    </div>
  );
}

export default App;
