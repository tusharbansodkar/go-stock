import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative flex justify-around items-center w-80 ">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search any stock or crypto"
        className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-gray-50 border-none text-gray-600"
      />
    </div>
  );
};
export default SearchBar;
