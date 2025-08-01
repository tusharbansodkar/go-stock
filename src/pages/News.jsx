import NewsCard from "@/components/shared/NewsCard";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import "animate.css";

const News = () => {
  const [news, setNews] = useState([]);

  const newsCards = news.map((item) => <NewsCard {...item} />);

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("https://go-stock-backend.onrender.com/api/headlines/topnews", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setNews(response.data))
      .catch((error) => console.log("Error in fetching news:", error));
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto p-4 animate__animated animate__fadeIn">
      <h2 className="font-bold text-4xl tracking-wide">Top Headlines</h2>
      <hr className="border-gray-300 border-1 mt-4 " />
      {news.length > 0 ? newsCards : <LoadingSpinner />}
    </div>
  );
};
export default News;
