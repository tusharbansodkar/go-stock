import LineChart from "./LineChart";

const InfoCard = ({ marketData, itemWidth }) => {
  return (
    <>
      {marketData.map((item, index) => (
        <div
          key={index}
          className={`leading-7 h-[180px] shadow-lg/25 rounded-md p-2`}
          style={{ minWidth: `${itemWidth - 12}px` }}
        >
          <div className="flex justify-evenly items-center  w-full h-[50%]">
            <p className="font-bold text-2xl">{item.Symbol}</p>
            <div className="w-[50%] h-full">
              <LineChart
                Exch={item.Exch}
                ExchType={item.ExchType}
                ScripCode={item.Token}
              />
            </div>
          </div>

          <div className="flex w-full justify-around ">
            <p className="text-gray-500">Price</p>
            <p className="text-red-500">
              {item.LastRate.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="flex w-full justify-around">
            <p className="text-gray-500">High</p>
            <p className="text-green-500">
              {item.High.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="flex w-full justify-around">
            <p className="text-gray-500">Low</p>
            <p className="text-red-500">
              {item.High.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default InfoCard;
