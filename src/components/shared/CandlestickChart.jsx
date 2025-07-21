import { CandlestickSeries, createChart } from "lightweight-charts";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { sharedSocket as socket } from "@/services/socketServices";
import { LoaderCircle } from "lucide-react";
import { ThemeContext } from "@/ThemeContext";

const exchangeMap = {
  N: "NSE",
  B: "BSE",
  M: "MCX",
};

const CandlestickChart = ({ selectedStock }) => {
  const { Exch, ExchType, Token: ScripCode, fullName } = selectedStock;
  const chartContainerRef = useRef(null);
  const Today = new Date().toISOString().split("T")[0];
  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 6);
  const FromDate = fromDate.toISOString().split("T")[0];
  const [stockFeed, setStockFeed] = useState([]);
  const seriesRef = useRef(null);
  const [latestFeed, setLatestFeed] = useState(null);
  const { theme } = useContext(ThemeContext);

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

    setStockFeed([]);

    const handleStockFeed = (newData) => {
      const token = newData.Token;
      if (token !== parseInt(ScripCode)) return;
      setLatestFeed((prevData) => ({
        ...prevData,
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
        textColor: theme === "light" ? "#000000" : "#d1d5dc",
        background: {
          type: "solid",
          color: theme === "light" ? "white" : "#4a5565",
        },
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
  }, [stockFeed, theme]);

  useEffect(() => {
    if (seriesRef.current && latestFeed) {
      seriesRef.current.update(latestFeed);
    }
  }, [latestFeed]);

  return stockFeed.length === 0 ? (
    <div className="h-full flex justify-center items-center w-full">
      <LoaderCircle className="animate-spin text-[#7C444F] size-10" />
    </div>
  ) : (
    <div ref={chartContainerRef} className="w-full h-full relative">
      <p className="absolute text-lg font-semibold top-1 left-4 bg-white dark:bg-gray-600 dark:text-gray-300 p-1 z-2">
        {`${fullName} | ${exchangeMap[Exch]}`}
      </p>
    </div>
  );
};

export default CandlestickChart;
