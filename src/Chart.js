import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const Chart = () => {
  const [charts, setCharts] = useState({
    chart1: {
      exporting: {
        url: 'http://export.highcharts.com/'
      },
      title: {
        text: 'Chart 1'
      },
      series: [{
        data: [1, 2, 3]
      }],
      b64: true,
      width: 600,
      constr: "Chart"
    },
    chart2: {
      exporting: {
        url: 'http://export.highcharts.com/'
      },
      title: {
        text: 'Chart 2'
      },
      series: [{
        data: [3, 2, 1, 4]
      }],
      b64: true,
      width: 600,
      constr: "Chart"
    },
  });

  const exportCharts = async () => {
    const results = await Promise.all(Object.keys(charts).map(async (key) => {
      const data = await axios.post(`http://export.highcharts.com/`, {
        options: charts[key],
        type: "image/png",
        width: charts[key].width,
      });
      console.log(data.data);
      return `${charts[key].exporting.url
        }${data.data}`;
    }));
    console.log(results);

    const fileUrls = await Promise.all(results.map(async (url) => {
      // const data = await axios.get(url);
      // const response = await data.blob();
      // return URL.createObjectURL(response);
    }));
    console.log(fileUrls);
  }
  return (<button onClick={exportCharts}>Export Charts</button>);
};

export default Chart;
