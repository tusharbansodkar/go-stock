import { CandlestickSeries, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { sharedSocket as socket } from "@/services/socketServices";

const exchangeMap = {
  N: "NSE",
  B: "BSE",
  M: "MCX",
};

const CandlestickChart = ({ selectedStock }) => {
  const { Exch, ExchType, Token: ScripCode, FullName } = selectedStock;
  const chartContainerRef = useRef(null);
  const Today = new Date().toISOString().split("T")[0];
  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 6);
  const FromDate = fromDate.toISOString().split("T")[0];
  const [stockFeed, setStockFeed] = useState([]);
  const seriesRef = useRef(null);
  const [latestFeed, setLatestFeed] = useState(null);

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
          ToDate: Today,
        }
      );

      const data = response.data.map((item) => {
        return {
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
          time: item[0].split("T")[0],
        };
      });

      setStockFeed(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(selectedStock).length === 0) return;

    const handleStockFeed = (newData) => {
      const token = newData.Token;
      if (token !== parseInt(ScripCode)) return;
      setLatestFeed((prevData) => ({
        time: Today,
        open: newData.OpenRate,
        high: newData.High,
        low: newData.Low,
        close: newData.LastRate,
      }));
    };

    fetchHistoricalData();
    socket.on("marketData", handleStockFeed);

    return () => {
      socket.off("marketData", handleStockFeed);
    };
  }, [selectedStock]);

  useEffect(() => {
    if (!chartContainerRef.current || stockFeed.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      crosshair: {
        mode: 0,
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: true,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.setData(stockFeed);
    seriesRef.current = candlestickSeries;
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
      seriesRef.current = null;
    };
  }, [stockFeed]);

  useEffect(() => {
    if (seriesRef.current && latestFeed) {
      seriesRef.current.update(latestFeed);
    }
  }, [latestFeed]);

  return (
    <div ref={chartContainerRef} className="w-full h-full relative">
      <p className="absolute text-lg font-semibold top-1 left-4 bg-white p-2 z-2">
        {`${FullName} | ${exchangeMap[Exch]}`}
      </p>
    </div>
  );
};

export default CandlestickChart;
