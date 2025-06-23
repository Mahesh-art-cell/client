

import "./navbar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);

  const handlePersonClick = () => {
    setDropdownOpen((prev) => {
      const newState = !prev;
      console.log("🔄 Toggling dropdown:", newState);
      return newState;
    });
  };

  const handleLogout = async () => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        const userConfirmed = await new Promise((confirmResolve) => {
          toast.info(
            <div>
              <p>⚠️ Are you sure you want to log out?</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => confirmResolve(true)}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "5px 10px",
                    marginRight: "5px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => confirmResolve(false)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  No
                </button>
              </div>
            </div>,
            { autoClose: false, closeOnClick: false }
          );
        });

        if (userConfirmed) {
          try {
            console.log("🚪 Logging out...");
            await logout();
            console.log("✅ Logout successful, redirecting to /login...");
            toast.success("✅ Logged out successfully!");
            navigate("/login");

            setTimeout(() => {
              window.location.href = "/login";
            }, 500);

            resolve();
          } catch (error) {
            console.error("❌ Logout error:", error);
            toast.error("❌ Error while logging out.");
            reject(error);
          }
        } else {
          console.log("🚫 Logout cancelled by user.");
          toast.info("🚫 Logout cancelled.");
          reject("Cancelled");
        }
      }),
      {
        pending: "Processing logout...",
        success: "Logout completed!",
        error: "Logout failed!",
      }
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (searchTerm.trim() === "") {
          setSearchResults([]);
          return;
        }

        const res = await makeRequest.get("/users/allUsers");
        const allUsers = res.data;

        const filteredUsers = allUsers.filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredUsers);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        toast.error("Error fetching users.");
      }
    };

    const delay = setTimeout(fetchUsers, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleUserClick = (e, userId) => {
    e.preventDefault();
    console.log("➡️ Navigating to user profile:", userId);
    navigate(`/profile/${userId}`);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleHomeClick = () => {
    console.log("🏠 Navigating to home");
    navigate("/Navbar");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log("🔒 Clicked outside, closing dropdown");
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>lamasocial</span>
        </Link>

        <HomeOutlinedIcon onClick={handleHomeClick} style={{ cursor: "pointer" }} />

        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} style={{ cursor: "pointer" }} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} style={{ cursor: "pointer" }} />
        )}

        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="search-results">
      

              {searchResults.map((user) => (
  <div
    key={user._id}
    className="search-result-item"
    onClick={(e) => handleUserClick(e, user._id)}
  >
    <img
      src={user.profilePic || "/default-avatar.png"}
      alt="User Avatar"
      className="search-avatar"
    />
    <div className="user-info">
      <span>{user.name || user.username}</span>
      <span className="email">{user.email}</span>
    </div>
  </div>
))}

            </div>
          )}
        </div>
      </div>

      <div className="right">
        <a
          href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit" }}
        >
          <EmailOutlinedIcon style={{ cursor: "pointer" }} />
        </a>

        <a
          href="https://www.linkedin.com/in/mahesh-talluri-1b46b6279"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit" }}
        >
          <LinkedInIcon style={{ cursor: "pointer" }} />
        </a>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit" }}
        >
          <InstagramIcon style={{ cursor: "pointer" }} />
        </a>

        <div className="user" ref={dropdownRef}>
  <PersonOutlinedIcon onClick={handlePersonClick} style={{ cursor: "pointer" }} />
  
  {dropdownOpen && (
    <div className="dropdown">
      <button onClick={handleLogout}>Logout</button>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default Navbar;
