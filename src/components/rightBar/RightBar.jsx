

import "./rightBar.css";
import { useEffect, useState, useContext } from "react";
import { makeRequest } from "../../axios";
// import { DarkModeContext } from "../../context/DarkModeContext"; // ✅ Import Context
import { DarkModeContext } from "../../context/darkModeContext";

const RightBar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { darkMode } = useContext(DarkModeContext); // ✅ Get Dark Mode Status

  // ✅ Fetch User Suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await makeRequest.get("/relationships/suggestions");
        console.log("✅ Suggestions Data:", res.data);
        setSuggestions(res.data);
      } catch (err) {
        console.error("❌ Error fetching suggestions:", err);
      }
    };
    fetchSuggestions();
  }, []);

  // ✅ Handle Follow User
  const handleFollow = async (userId) => {
    try {
      await makeRequest.post("/relationships", {
        followedUserId: userId,
      });
      setSuggestions((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("❌ Error following user:", err);
    }
  };

  // ✅ Handle Dismiss User
  const handleDismiss = (userId) => {
    setSuggestions((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className={`rightBar ${darkMode ? "dark" : ""}`}>
      <div className="container">
        {/* ✅ Suggestions Section */}
        <div className="item">
          <span>Suggestions For You</span>
          {suggestions.length > 0 ? (
            suggestions.map((user) => (
              <div className="user" key={user.id}>
                <div className="userInfo">
                  <img
                    src={user.profilePic || "https://via.placeholder.com/50"}
                    alt={user.username}
                  />
                  <span>{user.username}</span>
                </div>
                <div className="buttons">
                  <button onClick={() => handleFollow(user.id)}>Follow</button>
                  <button onClick={() => handleDismiss(user.id)}>Dismiss</button>
                </div>
              </div>
            ))
          ) : (
            <p>No suggestions available!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
