import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
// import TestWS from "@/components/shared/TestWS";
import TickerTape from "@/components/shared/TickerTape";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/stocks");
  }, [])
  
  return (
    <div className="flex ">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Navbar />
        <TickerTape />
        <Outlet />
      </main>
    </div>
  );
};
export default Dashboard;
