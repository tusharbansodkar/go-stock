import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import ButtonRight from "./ButtonRight";
import ButtonLeft from "./ButtonLeft";
import LoadingSpinner from "./LoadingSpinner";
import InfoCard from "./InfoCard";
import Watchlist from "./Watchlist";
import { WATCHLIST_FEED_ITEM } from "@/data";
import { AuthContext } from "@/context";

const Container = () => {
  const {
    user: { watchlist },
  } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const visibleCards = 3;

  const SYMBOL_LOOKUP = new Map(
    watchlist.map((item) => [item.ScripCode, item.Name])
  );

  const TARGET_SCRIPS = new Set(watchlist.map((item) => item.ScripCode));

  // Define item width and gap for slide calculation
  let itemWidth = Math.ceil(containerWidth / visibleCards);
  const gap = 12; // Corresponds to gap-3 (0.75rem = 12px assuming 1rem = 16px)

  const showNext = () => {
    // if (marketData.length === 0) return;

    setCurrentIndex((prevIndex) =>
      prevIndex === 10 - visibleCards ? prevIndex : prevIndex + 1
    );
  };

  const showPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const resizedObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizedObserver.observe(containerRef.current);

    return () => {
      resizedObserver.disconnect(containerRef.current);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] p-3 overflow-y-auto">
      <div className=" grid grid-cols-3 gap-4 overflow-auto">
        <div
          ref={containerRef}
          className="col-span-full rounded-md relative drop-shadow-sm/20 bg-white p-4 overflow-hidden"
        >
          <div
            className="flex gap-3 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
            }}
          >
            {watchlist === 0 ? (
              <div className="h-[150px] w-full">
                <LoadingSpinner />
              </div>
            ) : (
              <InfoCard
                itemWidth={itemWidth}
                watchlist={watchlist}
                SYMBOL_LOOKUP={SYMBOL_LOOKUP}
                TARGET_SCRIPS={TARGET_SCRIPS}
              />
            )}
          </div>
          <div className="absolute top-1/2 left-0 bg-gray-300 hover:bg-gray-400 text-white tranform -translate-y-1/2 rounded-sm">
            <ButtonLeft handleClick={showPrevious} />
          </div>

          <div className="absolute top-1/2 right-0 bg-gray-300 hover:bg-gray-400 text-white tranform -translate-y-1/2 rounded-sm">
            <ButtonRight handleClick={showNext} />
          </div>
        </div>

        <div className="bg-amber-600 col-span-2 rounded-md"></div>

        <div className="drop-shadow-sm/30 h-100 bg-white col-span-1 rounded-md overflow-hidden">
          <Watchlist
            watchlist={watchlist}
            SYMBOL_LOOKUP={SYMBOL_LOOKUP}
            TARGET_SCRIPS={TARGET_SCRIPS}
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
