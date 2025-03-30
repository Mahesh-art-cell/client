
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
import { makeRequest } from "../../axios";

const Friends = () => {
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [followingList, setFollowingList] = useState([]); // List of users you follow
  const [followedUserIds, setFollowedUserIds] = useState(new Set()); // Set of IDs for quick lookup
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // This function will fetch all the required data
  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch counts
      const countsRes = await makeRequest.get("/relationships/counts");
      if (countsRes.data) {
        setCounts(countsRes.data);
      }
      
      // Fetch all users for suggestions
      const allUsersRes = await makeRequest.get("/relationships/suggestions");
      if (allUsersRes.data && Array.isArray(allUsersRes.data)) {
        setAllUsers(allUsersRes.data);
        setFilteredUsers(allUsersRes.data);
      } else {
        setAllUsers([]);
        setFilteredUsers([]);
      }
      
      // Fetch followed users
      const followedUsersRes = await makeRequest.get("/relationships/followedUsers");
      if (followedUsersRes.data && Array.isArray(followedUsersRes.data)) {
        setFollowingList(followedUsersRes.data);
        setFollowedUserIds(new Set(followedUsersRes.data.map(user => user.id)));
      } else {
        setFollowingList([]);
        setFollowedUserIds(new Set());
      }
    } catch (err) {
      console.error("❌ Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchAllData();
    
    // Add event listener for page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Handle page visibility changes (user switches tabs or returns to the page)
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      // Refresh data when page becomes visible again
      fetchAllData();
    }
  };

  // Update filtered users when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(allUsers);
    } else {
      const term = searchTerm.toLowerCase();
      const filteredSuggestions = allUsers.filter(user => 
        user.username.toLowerCase().includes(term)
      );
      setFilteredUsers(filteredSuggestions);
    }
  }, [searchTerm, allUsers]);

  // Handle Follow User
  const handleFollow = async (userId) => {
    try {
      await makeRequest.post("/relationships/", {
        followedUserId: userId
      });
      
      // Find the user in allUsers
      const userToFollow = allUsers.find(user => user.id === userId);
      if (userToFollow) {
        // Update followingList by adding the user
        setFollowingList(prev => [...prev, userToFollow]);
        // Update the Set of followed user IDs
        setFollowedUserIds(prev => new Set([...prev, userId]));
      }
      
      // Refresh counts
      const countsRes = await makeRequest.get("/relationships/counts");
      if (countsRes.data) {
        setCounts(countsRes.data);
      }
    } catch (err) {
      console.error("❌ Error following user:", err.message);
      // If an error occurs, refresh all data to ensure consistency
      fetchAllData();
    }
  };

  // Handle Unfollow User
  const handleUnfollow = async (userId) => {
    try {
      await makeRequest.delete(`/relationships/?userId=${userId}`);
      
      // Remove user from followingList
      setFollowingList(prev => prev.filter(user => user.id !== userId));
      // Remove ID from the Set of followed user IDs
      setFollowedUserIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
      
      // Refresh counts
      const countsRes = await makeRequest.get("/relationships/counts");
      if (countsRes.data) {
        setCounts(countsRes.data);
      }
    } catch (err) {
      console.error("❌ Error unfollowing user:", err.message);
      // If an error occurs, refresh all data to ensure consistency
      fetchAllData();
    }
  };

  // Handle User Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the followingList based on search term
  const filteredFollowing = searchTerm.trim() === "" 
    ? followingList 
    : followingList.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="friends">
      <div className="container">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Followers and Following Counts */}
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
        
        {/* Following Section */}
        <div className="following-section">
          <h3>People You Follow</h3>
          {filteredFollowing.length === 0 ? (
            searchTerm ? (
              <p>No followed users match your search.</p>
            ) : (
              <p>You're not following anyone yet.</p>
            )
          ) : (
            <ul>
              {filteredFollowing.map((user) => (
                <li key={user.id} className="following-item">
                  <img
                    src={user.profilePic || "/default-profile.jpg"}
                    alt={user.username}
                    className="profile-pic"
                    onError={(e) => {e.target.src = "/default-profile.jpg"}}
                  />
                  <div className="info">
                    <span className="username">{user.username}</span>
                  </div>
                  <button
                    className="following-btn"
                    onClick={() => handleUnfollow(user.id)}
                  >
                    Following
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Suggestions Section */}
        <div className="suggestions">
          <h3>Suggestions for You</h3>
          {filteredUsers.filter(user => !followedUserIds.has(user.id)).length === 0 ? (
            searchTerm ? (
              <p>No suggestions match your search.</p>
            ) : (
              <p>No more suggestions available.</p>
            )
          ) : (
            <ul>
              {filteredUsers
                .filter(user => !followedUserIds.has(user.id)) // Only show users you don't follow
                .map((user) => (
                  <li key={user.id} className="suggestion-item">
                    <img
                      src={user.profilePic || "/default-profile.jpg"}
                      alt={user.username}
                      className="profile-pic"
                      onError={(e) => {e.target.src = "/default-profile.jpg"}}
                    />
                    <div className="info">
                      <span className="username">{user.username}</span>
                    </div>
                    <button
                      className="follow-btn"
                      onClick={() => handleFollow(user.id)}
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