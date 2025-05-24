// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// const socket = io("http://localhost:5000");

// const TestWS = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     socket.on("marketData", (newData) => {
//       console.log("Received market data:", newData);
//       setData(newData);
//     });

//     return () => {
//       socket.off("marketData");
//     };
//   }, []);

//   return (
//     <div>
//       <h1>{data.LastRate}</h1>
//     </div>
//   );
// };

// export default TestWS;
