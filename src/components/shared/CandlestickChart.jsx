import { CandlestickSeries, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const exchangeMap = {
  N: "NSE",
  B: "BSE",
  M: "MCX",
};

const CandlestickChart = ({ selectedStock }) => {
  const { Exch, ExchType, Token: ScripCode } = selectedStock;
  const chartContainerRef = useRef(null);
  const today = new Date();
  const sixMonthsAgo = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);
  const yy = sixMonthsAgo.getFullYear();
  const mm = String(sixMonthsAgo.getMonth() + 1).padStart(2, "0");
  const dd = String(sixMonthsAgo.getDate()).padStart(2, "0");
  const FromDate = `${yy}-${mm}-${dd}`;
  const [stockFeed, setStockFeed] = useState([]);

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
          ToDate: today.toISOString().split("T")[0],
        }
      );

      const data = response.data.map((item) => ({
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
        time: new Date(item[0]).getTime(),
      }));

      // console.log(data);

      setStockFeed(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    if (selectedStock) {
      fetchHistoricalData();
    }
  }, [selectedStock]);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          textColor: "black",
          background: { type: "solid", color: "white" },
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });

      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: true,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      candlestickSeries.setData(stockFeed);
      chart.timeScale().fitContent();

      return () => {
        chart.remove();
      };
    }
  }, [stockFeed]);

  return (
    <div ref={chartContainerRef} className="w-full h-full relative">
      <p className="absolute text-lg font-semibold top-1 left-4 bg-white p-2 z-2">
        {`${selectedStock.FullName} | ${exchangeMap[Exch]}`}
      </p>
    </div>
  );
};

export default CandlestickChart;
