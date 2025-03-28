import "./friends.css";
import { useState, useEffect } from "react";
import { makeRequest } from "../../axios"; // ✅ Use the configured axios instance

const Friends = () => {
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Followers and Following Counts
  const fetchCounts = async () => {
    try {
      const res = await makeRequest.get("/relationships/counts");
      setCounts(res.data);
    } catch (err) {
      console.error("❌ Error fetching counts:", err.message);
    }
  };

  // ✅ Fetch Suggestions
  const fetchSuggestions = async () => {
    try {
      const res = await makeRequest.get("/relationships/suggestions");
      setSuggestions(res.data);
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

  // ✅ Show Loading Indicator While Fetching Data
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="friends">
      <div className="container">
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
          {suggestions.length === 0 ? (
            <p>No suggestions available</p>
          ) : (
            <ul>
              {suggestions.map((user) => (
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
