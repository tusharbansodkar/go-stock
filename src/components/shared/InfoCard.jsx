import LineChart from "./LineChart";

const InfoCard = ({ itemWidth, watchlistData, setSelectedStock }) => {
  return (
    <>
      {Object.keys(watchlistData).length === 0 ? (
        <h4 className="text-center text-gray-500 w-full h-[180px]">
          Add stocks to watchlist...
        </h4>
      ) : (
        Object.entries(watchlistData)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([symbol, stockData]) => {
            let priceChange = (stockData.LastRate - stockData.PClose).toFixed(
              2
            );

            return (
              <div
                key={stockData._id}
                className="leading-7 h-[180px] shadow-lg/25 rounded-md cursor-pointer dark:ring-1 dark:ring-gray-400 dark:text-gray-200 overflow-hidden"
                style={{ minWidth: `${itemWidth - 12}px` }}
                onClick={() => {
                  setSelectedStock(watchlistData[symbol]);
                }}
              >
                <div className="flex justify-evenly items-center w-full h-[50%]">
                  <p className="w-[50%] text-center font-bold text-2xl">
                    {symbol.split("-")[0]}
                  </p>
                  <div className="w-[50%] h-full">
                    <LineChart
                      Exch={stockData.Exch}
                      ExchType={stockData.ExchType}
                      ScripCode={stockData.Token}
                    />
                  </div>
                </div>

                <div className="flex w-full justify-around ">
                  <p className="text-gray-500 dark:text-gray-300">Price</p>
                  <p
                    className={
                      priceChange > 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {stockData.LastRate.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="flex w-full justify-around">
                  <p className="text-gray-500 dark:text-gray-300">High</p>
                  <p className="text-green-500">
                    {stockData.High.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="flex w-full justify-around">
                  <p className="text-gray-500 dark:text-gray-300">Low</p>
                  <p className="text-red-500">
                    {stockData.Low.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            );
          })
      )}
    </>
  );
};

export default InfoCard;
