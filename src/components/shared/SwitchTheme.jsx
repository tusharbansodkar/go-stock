import { ThemeContext } from "@/ThemeContext";
import { Moon, Sun } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/button";

const SwitchTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Button className="cursor-pointer" variant="ghost" onClick={toggleTheme}>
      {theme === "light" ? <Sun size={20} /> : <Moon size={28} />}
    </Button>
  );
};

export default SwitchTheme;
