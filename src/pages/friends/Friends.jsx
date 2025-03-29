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




import "./friends.css";
import { useState, useEffect } from "react";
import { makeRequest } from "../../axios"; // ✅ Use the configured axios instance

const Friends = () => {
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [suggestions, setSuggestions] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // ✅ Store all users for search
  const [filteredUsers, setFilteredUsers] = useState([]); // ✅ Filtered users for display
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search term state

  // ✅ Fetch Followers and Following Counts
  const fetchCounts = async () => {
    try {
      const res = await makeRequest.get("/relationships/counts");
      setCounts(res.data);
    } catch (err) {
      console.error("❌ Error fetching counts:", err.message);
    }
  };

  // ✅ Fetch Suggestions and Store in allUsers
  const fetchSuggestions = async () => {
    try {
      const res = await makeRequest.get("/relationships/suggestions");
      if (res.data && Array.isArray(res.data)) {
        setSuggestions(res.data);
        setAllUsers(res.data); // ✅ Store all users for search
        setFilteredUsers(res.data); // ✅ Show all users initially
      } else {
        setSuggestions([]);
        setAllUsers([]);
        setFilteredUsers([]);
      }
    } catch (err) {
      console.error("❌ Error fetching suggestions:", err.message);
    }
  };

  // ✅ Fetch Data on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCounts(), fetchSuggestions()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // ✅ Handle Follow/Unfollow
  const handleFollow = async (userId, action) => {
    try {
      if (action === "follow") {
        await makeRequest.post("/relationships/", {
          followedUserId: userId,
        });
      } else {
        await makeRequest.delete(`/relationships/?userId=${userId}`);
      }
      // ✅ Refresh Counts and Suggestions After Action
      fetchCounts();
      fetchSuggestions();
    } catch (err) {
      console.error(`❌ Error trying to ${action}:`, err.message);
    }
  };

  // ✅ Handle User Search
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);

    // ✅ Filter Users by Matching Search Term
    const filtered = allUsers.filter((user) =>
      user.username.toLowerCase().includes(input)
    );
    setFilteredUsers(filtered);
  };

  // ✅ Show Loading Indicator While Fetching Data
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="friends">
      <div className="container">
        {/* ✅ Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* ✅ Followers and Following Counts */}
        <div className="counts">
          <div className="count-item">
            <span className="label">Followers:</span>
            <span className="value">{counts.followers}</span>
          </div>
          <div className="count-item">
            <span className="label">Following:</span>
            <span className="value">{counts.following}</span>
          </div>
        </div>

        {/* ✅ Suggestions List */}
        <div className="suggestions">
          <h3>Suggestions for You</h3>
          {filteredUsers.length === 0 ? (
            <p>No users found matching your search.</p>
          ) : (
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id} className="suggestion-item">
                  <img
                    src={user.profilePic}
                    alt={user.username}
                    className="profile-pic"
                  />
                  <div className="info">
                    <span className="username">{user.username}</span>
                  </div>
                  <button
                    className="follow-btn"
                    onClick={() => handleFollow(user.id, "follow")}
                  >
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
