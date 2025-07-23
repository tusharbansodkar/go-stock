import { createChart, AreaSeries } from "lightweight-charts";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { ThemeContext } from "@/ThemeContext";

const LineChart = ({ Exch, ExchType, ScripCode }) => {
  const chartContainerRef = useRef(null);
  const Today = new Date();
  const fifteenDaysAgo = new Date(Today.getTime() - 15 * 24 * 60 * 60 * 1000);
  const yy = fifteenDaysAgo.getFullYear();
  const mm = String(fifteenDaysAgo.getMonth() + 1).padStart(2, "0");
  const dd = String(fifteenDaysAgo.getDate()).padStart(2, "0");
  const FromDate = `${yy}-${mm}-${dd}`;
  const [stockData, setStockData] = useState([]);
  const { theme } = useContext(ThemeContext);

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.post(
        "https://go-stock-backend.onrender.com/api/market-data/historical-data",
        {
          Exch,
          ExchType,
          ScripCode,
          TimeFrame: "1d",
          FromDate,
          ToDate: Today.toISOString().split("T")[0],
        }
      );

      const data = response.data.map((item) => ({
        time: item[0].substring(0, 10),
        value: item[4],
      }));

      setStockData(data);
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
          textColor: theme === "light" ? "#000000" : "#d1d5dc",
          background: {
            type: "solid",
            color: theme === "light" ? "white" : "#4a5565",
          },
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
          theme === "light"
            ? stockData[stockData.length - 1].value <
              stockData[stockData.length - 2].value
              ? "#fad8d3"
              : "#ccfcd7"
            : "#4a5565",
        topColor: theme === "light" ? "#ffffff" : "#4a5565",
        relativeGradient: true,
        lineWidth: 3,
        priceLineVisible: false,
        crosshairMarkerVisible: false,
      });

      areaSeries.setData(stockData);
      chart.timeScale().fitContent();

      return () => {
        chart.remove();
      };
    }
  }, [stockData, theme]);

  return stockData.length === 0 ? (
    <div className="h-full flex justify-center items-center w-full">
      <LoaderCircle className="animate-spin text-[#7C444F] dark:text-amber-600 size-10" />
    </div>
  ) : (
    <div ref={chartContainerRef} className="w-full h-full" />
  );
};

export default LineChart;
