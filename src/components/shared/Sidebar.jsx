import { useContext } from "react";
import logo from "../../assets/GoStock-logo1.png";
import logoDark from "../../assets/GoStock-logo2.png";
import { ChartSpline, ChartArea, Newspaper, UserRoundPen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "@/ThemeContext";

const Sidebar = () => {
  const menuItems = [
    {
      text: "Stocks",
      icon: <ChartSpline size={28} />,
      path: "/dashboard/stocks",
    },
    { text: "News", icon: <Newspaper size={28} />, path: "/dashboard/news" },
    {
      text: "Profile",
      icon: <UserRoundPen size={28} />,
      path: "/dashboard/profile",
    },
  ];

  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-w-[250px] h-screen bg-white dark:bg-gray-800 border-r-1 border-gray-200 relative">
      <div className="flex justify-center items-center h-16 mt-2 w-full">
        <img
          src={theme === "dark" ? logoDark : logo}
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
                  `font-semibold flex justify-start items-center gap-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-red-300 font-semibold"
                      : ""
                  }`
                }
                to={item.path}
              >
                {item.icon}
                <span className="text-lg">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
