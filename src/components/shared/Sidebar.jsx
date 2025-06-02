import logo from "../../assets/GoStock-logo1.png";
import { ChartSpline, ChartArea, Newspaper, UserRoundPen } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      text: "Stocks",
      icon: <ChartSpline size={28} />,
      path: "/dashboard/stocks",
    },
    {
      text: "Commodities",
      icon: <ChartArea size={28} />,
      path: "/dashboard/commodities",
    },
    { text: "News", icon: <Newspaper size={28} />, path: "/dashboard/news" },
    {
      text: "Profile",
      icon: <UserRoundPen size={28} />,
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="min-w-[250px] h-screen bg-white border-r-1 border-gray-200 relative">
      <div className="flex justify-center items-center h-16 mt-2 w-full">
        <img
          src={logo}
          alt="gostock-logo"
          className=" w-[130px] h-14 object-contain z-1 "
        />
      </div>

      <div className=" absolute top-[50%] left-0 translate-y-[-50%]  w-full p-8 ">
        <ul className="list-none space-y-5">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  `flex justify-start items-center gap-x-2 rounded-md p-2 hover:bg-gray-100 transition-all duration-300 ease-in-out ${
                    isActive ? "bg-blue-100 text-blue-600 font-semibold" : ""
                  }`
                }
                to={item.path}
              >
                {item.icon}
                <span className="text-lg ">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
