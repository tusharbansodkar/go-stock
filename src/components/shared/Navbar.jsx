import { BellDot, ChevronDown, LogOut, User } from "lucide-react";
import SearchBar from "./SearchBar";
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useContext } from "react";
import { AuthContext } from "@/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className=" flex justify-around items-center bg-white h-16">
      <SearchBar />
      <div className="flex items-center gap-4  ">
        <BellDot className="text-gray-600" size={20} />
        <Separator
          orientation="vertical"
          className="h-8 w-[2px] bg-gray-200 "
        />
        <Avatar className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="w-full h-full rounded-full"
          />
          <AvatarFallback className="text-gray-500 text-xl font-bold  ">
            {user?.firstName?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-600 ">
            {`${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
              "User"}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger className="group focus:outline-none">
              <ChevronDown
                className="text-gray-600 hover:cursor-pointer transition-transform duration-200 ease-linear delay-50 group-data-[state=open]:rotate-[-180deg] will-change-transform"
                size={20}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="min-w-36 bg-white drop-shadow-lg rounded-md  mt-2 border border-gray-200 z-1 "
              align="end"
            >
              <DropdownMenuItem className=" p-1 focus:outline-none cursor-pointer">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer justify-start"
                  onClick={() => navigate("/dashboard/profile")}
                >
                  <User className=" mr-2" /> Profile
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className=" p-1 focus:outline-none ">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer justify-start"
                  onClick={logout}
                >
                  <LogOut className=" mr-2" /> Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
