import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/GoStock-logo1.png";
import ButtonLeft from "./ButtonLeft";
import ButtonRight from "./ButtonRight";

const images = [
  "https://plus.unsplash.com/premium_photo-1683751113164-ba68afd98f6e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1664197368315-6e8f91db9215?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1621761225597-32b61662062f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const gotToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      gotToNext();
    }, 4000);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    // <div
    //   className={`w-[500px] h-[90%] rounded-lg overflow-hidden shadow-lg shadow-gray-400 border border-gray-200 mr-15 transition-opacity duration-150 ease-in-out ${
    //     fade ? "opacity-100" : "opacity-0"
    //   }`}
    // >
    //   <img
    //     src={images[currentIndex]}
    //     className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
    //     alt="Stock market visual"
    //   />
    // </div>

    <div className="hidden md:block relative w-[450px] h-[90%] overflow-hidden rounded-lg  border border-gray-200 shadow-lg shadow-gray-400">
      <div>
        <img
          src={logo}
          alt="gostock-logo"
          className="absolute w-[150px] h-[80px] object-contain z-1 right-2 top-2 "
        />
      </div>
      {/* slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Stock market visual"
            className="w-full object-cover "
          />
        ))}
      </div>
      <div className="absolute top-1/2 left-0 bg-gray-500 text-white tranform -translate-y-1/2 rounded-sm">
        <ButtonLeft handleClick={goToPrevious} />
      </div>

      <div className="absolute top-1/2 right-0 bg-gray-500 text-white tranform -translate-y-1/2 rounded-sm">
        <ButtonRight handleClick={gotToNext} />
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center space-x-2 ">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
export default ImageSlider;
