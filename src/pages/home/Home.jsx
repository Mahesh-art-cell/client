// import Stories from "../../components/stories/Stories"
// import Posts from "../../components/posts/Posts"
// import Share from "../../components/share/Share"
// import "./home.css"

// const Home = () => {
//   return (
//     <div className="home">
//       <Stories/>
//       <Share/>
//       <Posts/>
//     </div>
//   )
// }

// export default Home



import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.css";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

const Home = () => {
  const [filteredUsers, setFilteredUsers] = useState([]); // ✅ Store search results
  const [searchActive, setSearchActive] = useState(false); // ✅ Check if search is active

  // ✅ Check if there are filtered users in localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem("filteredUsers");
    if (storedUsers) {
      setFilteredUsers(JSON.parse(storedUsers));
      setSearchActive(true); // ✅ Show results only after search
    } else {
      setFilteredUsers([]);
      setSearchActive(false);
    }
  }, []);

  // ✅ Handle Follow/Unfollow Action
  const handleFollow = async (userId, action) => {
    try {
      if (action === "follow") {
        await makeRequest.post("/relationships/", {
          followedUserId: userId,
        });
        alert("✅ Followed successfully!");
      } else {
        await makeRequest.delete(`/relationships/?userId=${userId}`);
        alert("🚫 Unfollowed successfully.");
      }
    } catch (err) {
      console.error(`❌ Error trying to ${action}:`, err.message);
      alert(`❌ Failed to ${action}.`);
    }
  };

  return (
    <div className="home">
      {/* ✅ Show Search Results if Search is Active */}
      {searchActive && filteredUsers.length > 0 ? (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul className="results-list">
            {filteredUsers.map((user) => (
              <li key={user.id} className="result-item">
                <img
                  src={user.profilePic || "/default-avatar.png"}
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
        </div>
      ) : (
        // ✅ Default Home Page Content (Stories, Share, Posts)
        <>
          <Stories />
          <Share />
          <Posts />
        </>
      )}
    </div>
  );
};

export default Home;
