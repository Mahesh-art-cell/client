// import "./friends.css";
// import { useState, useEffect } from "react";
// import { makeRequest } from "../../axios"; // ✅ Use the configured axios instance

// const Friends = () => {
//   const [counts, setCounts] = useState({ followers: 0, following: 0 });
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch Followers and Following Counts
//   const fetchCounts = async () => {
//     try {
//       const res = await makeRequest.get("/relationships/counts");
//       setCounts(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching counts:", err.message);
//     }
//   };

//   // ✅ Fetch Suggestions
//   const fetchSuggestions = async () => {
//     try {
//       const res = await makeRequest.get("/relationships/suggestions");
//       setSuggestions(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching suggestions:", err.message);
//     }
//   };

//   // ✅ Fetch Data on Component Mount
//   useEffect(() => {
//     const fetchData = async () => {
//       await Promise.all([fetchCounts(), fetchSuggestions()]);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   // ✅ Handle Follow/Unfollow
//   const handleFollow = async (userId, action) => {
//     try {
//       if (action === "follow") {
//         await makeRequest.post("/relationships/", {
//           followedUserId: userId,
//         });
//       } else {
//         await makeRequest.delete(`/relationships/?userId=${userId}`);
//       }
//       // ✅ Refresh Counts and Suggestions After Action
//       fetchCounts();
//       fetchSuggestions();
//     } catch (err) {
//       console.error(`❌ Error trying to ${action}:`, err.message);
//     }
//   };

//   // ✅ Show Loading Indicator While Fetching Data
//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="friends">
//       <div className="container">
//         {/* ✅ Followers and Following Counts */}
//         <div className="counts">
//           <div className="count-item">
//             <span className="label">Followers:</span>
//             <span className="value">{counts.followers}</span>
//           </div>
//           <div className="count-item">
//             <span className="label">Following:</span>
//             <span className="value">{counts.following}</span>
//           </div>
//         </div>

//         {/* ✅ Suggestions List */}
//         <div className="suggestions">
//           <h3>Suggestions for You</h3>
//           {suggestions.length === 0 ? (
//             <p>No suggestions available</p>
//           ) : (
//             <ul>
//               {suggestions.map((user) => (
//                 <li key={user.id} className="suggestion-item">
//                   <img
//                     src={user.profilePic}
//                     alt={user.username}
//                     className="profile-pic"
//                   />
//                   <div className="info">
//                     <span className="username">{user.username}</span>
//                   </div>
//                   <button
//                     className="follow-btn"
//                     onClick={() => handleFollow(user.id, "follow")}
//                   >
//                     Follow
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Friends;




// import "./friends.css";
// import { useState, useEffect } from "react";
// import { makeRequest } from "../../axios"; // ✅ Use the configured axios instance

// const Friends = () => {
//   const [counts, setCounts] = useState({ followers: 0, following: 0 });
//   const [suggestions, setSuggestions] = useState([]);
//   const [allUsers, setAllUsers] = useState([]); // ✅ Store all users for search
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // ✅ Fetch Followers and Following Counts
//   const fetchCounts = async () => {
//     try {
//       const res = await makeRequest.get("/relationships/counts");
//       setCounts(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching counts:", err.message);
//     }
//   };

//   // ✅ Fetch Suggestions and All Users for Search
//   const fetchSuggestions = async () => {
//     try {
//       const res = await makeRequest.get("/relationships/suggestions");
//       if (res.data && Array.isArray(res.data)) {
//         setAllUsers(res.data); // ✅ Store all users in state
//         setSuggestions(res.data); // ✅ Set suggestions to show initially
//         setFilteredUsers(res.data); // ✅ Show all users initially
//       } else {
//         setAllUsers([]);
//         setSuggestions([]);
//         setFilteredUsers([]);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching suggestions:", err.message);
//       setAllUsers([]);
//       setSuggestions([]);
//       setFilteredUsers([]);
//     }
//   };

//   // ✅ Fetch Data on Component Mount
//   useEffect(() => {
//     const fetchData = async () => {
//       await Promise.all([fetchCounts(), fetchSuggestions()]);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   // ✅ Handle Follow/Unfollow
//   const handleFollow = async (userId, action) => {
//     try {
//       if (action === "follow") {
//         await makeRequest.post("/relationships/", {
//           followedUserId: userId,
//         });
//       } else {
//         await makeRequest.delete(`/relationships/?userId=${userId}`);
//       }
//       // ✅ Refresh Counts and Suggestions After Action
//       fetchCounts();
//       fetchSuggestions();
//     } catch (err) {
//       console.error(`❌ Error trying to ${action}:`, err.message);
//     }
//   };

//   // ✅ Handle User Search
//   const handleSearch = (e) => {
//     const input = e.target.value.toLowerCase();
//     setSearchTerm(input);

//     // ✅ Safely check if allUsers is valid
//     if (!allUsers || allUsers.length === 0) {
//       console.warn("🚨 No users found. Search cannot proceed.");
//       return;
//     }

//     // ✅ Filter Users by Matching Search Term
//     const filtered = allUsers.filter((user) =>
//       user.username.toLowerCase().includes(input)
//     );
//     setFilteredUsers(filtered);
//   };

//   // ✅ Show Loading Indicator While Fetching Data
//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="friends">
//       <div className="container">
//         {/* ✅ Search Input */}
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search Users..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         </div>

//         {/* ✅ Followers and Following Counts */}
//         <div className="counts">
//           <div className="count-item">
//             <span className="label">Followers:</span>
//             <span className="value">{counts.followers}</span>
//           </div>
//           <div className="count-item">
//             <span className="label">Following:</span>
//             <span className="value">{counts.following}</span>
//           </div>
//         </div>

//         {/* ✅ Suggestions / Filtered User List */}
//         <div className="suggestions">
//           <h3>Suggestions for You</h3>
//           {filteredUsers.length === 0 ? (
//             <p>No users found matching your search.</p>
//           ) : (
//             <ul>
//               {filteredUsers.map((user) => (
//                 <li key={user.id} className="suggestion-item">
//                   <img
//                     src={user.profilePic}
//                     alt={user.username}
//                     className="profile-pic"
//                   />
//                   <div className="info">
//                     <span className="username">{user.username}</span>
//                   </div>
//                   <button
//                     className="follow-btn"
//                     onClick={() => handleFollow(user.id, "follow")}
//                   >
//                     Follow
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Friends;




// import "./navbar.css";
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
