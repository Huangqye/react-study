import { Dayjs } from "dayjs";
import MonthCalendar from "./MonthCalendar";
import "./index.scss";
// 就是拿到当前月份的天数和第一天是星期几，前后用上个月和下个月的日期填充

export interface CalendarProps {
  value: Dayjs;
}

function Calendar(props: CalendarProps) {
  return (
    <div className="calendar">
      <MonthCalendar {...props} />
    </div>
  );
}

export default Calendar;
