


import "./friends.css";
import { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Friends = () => {
  const { currentUser } = useContext(AuthContext); // ✅ Get current user info
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [suggestions, setSuggestions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [followingUserIds, setFollowingUserIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch followers/following count and who you follow
  const fetchCountsAndFollowing = async () => {
    try {
      const countRes = await makeRequest.get("/relationships/counts");
      setCounts(countRes.data);
      console.log(countRes)

      const followRes = await makeRequest.get("/relationships/followingIds");
      setFollowingUserIds(followRes.data); // [userId1, userId2, ...]

      console.log(followRes)
    } catch (err) {
      console.error("❌ Error fetching counts or following IDs:", err.message);
    }
  };

  // ✅ Fetch suggestions
  const fetchSuggestions = async () => {
    try {
      const res = await makeRequest.get("/relationships/suggestions");
      const users = res.data || [];
      console.log(res)
      setSuggestions(users);
      setAllUsers(users);
      setFilteredUsers(users);
    } catch (err) {
      console.error("❌ Error fetching suggestions:", err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCountsAndFollowing(), fetchSuggestions()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // ✅ Toggle Follow/Unfollow
  const handleFollow = async (userId) => {
    const isFollowing = followingUserIds.includes(userId);
    try {
      if (isFollowing) {
        await makeRequest.delete(`/relationships/?userId=${userId}`);
      } else {
        await makeRequest.post("/relationships", { followedUserId: userId });
      }

      // ✅ Refresh state after follow/unfollow
      fetchCountsAndFollowing();
      fetchSuggestions();
    } catch (err) {
      console.error(`❌ Failed to ${isFollowing ? "unfollow" : "follow"}:`, err.message);
    }
  };

  // ✅ Search users by username
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);

    const filtered = allUsers.filter((user) =>
      user.username.toLowerCase().includes(input)
    );
    setFilteredUsers(filtered);
  };

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
              {filteredUsers.map((user) => {
                const isFollowing = followingUserIds.includes(user.id);
                return (
                  <li key={user.id} className="suggestion-item">
                    <img
                      src={user.profilePic || "/default-avatar.png"}
                      alt={user.username}
                      className="profile-pic"
                    />
                    <div className="info">
                      <span className="username">{user.username}</span>
                    </div>
                    <button
                      className={`follow-btn ${isFollowing ? "unfollow" : "follow"}`}
                      onClick={() => handleFollow(user.id)}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
