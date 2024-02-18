import {
  Reducer,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";

// interface Action {
//   type: "add" | "minus";
//   num: number;
// }

// function reducer(state: number, action: Action) {
//   switch (action.type) {
//     case "add":
//       return state + action.num;
//     case "minus":
//       return state - action.num;
//   }
//   return state;
// }

function useInterval(fn: Function, time: number) {
  const ref = useRef(fn);

  // 每次渲染在此更新值,
  useLayoutEffect(() => {
    ref.current = fn;
  });

  let cleanUpFnRef = useRef<Function>();

  const clean = useCallback(() => {
    cleanUpFnRef.current?.();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => ref.current(), time);

    // clearInterval(timer); 这样会导致定时器尚未到期就被清除
    cleanUpFnRef.current = () => {
      clearInterval(timer);
    };

    return clean;
  }, []);
}

function App() {
  const [count, setCount] = useState(0);
  // const [count, dispatch] = useReducer<Reducer<number, Action>>(reducer, 0);
  // 闭包陷阱
  // 这里出现异步
  // useEffect(() => {
  // setInterval(() => {
  // console.log(count);
  // 错误写法
  // setCount(count + 1);
  // 解决方法一
  // setCount((count) => count + 1);
  // 解决方法二
  // dispatch({ type: "add", num: 1 });
  // }, 1000);
  // 问题在这里 []，执行并保留第一次的function ，[count]也是第三种办法
  // useEffect里不合适跑定时器，每次都要重新跑定时器，那么其就不是1秒执行一次
  // }, []);
  const updateCount = () => {
    setCount(count + 1);
  };

  useInterval(updateCount, 1000);

  return <div>{count}</div>;
}

export default App;
