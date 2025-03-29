
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
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ State to Store and Filter Users
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Users on Component Mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await makeRequest.get("/relationships/suggestions"); // ✅ Get all users
        if (res.data && Array.isArray(res.data)) {
          setAllUsers(res.data);
          setFilteredUsers(res.data); // ✅ Show all users initially
        } else {
          setAllUsers([]);
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        setAllUsers([]);
        setFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Handle Search Input
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);
    setSearchActive(input.length > 0);

    const filtered = allUsers.filter((user) =>
      user.username.toLowerCase().includes(input)
    );
    setFilteredUsers(filtered);
  };

  // ✅ Handle Follow/Unfollow
  const handleFollow = async (userId, action) => {
    try {
      if (action === "follow") {
        await makeRequest.post("/relationships/", {
          followedUserId: userId,
        });
        toast.success("✅ Followed successfully!");
      } else {
        await makeRequest.delete(`/relationships/?userId=${userId}`);
        toast.info("🚫 Unfollowed successfully.");
      }
    } catch (err) {
      console.error(`❌ Error trying to ${action}:`, err.message);
      toast.error(`❌ Failed to ${action}.`);
    }
  };

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("✅ Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("❌ Error while logging out.");
    }
  };

  return (
    <div className={`navbar ${darkMode ? "dark" : "light"}`}>
      {/* ✅ Left Side of Navbar */}
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>lamasocial</span>
        </Link>
        <HomeOutlinedIcon onClick={() => navigate("/Navbar")} style={{ cursor: "pointer" }} />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} style={{ cursor: "pointer" }} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} style={{ cursor: "pointer" }} />
        )}

        {/* ✅ Search Box */}
        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* ✅ Display Search Results */}
      {searchActive && (
        <div className="search-results">
          {loading ? (
            <p>Loading...</p>
          ) : filteredUsers.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id} className="search-item">
                  <img src={user.profilePic || "/default-avatar.png"} alt={user.username} />
                  <div className="info">
                    <span className="username">{user.username}</span>
                    <button
                      className="follow-btn"
                      onClick={() => handleFollow(user.id, "follow")}
                    >
                      Follow
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ✅ Right Side of Navbar */}
      <div className="right">
        <a
          href="https://mail.google.com"
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

        <PersonOutlinedIcon onClick={() => setDropdownOpen(!dropdownOpen)} style={{ cursor: "pointer" }} />
        {dropdownOpen && (
          <div className="dropdown" ref={dropdownRef}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

