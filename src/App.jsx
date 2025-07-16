import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Stocks from "./pages/Stocks";
import Profile from "./pages/Profile";
import News from "./pages/News";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import { AuthContext } from "./context";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? children : <Login />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="stocks" element={<Stocks />} />
            <Route path="profile" element={<Profile />} />
            <Route path="news" element={<News />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
