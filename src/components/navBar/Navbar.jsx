
// import "./navbar.css";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState, useEffect, useRef } from "react";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { AuthContext } from "../../context/authContext";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Navbar = () => {
//   // ✅ Get Context Data
//   const { toggle, darkMode } = useContext(DarkModeContext);
//   const { currentUser, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // ✅ State to Control Dropdown Visibility
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // ✅ Handle Logout Logic with Toast Confirmation
//   const handleLogout = async () => {
//     toast.promise(
//       new Promise(async (resolve, reject) => {
//         const userConfirmed = await new Promise((confirmResolve) => {
//           toast.info(
//             <div>
//               <p>⚠️ Are you sure you want to log out?</p>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <button
//                   onClick={() => confirmResolve(true)}
//                   style={{
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     padding: "5px 10px",
//                     marginRight: "5px",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   onClick={() => confirmResolve(false)}
//                   style={{
//                     backgroundColor: "#f44336",
//                     color: "white",
//                     padding: "5px 10px",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   No
//                 </button>
//               </div>
//             </div>,
//             { autoClose: false, closeOnClick: false }
//           );
//         });

//         if (userConfirmed) {
//           try {
//             console.log("🚪 Logging out...");
//             await logout(); // ✅ Call logout from AuthContext
//             console.log("✅ Logout successful, redirecting to /login...");

//             // ✅ Show success toast
//             toast.success("✅ Logged out successfully!");

//             // ✅ Redirect to login page after logout
//             navigate("/login");

//             // ✅ Fallback: Ensures redirection if navigate() fails
//             setTimeout(() => {
//               window.location.href = "/login";
//             }, 500);
//             resolve(); // Complete the promise
//           } catch (error) {
//             console.error("❌ Logout error:", error);
//             toast.error("❌ Error while logging out.");
//             reject(error);
//           }
//         } else {
//           toast.info("🚫 Logout cancelled.");
//           reject("User cancelled logout.");
//         }
//       }),
//       {
//         pending: "Processing logout...",
//         success: "Logout completed successfully!",
//       }
//     );
//   };

//   // ✅ Handle Home Redirection
//   const handleHomeClick = () => {
//     navigate("/Navbar"); // ✅ Redirect to home page
//   };

//   // ✅ Handle Person Icon Click to Show Logout
//   const handlePersonClick = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   // ✅ Close Dropdown When Clicking Outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className={`navbar ${darkMode ? "dark" : "light"}`}>
//       {/* ✅ Left Side of Navbar */}
//       <div className="left">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span>lamasocial</span>
//         </Link>

//         {/* ✅ Redirect to Home when Home Icon is Clicked */}
//         <HomeOutlinedIcon onClick={handleHomeClick} style={{ cursor: "pointer" }} />

//         {/* ✅ Toggle Dark/Light Mode */}
//         {darkMode ? (
//           <WbSunnyOutlinedIcon onClick={toggle} style={{ cursor: "pointer" }} />
//         ) : (
//           <DarkModeOutlinedIcon onClick={toggle} style={{ cursor: "pointer" }} />
//         )}

//         {/* ✅ Search Box */}
//         <div className="search">
//           <SearchOutlinedIcon />
//           <input type="text" placeholder="Search..." />
//         </div>
//       </div>

//       {/* ✅ Right Side of Navbar */}
//       <div className="right">
//        <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
//        target="_blank"
//        rel="noopener noreferrer"
//        style={{ color: "inherit" }}

//        >
        
      
//         <EmailOutlinedIcon style={{ cursor: "pointer" }} />

//         </a>

 
//         <a
//           href="https://www.linkedin.com/in/mahesh-talluri-1b46b6279"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "inherit" }}
//         >
//           <LinkedInIcon style={{ cursor: "pointer" }} />
//         </a>

//         {/* ✅ Instagram Icon */}
//         <a
//           href="https://www.instagram.com/"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "inherit" }}
//         >
//           <InstagramIcon style={{ cursor: "pointer" }} />
//         </a>
//         <PersonOutlinedIcon onClick={handlePersonClick} style={{ cursor: "pointer" }} />


//         {/* ✅ Profile Picture & Dropdown Menu */}
//         <div className="user" ref={dropdownRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
//           {dropdownOpen && (
//             <div className="dropdown">
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;








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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeRequest } from "../../axios"; // ✅ Axios instance

const Navbar = () => {
  // ✅ Context Data
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ State Management
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Fetch All Users for Search
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await makeRequest.get("/relationships/suggestions");
      if (res.data && Array.isArray(res.data)) {
        setAllUsers(res.data);
      } else {
        setAllUsers([]);
      }
    } catch (err) {
      console.error("❌ Error fetching users:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Data on Component Mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Handle Search Logic
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);

    if (input.trim() === "") {
      setFilteredUsers([]);
      setDropdownOpen(false);
      return;
    }

    // ✅ Filter Users Based on Search Input
    const filtered = allUsers.filter((user) =>
      user.username.toLowerCase().includes(input)
    );
    setFilteredUsers(filtered);
    setDropdownOpen(filtered.length > 0);
  };


 // ✅ Updated User Click Handler
const handleUserClick = (user) => {
  // ✅ Navigate to User Details Page
  navigate(`/user/Details/${user.id}`, { state: { user } });
  setDropdownOpen(false);
  setSearchTerm(""); // Clear search term
};


  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("✅ Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast.error("❌ Error while logging out.");
    }
  };

  // ✅ Close Dropdown on Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`navbar ${darkMode ? "dark" : "light"}`}>
      {/* ✅ Left Section */}
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">lamasocial</span>
        </Link>

        {/* ✅ Home Icon */}
        <HomeOutlinedIcon onClick={() => navigate("/Navbar")} className="icon" />

        {/* ✅ Dark/Light Mode Toggle */}
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} className="icon" />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} className="icon" />
        )}

        {/* ✅ Search Bar with Results */}
        <div className="search-container" ref={dropdownRef}>
          <div className="search">
            <SearchOutlinedIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search Users..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* ✅ Search Results */}
          {dropdownOpen && (
            <div className="search-dropdown">
              {loading ? (
                <p className="loading">Loading...</p>
              ) : filteredUsers.length === 0 ? (
                <p className="no-results">No users found.</p>
              ) : (
                <ul className="dropdown-list">
                  {filteredUsers.map((user) => (
                    <li
                      key={user.id}
                      className="dropdown-item"
                      onClick={() => handleUserClick(user)}
                    >
                      <img
                        src={user.profilePic || "/default-avatar.png"}
                        alt={user.username}
                        className="result-pic"
                      />
                      <span className="result-username">{user.username}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Right Section */}
      <div className="right">
        <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer">
          <EmailOutlinedIcon className="icon" />
        </a>

        <a
          href="https://www.linkedin.com/in/mahesh-talluri-1b46b6279"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon className="icon" />
        </a>

        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="icon" />
        </a>

        {/* ✅ Profile Icon */}
        <PersonOutlinedIcon className="icon" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Navbar;



