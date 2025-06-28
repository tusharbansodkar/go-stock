import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { showToast } from "./utils/toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          // console.log(response.data);
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
        error.response?.data?.message || "Login failed. Please try "
      );
      showToast.error(
        error.response?.data?.message || "Login failed. Please try "
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

  return (
    <AuthContext.Provider
      value={{ login, logout, user, loading, updateProfileDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
