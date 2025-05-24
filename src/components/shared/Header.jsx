import logo from "../../assets/GoStock-logo1.png";

const Header = () => {
  return (
    <h2 className="text-center my-5 text-3xl font-semibold">
      Welcome to{" "}
      <img
        src={logo}
        alt="gostock-logo"
        className="inline-block w-[150px] h-[80px] object-contain"
      />
    </h2>
  );
};
export default Header;
