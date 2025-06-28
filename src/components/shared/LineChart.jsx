import { createChart, AreaSeries } from "lightweight-charts";
import { useEffect, useRef } from "react";


const LineChart = () => {

  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          textColor: "black",
          background: { type: "solid", color: "white" },
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
        rightPriceScale: {
          visible: false,
        },
        leftPriceScale: {
          visible: false,
        },
        timeScale: {
          visible: false,
        },
        crosshair: {
          vertLine: {
            visible: false,
          },
          horzLine: {
            visible: false,
          },
        },
        handleScroll: {
          pressedMouseMove: false,
        },
        handleScale: {
          mouseWheel: false,
          pinch: false,
          axisPressedMouseMove: false,
        },
        kineticScroll: {
          touch: false,
          mouse: false,
        },
      });

      const areaSeries = chart.addSeries(AreaSeries, {
        priceLineVisible: false,
        crosshairMarkerVisible: false,
      });

      const data = [
        { time: "2023-10-01", value: 100 },
        { time: "2023-10-02", value: 102 },
        { time: "2023-10-03", value: 101 },
        { time: "2023-10-04", value: 105 },
        { time: "2023-10-05", value: 107 },
        { time: "2023-10-06", value: 110 },
        { time: "2023-10-07", value: 108 },
        { time: "2023-10-08", value: 111 },
        { time: "2023-10-09", value: 115 },
        { time: "2023-10-10", value: 120 },
        { time: "2023-10-11", value: 116 },
      ];

      areaSeries.setData(data);
      chart.timeScale().fitContent();

      return () => {
        chart.remove();
      };
    }
  }, []);

  return (
    <div ref={chartContainerRef} 
    className='w-full h-full'
    />
  )
}

export default LineChart
