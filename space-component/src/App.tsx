import "./App.css";
import Space from "./Space";
import { ConfigProvider } from "./Space/ConfigProvider";

function App() {
  return (
    // <Space
    //   direction="horizontal"
    //   align="end"
    //   className="container"
    //   wrap
    //   size={["large", "small"]}
    // >
    //   <div className="box"></div>
    //   <div className="box"></div>
    //   <div className="box"></div>
    // </Space>
    // <Test>
    //   {[[<div>111</div>, <div>222</div>], [<div>333</div>]]}
    //   <span>hello world</span>
    // </Test>
    <div>
      <ConfigProvider space={{ size: 20 }}>
        <Space direction="horizontal">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
        <Space direction="vertical">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </ConfigProvider>
    </div>
  );
}

export default App;
