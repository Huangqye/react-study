import { Dayjs } from "dayjs";
import { CalendarProps } from ".";
import { useContext } from "react";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";
import cs from "classnames";

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

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

function MonthCalendar(props: MonthCalendarProps) {
  const localeContext = useContext(LocaleContext);

  const { dateRender, dateInnerContent, value, selectHandler, curMonth } =
    props;
  const CalendarLocale = allLocales[localeContext.locale];
  // const weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const weekList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const allDays = getAllDays(curMonth);

  // 开始渲染 6行 每行7个
  function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        // 1 1 1 1 1 1 1
        // 1 1 1 1 1 1 1
        const item = days[i * 7 + j];
        // 注意这里的空格
        row[j] = (
          <div
            className={
              "calendar-month-body-cell " +
              (item.currentMonth ? "calendar-month-body-cell-current" : "")
            }
            onClick={() => selectHandler?.(item.date)}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className="calendar-month-body-cell-date">
                <div
                  className={cs(
                    "calendar-month-body-cell-date-value",
                    value.format("YYYY-MM-DD") ===
                      item.date.format("YYYY-MM-DD")
                      ? "calendar-month-body-cell-date-selected"
                      : ""
                  )}
                >
                  {item.date.date()}
                </div>
                <div className="calendar-month-cell-body-date-content">
                  {dateInnerContent?.(item.date)}
                </div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }
    return rows.map((row) => (
      <div className="calendar-month-body-row">{row}</div>
    ));
  }

  return (
    <>
      <div className="calendar-month">
        <div className="calendar-month-week-list">
          {weekList.map((week) => (
            <div className="calendar-month-week-list-item" key={week}>
              {CalendarLocale.week[week]}
            </div>
          ))}
        </div>
        {renderDays(allDays)}
      </div>
    </>
  );
}

export default MonthCalendar;
