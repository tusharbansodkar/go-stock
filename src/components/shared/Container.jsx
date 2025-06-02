

const Container = () => {
  return (
    <div className="h-screen p-2 overflow-y-auto">
      <div className=" grid grid-cols-5 grid-rows-5 gap-2 overflow-auto">

        <div className="bg-amber-600 col-span-full row-span-2 rounded-md"></div>
        <div className="bg-amber-600  col-span-3 row-span-2 rounded-md"></div>
        <div className="bg-amber-600 h-[100px]  col-span-2  rounded-md"></div>

      </div>
    </div>
  )
}

export default Container
