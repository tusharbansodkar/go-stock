import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import TickerTape from "@/components/shared/TickerTape";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/stocks");
  }, []);

  return (
    <div className="flex h-svh">
      <Sidebar />
      <main className="h-full flex-1 overflow-hidden ">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};
export default Dashboard;
