import React from 'react';
import worker_script from './worker';
var myWorker = new Worker(worker_script);

const WebWorkerExample = () => {
  let w;
  const startWorker = () => {
    if (typeof (Worker) !== "undefined") {
      if (typeof (w) == "undefined") {
        myWorker = new Worker(worker_script);
      }
      myWorker.onmessage = function (event) {
        document.getElementById("result").innerHTML = event.data;
      };
    } else {
      document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
    }
  }
  const stopWorker = () => {
    myWorker.terminate();
    myWorker = undefined;
  }

  return (<>
    <p>Count numbers: <output id="result"></output></p>
    <button onClick={startWorker}>Start Worker</button>
    <button onClick={stopWorker}>Stop Worker</button>
  </>
  )
}

export default WebWorkerExample;