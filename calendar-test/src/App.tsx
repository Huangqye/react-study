import { useImperativeHandle, useState } from "react";
import "./App.css";
import React from "react";
import { useControllableValue } from "ahooks";

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
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
  // const [date, setDate] = useState(defaultValue);
  // defaultValue是当props.value和props.defaultValue都没传入时的默认值
  const [date, setDate] = useControllableValue(props, {
    defaultValue: new Date(),
  });

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
  // console.log("date", new Date());
  // console.log("date2", new Date().toLocaleString());
  // console.log("date3", new Date().getMonth());
  // console.log("date4", new Date().getDate());
  // console.log("date4", new Date().getDay());
  // console.log("date", new Date(2024, 6, 1));
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
   * 获取当月有几天, 当传入month+1,0的组合时，就是获取当月的天数
   * @param year
   * @param month
   * @returns
   */
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  /**
   * 获取当月第一天是周几
   * @param year
   * @param month
   * @returns
   */
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDates = () => {
    const days = [];
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = () => {
        const curDate = new Date(date.getFullYear(), date.getMonth(), i);
        setDate(curDate);
        // onChange?.(curDate);
      };

      if (i === date.getDate()) {
        days.push(
          <div key={i} className="day selected" onClick={() => clickHandler()}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day" onClick={() => clickHandler()}>
            {i}
          </div>
        );
      }
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年{monthNames[date.getMonth()]}
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
        {renderDates()}
      </div>
    </div>
  );
};

const Calendar = React.forwardRef(InternalCalendar);

function Test() {
  const [date, setDate] = useState(new Date());
  // const calendarRef = useRef<CalendarRef>(null);

  // useEffect(() => {
  //   console.log(calendarRef.current?.getDate().toLocaleDateString);
  //   setTimeout(() => {
  //     calendarRef?.current?.setDate(new Date(2024, 6, 24));
  //   }, 3000);
  // }, []);
  return (
    // <div>
    //   <Calendar defaultValue={new Date("2023-3-1")} ref={calendarRef} />
    // </div>
    <div>
      <Calendar
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          alert(newDate.toLocaleDateString());
        }}
      />
    </div>
  );
}

export default Test;
