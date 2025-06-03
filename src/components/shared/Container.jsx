import LineChart from "./LineChart";

const Container = () => {

  return (
    <div className="h-screen p-3 overflow-y-auto">
      <div className=" grid grid-cols-5 grid-rows-5 gap-4 overflow-auto">
        <div className="flex gap-3 justify-around items-center col-span-full row-span-2 rounded-md drop-shadow-sm/20 bg-white p-4">
          <div className="leading-7 h-[200px] w-[300px] shadow-lg/25 rounded-md p-2 ">
            <div className="flex justify-evenly items-center  w-full h-[50%]">
              <p className="font-bold text-2xl">SENSEX</p>
              <div className="w-[50%] h-full">
              <LineChart/>
              </div>
            </div>

            <div className="flex w-full justify-around ">
              <p className="text-gray-500">Open</p>
              <p className="text-red-500">81,492.50</p>
            </div>

            <div className="flex w-full justify-around">
              <p className="text-gray-500">High</p>
              <p className="text-green-500">81,492.50</p>
            </div>

            <div className="flex w-full justify-around">
              <p className="text-gray-500">Low</p>
              <p className="text-red-500">81,492.50</p>
            </div>
          </div>

          <div className="leading-7 h-[200px] w-[300px] shadow-lg/25 rounded-md p-2 ">
            <div className="flex justify-evenly items-center  w-full h-[50%]">
              <p className="font-bold text-2xl">NIFTY</p>
              <div className="w-[50%] h-full">
              <LineChart/>
              </div>
            </div>

            <div className="flex w-full justify-around ">
              <p className="text-gray-500">Open</p>
              <p className="text-red-500">81,492.50</p>
            </div>

            <div className="flex w-full justify-around">
              <p className="text-gray-500">High</p>
              <p className="text-green-500">81,492.50</p>
            </div>

            <div className="flex w-full justify-around">
              <p className="text-gray-500">Low</p>
              <p className="text-red-500">81,492.50</p>
            </div>
          </div>

          <div className="leading-7 h-[200px] w-[300px] shadow-lg/25 rounded-md p-2 ">
            <div className="flex justify-evenly items-center  w-full h-[50%]">
              <p className="font-bold text-2xl">BANKNIFTY</p>
              <div className="w-[50%] h-full">
              <LineChart/>
              </div>
            </div>

            <div className="flex w-full justify-around ">
              <p className="text-gray-500">Open</p>
              <p className="text-red-500">81,492.50</p>
            </div>

            <div className="flex w-full justify-around">
              <p className="text-gray-500">High</p>
              <p className="text-green-500">81,492.50</p>
            </div>

            <div className="flex w-full justify-around">
              <p className="text-gray-500">Low</p>
              <p className="text-red-500">81,492.50</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-600  col-span-3 row-span-2 rounded-md"></div>
        <div className="bg-amber-600 h-[100px]  col-span-2  rounded-md"></div>
      </div>
    </div>
  );
};

export default Container;
