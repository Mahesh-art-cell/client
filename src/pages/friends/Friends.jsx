
// import "./friends.css";
// import { useState, useEffect } from "react";
// import { makeRequest } from "../../axios"; // ✅ Use the configured axios instance

// const Friends = () => {
//   const [counts, setCounts] = useState({ followers: 0, following: 0 });
//   const [suggestions, setSuggestions] = useState([]);
//   const [allUsers, setAllUsers] = useState([]); // ✅ Store all users for search
//   const [filteredUsers, setFilteredUsers] = useState([]); // ✅ Filtered users for display
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState(""); // ✅ Search term state

//   // ✅ Fetch Followers and Following Counts
//   const fetchCounts = async () => {
//     try {
//       const res = await makeRequest.get("/relationships/counts");
//       setCounts(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching counts:", err.message);
//     }
//   };

//   // ✅ Fetch Suggestions and Store in allUsers
//   const fetchSuggestions = async () => {
//     try {
//       const res = await makeRequest.get("/relationships/suggestions");
//       if (res.data && Array.isArray(res.data)) {
//         setSuggestions(res.data);
//         setAllUsers(res.data); // ✅ Store all users for search
//         setFilteredUsers(res.data); // ✅ Show all users initially
//       } else {
//         setSuggestions([]);
//         setAllUsers([]);
//         setFilteredUsers([]);
//       }
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

//   // ✅ Handle User Search
//   const handleSearch = (e) => {
//     const input = e.target.value.toLowerCase();
//     setSearchTerm(input);

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
//         {/* ✅ Search Bar */}
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

//         {/* ✅ Suggestions List */}
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
  const [allUsers, setAllUsers] = useState([]); // ✅ Store all users for search and suggestions
  const [filteredUsers, setFilteredUsers] = useState([]); // ✅ Filtered users for display
  const [followedUsers, setFollowedUsers] = useState(new Set()); // ✅ Track followed users
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

  // ✅ Fetch All Users for Suggestions and Search
  const fetchAllUsers = async () => {
    try {
      const res = await makeRequest.get("/relationships/allUsers"); // ✅ Correct API route
      if (res.data && Array.isArray(res.data)) {
        setAllUsers(res.data);
        setFilteredUsers(res.data); // ✅ Show all users initially
      } else {
        setAllUsers([]);
        setFilteredUsers([]);
      }
    } catch (err) {
      console.error("❌ Error fetching all users:", err.message);
    }
  };

  // ✅ Fetch Followed Users to Track Follow Status
  const fetchFollowedUsers = async () => {
    try {
      const res = await makeRequest.get("/relationships/");
      const followedSet = new Set(res.data.map((id) => parseInt(id)));
      setFollowedUsers(followedSet);
    } catch (err) {
      console.error("❌ Error fetching followed users:", err.message);
    }
  };

  // ✅ Fetch Data on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCounts(), fetchAllUsers(), fetchFollowedUsers()]);
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
        followedUsers.add(userId); // ✅ Add to followed list
        setCounts((prev) => ({
          ...prev,
          following: prev.following + 1,
        }));
      } else {
        await makeRequest.delete(`/relationships/?userId=${userId}`);
        followedUsers.delete(userId); // ✅ Remove from followed list
        setCounts((prev) => ({
          ...prev,
          following: prev.following - 1,
        }));
      }

      // ✅ Update Followed Users Set
      setFollowedUsers(new Set(followedUsers));
    } catch (err) {
      console.error(`❌ Error trying to ${action}:`, err.message);
    }
  };

  // ✅ Handle User Search
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);

    // ✅ Always Filter from All Users (Not Just Suggestions)
    const filtered = allUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(input) ||
        user.name.toLowerCase().includes(input)
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
                    src={user.profilePic || "/default-profile.png"}
                    alt={user.username}
                    className="profile-pic"
                  />
                  <div className="info">
                    <span className="username">{user.username}</span>
                    <span className="name">{user.name}</span>
                  </div>

                  {/* ✅ Follow/Unfollow Button */}
                  {followedUsers.has(user.id) ? (
                    <button
                      className="following-btn"
                      onClick={() => handleFollow(user.id, "unfollow")}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="follow-btn"
                      onClick={() => handleFollow(user.id, "follow")}
                    >
                      Follow
                    </button>
                  )}
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
