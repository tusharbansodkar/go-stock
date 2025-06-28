import { createChart, AreaSeries } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const LineChart = ({ Exch, ExchType, ScripCode }) => {
  const chartContainerRef = useRef(null);
  const Today = new Date();
  const fifteenDaysAgo = new Date(Today.getTime() - 15 * 24 * 60 * 60 * 1000);
  const yy = fifteenDaysAgo.getFullYear();
  const mm = String(fifteenDaysAgo.getMonth() + 1).padStart(2, "0");
  const dd = String(fifteenDaysAgo.getDate()).padStart(2, "0");
  const FromDate = `${yy}-${mm}-${dd}`;
  const [stockData, setStockData] = useState([]);

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/market-data/historical-data",
        {
          Exch,
          ExchType,
          ScripCode,
          TimeFrame: "1d",
          FromDate,
          ToDate: Today.toISOString().split("T")[0],
        }
      );

      setStockData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  useEffect(() => {
    if (stockData.length === 0) return;

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
        lineColor:
          stockData[stockData.length - 1].value <
          stockData[stockData.length - 2].value
            ? "#fb8775"
            : "#31f742",
        bottomColor:
          stockData[stockData.length - 1].value <
          stockData[stockData.length - 2].value
            ? "#fad8d3"
            : "#ccfcd7",
        topColor: "#ffffff",
        relativeGradient: true,
        lineWidth: 2,
        priceLineVisible: false,
        crosshairMarkerVisible: false,
      });

      areaSeries.setData(stockData);
      chart.timeScale().fitContent();

      return () => {
        chart.remove();
      };
    }
  }, [stockData]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default LineChart;
