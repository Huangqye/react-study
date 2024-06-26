import { Dayjs } from "dayjs";
import { CalendarProps } from ".";

interface MonthCalendarProps extends CalendarProps {}

// 我已经拿到渲染的数据了
function getAllDays(date: Dayjs) {
  // 当月
  //   const daysInMonth = date.daysInMonth();
  //   当月第一天
  const startDate = date.startOf("month");
  // 当月第一天是周六
  const day = startDate.day();

  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(
    6 * 7
  );

  // 这里塞进 6个
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      // dayjs的subtract 计算当前日期-1 -2 -3的日期
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    };
  }
  //   30+6
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day");
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }

  return daysInfo;
}
// 开始渲染
function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    // for(let j=0; )
  }
}

function MonthCalendar(props: MonthCalendarProps) {
  const weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  const allDays = getAllDays(props.value);

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {week}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthCalendar;
