import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import "./App.css";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

const InternalCalendar: React.ForwardRefRenderFunction<
  CalendarRef,
  CalendarProps
> = (props, ref) => {
  const { value = new Date(), onChange } = props;
  // 第二步逻辑
  const [date, setDate] = useState(value);
  // 暴露组件api
  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date);
      },
    };
  });

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
  /**
   * 一个月的有多少天, new Date(2023,1,0).getDate()拿到1月的31天。 date传0时取得是上个月的最后一天，month是从0开始的
   * @param year
   * @param month
   * @returns
   */
  function daysOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  /**
   * 当前月第一天是星期几
   * @param year
   * @param month
   * @returns
   */
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const days = [];
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
    // 填补上个月日期，firstDay得到几就要补几天，比如2024-2月的第一天是周四，那么就要补1月的28(-3)、29(-2)、30(-1)、31(0)。
    for (let i = 1; i <= firstDay; i++) {
      days.push(
        <div key={`gray-${i}`} className="gray">
          {new Date(
            date.getFullYear(),
            date.getMonth(),
            (firstDay - i) * -1
          ).getDate()}
        </div>
      );
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = onChange?.bind(
        null,
        new Date(date.getFullYear(), date.getMonth(), i)
      );
      if (i === date.getDate()) {
        days.push(
          <div key={i} className="day selected" onClick={clickHandler}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day" onClick={clickHandler}>
            {i}
          </div>
        );
      }
    }
    // 填补下个月
    const fillNextDay = 42 - days.length;
    for (let i = 1; i <= fillNextDay; i++) {
      days.push(
        <div key={`gray-${42 - i}`} className="gray">
          {/* {new Date(date.getFullYear(), date.getMonth() + 1, i).getDate()} */}
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    // 第一步布局和样式
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年 {monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
};
const Calendar = React.forwardRef(InternalCalendar);

function Test() {
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());
    // setTimeout(() => {
    //   calendarRef.current?.setDate(new Date(2024, 3, 1));
    // }, 3000);
  }, []);

  return (
    <div>
      {/* <Calendar
        value={new Date()}
        onChange={(date: Date) => {
          alert(date.toLocaleDateString());
        }}
      /> */}
      <Calendar ref={calendarRef} value={new Date()} />
    </div>
  );
}

export default Test;
