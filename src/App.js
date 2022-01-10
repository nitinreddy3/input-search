import React, { useEffect } from "react";
import "./styles.css";
import worker_script from "./worker";
import Chart from './Chart';

export default function App() {
  const myWorker = new Worker(worker_script);

  useEffect(() => { }, []);

  const callWorker = () => {
    myWorker.onmessage = (m) => {
      console.log("msg from worker: -> ", m.data);
    };
    myWorker.postMessage("im from main");
  };
  //https://stackoverflow.com/questions/20627642/highchart-get-image-url-after-exporting
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={callWorker}>Call Worker</button>

      <Chart />
    </div>
  );
}
