import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  // 闭包陷阱
  // 这里出现异步
  useEffect(() => {
    setInterval(() => {
      console.log(count);
      setCount(count + 1);
      // 解决方法一
    }, 1000);
    // 问题在这里 []，执行并保留第一次的function
  }, []);

  return <div>{count}</div>;
}

export default App;
