
import "./navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  // ✅ Get Context Data
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ State to Control Dropdown Visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Handle Logout Logic
  const handleLogout = async () => {
    try {
      console.log("🚪 Logging out...");
      await logout(); // ✅ Call logout from AuthContext
      console.log("✅ Logout successful, redirecting to /login...");
      
      // ✅ Redirect to login page after logout
      navigate("/login");

      // ✅ Fallback: Ensures redirection if navigate() fails
      window.location.href = "/login";
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  return (
    <div className="navbar">
      {/* ✅ Left Side of Navbar */}
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>lamasocial</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        
        {/* ✅ Search Box */}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* ✅ Right Side of Navbar */}
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />

        {/* ✅ Profile Picture & Dropdown Menu */}
        <div className="user" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img
            src={currentUser?.profilePic ? `/upload/${currentUser.profilePic}` : "/default-avatar.png"}
            alt="Profile"
          />
          <span>{currentUser?.username || "User"}</span>

          {/* ✅ Dropdown Menu */}
          {dropdownOpen && (
            <div className="dropdown">
              <Link
                to={`/profile/${currentUser?.id}`}
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
