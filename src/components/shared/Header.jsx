import { useContext } from "react";
import logo from "../../assets/GoStock-logo1.png";
import logoDark from "../../assets/GoStock-logo2.png";
import { ThemeContext } from "@/ThemeContext";

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <h2 className="text-center my-5 text-3xl font-semibold">
      Welcome to{" "}
      <img
        src={theme === "dark" ? logoDark : logo}
        alt="gostock-logo"
        className="inline-block w-[150px] h-[80px] object-contain"
      />
    </h2>
  );
};
export default Header;
