import React from "react";

interface TestProps {
  children: React.ReactNode[];
}

function Test(props: TestProps) {
  // children 扁平化
  const children2 = React.Children.toArray(props.children);
  console.log("props.children", props.children);
  console.log("children2", children2);
  return <div></div>;
}

export default Test;
