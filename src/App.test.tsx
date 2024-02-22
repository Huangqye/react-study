/* eslint-disable */
import React, { useContext } from "react";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import Toggle from "./Toggle";
import { act } from "react-dom/test-utils";
import useCounter from "./useCounter";

// test("renders learn react link", () => {
//   // 渲染组件
//   render(<App />);
//   // 查询dom 匹配
//   const linkElement = screen.getByText(/learn react/i);
//   // 断言在document内
//   expect(linkElement).toBeInTheDocument();
// });

// test("renders learn react link 2", () => {
//   const { container } = render(<App />);
//   const linkElement = container.querySelector(".App-link");
//   expect(linkElement?.textContent).toMatch(/learn react/i);
// });
// 如果装了ESLint插件需要禁用一下 ⬆️

// test("toggle", async () => {
//   const { container } = render(<Toggle />);
//   expect(container.querySelector("p")?.textContent).toBe("close");
//   act(() => {
//     fireEvent.click(container.querySelector("button")!);
//   });
//   // expect(container.querySelector("p")?.textContent).toBe("open");
//   await waitFor(
//     () => expect(container.querySelector("p")?.textContent).toBe("open"),
//     {
//       timeout: 3000,
//     }
//   );
// });

test("useCounter", async () => {
  const hook = renderHook(() => useCounter(0));

  const [count, increment, decrement] = hook.result.current;

  act(() => {
    increment(2);
  });
  expect(hook.result.current[0]).toBe(2);

  act(() => {
    decrement(3);
  });
  expect(hook.result.current[0]).toBe(-1);

  hook.unmount();
});
