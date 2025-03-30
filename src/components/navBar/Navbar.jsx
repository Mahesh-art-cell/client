
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
// import { makeRequest } from "../../axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Navbar = () => {
//   // ✅ Get Context Data
//   const { toggle, darkMode } = useContext(DarkModeContext);
//   const { currentUser, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // ✅ State to Control Dropdown and Search Results
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
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

//   // ✅ Handle Search Logic
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         if (searchTerm.trim() === "") {
//           setSearchResults([]); // ✅ Clear results if no input
//           return;
//         }

//         // ✅ Fetch all users from API
//         const res = await makeRequest.get("/users/allUsers");
//         const allUsers = res.data;

//         // ✅ Filter Users Matching Search Term
//         const filteredUsers = allUsers.filter((user) =>
//           user.username.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//         setSearchResults(filteredUsers);
//       } catch (error) {
//         console.error("❌ Error fetching users:", error);
//         toast.error("Error fetching users.");
//       }
//     };

//     const delay = setTimeout(fetchUsers, 300); // ✅ Debounce to avoid unnecessary API calls
//     return () => clearTimeout(delay);
//   }, [searchTerm]);

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

//   // console.log(allUsers)

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
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           {/* ✅ Display Search Results */}
//           {searchResults.length > 0 && (
//             <div className="search-results">
//               {searchResults.map((user) => (
//                 <div
//                   key={user.id}
//                   className="search-result-item"
//                   onClick={() => navigate(`/profile/${user.id}`)}
//                 >
//                   <img
//                     src={user.profilePic || "/default-avatar.png"}
//                     alt="User Avatar"
//                     className="search-avatar"
//                   />
//                   <div className="user-info">
//                     <span>{user.name}</span>
//                     <span className="email">{user.email}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ✅ Right Side of Navbar */}
//       <div className="right">
//         <a
//           href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "inherit" }}
//         >
//           <EmailOutlinedIcon style={{ cursor: "pointer" }} />
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
  // ✅ Get Context Data
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ State to Control Dropdown and Search Results
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);

  // ✅ Handle Logout Logic with Toast Confirmation
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
            await logout(); // ✅ Call logout from AuthContext
            console.log("✅ Logout successful, redirecting to /login...");

            // ✅ Show success toast
            toast.success("✅ Logged out successfully!");

            // ✅ Redirect to login page after logout
            navigate("/login");

            // ✅ Fallback: Ensures redirection if navigate() fails
            setTimeout(() => {
              window.location.href = "/login";
            }, 500);
            resolve(); // Complete the promise
          } catch (error) {
            console.error("❌ Logout error:", error);
            toast.error("❌ Error while logging out.");
            reject(error);
          }
        } else {
          toast.info("🚫 Logout cancelled.");
          reject("User cancelled logout.");
        }
      }),
      {
        pending: "Processing logout...",
        success: "Logout completed successfully!",
      }
    );
  };

  // ✅ Handle Search Logic
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (searchTerm.trim() === "") {
          setSearchResults([]); // ✅ Clear results if no input
          return;
        }

        // ✅ Fetch all users from API
        const res = await makeRequest.get("/users/allUsers");
        const allUsers = res.data;

        // ✅ Filter Users Matching Search Term
        const filteredUsers = allUsers.filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredUsers);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        toast.error("Error fetching users.");
      }
    };

    const delay = setTimeout(fetchUsers, 300); // ✅ Debounce to avoid unnecessary API calls
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // ✅ Handle User Click to Navigate Without Clearing Search Results
  const handleUserClick = (e, userId) => {
    e.preventDefault();

    // ✅ Navigate to User Profile
    navigate(`/profile/${userId}`);

    // ✅ Optional: Clear search after selecting user
    setSearchTerm(""); // Clear search term after navigation
    setSearchResults([]); // ✅ Clear results explicitly only after navigation
  };

  // ✅ Handle Home Redirection
  const handleHomeClick = () => {
    navigate("/Navbar"); // ✅ Redirect to home page
  };

  // ✅ Handle Person Icon Click to Show Dropdown
  const handlePersonClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // ✅ Close Dropdown When Clicking Outside
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
      {/* ✅ Left Side of Navbar */}
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>lamasocial</span>
        </Link>

        {/* ✅ Redirect to Home when Home Icon is Clicked */}
        <HomeOutlinedIcon onClick={handleHomeClick} style={{ cursor: "pointer" }} />

        {/* ✅ Toggle Dark/Light Mode */}
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* ✅ Display Search Results */}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="search-result-item"
                  onClick={(e) => handleUserClick(e, user.id)}
                >
                  <img
                    src={user.profilePic || "/default-avatar.png"}
                    alt="User Avatar"
                    className="search-avatar"
                  />
                  <div className="user-info">
                    <span>{user.name}</span>
                    <span className="email">{user.email}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Right Side of Navbar */}
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
        <PersonOutlinedIcon onClick={handlePersonClick} style={{ cursor: "pointer" }} />

        {/* ✅ Profile Picture & Dropdown Menu */}
        <div className="user" ref={dropdownRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
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
