import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import { showToast } from "./utils/toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState({
    Exch: "N",
    ExchType: "C",
    Token: 999920000,
    fullName: "NIFTY",
  });
  const searchInputRef = useRef(null);

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token"); // Remove token if there's an error
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      showToast.success("Login successful!");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || "Login failed. Please try again"
      );
      showToast.error(
        error.response?.data?.message || "Login failed. Please try again"
      );
    }
  };

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // update user details
  const updateProfileDetails = (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  // fetch updated watchlist
  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/user/watchlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUser((prevData) => ({
          ...prevData,
          watchlist: response.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        loading,
        searchInputRef,
        updateProfileDetails,
        fetchWatchlist,
        selectedStock,
        setSelectedStock,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
