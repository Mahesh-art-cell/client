
import "./leftBar.css";
import Friends from "../../assets/1.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("✅ currentUser:", currentUser);

  // ✅ Navigate to Profile
  const handleProfileClick = () => {
    navigate(`/profile/${currentUser?.id}`);
  };

  // ✅ Navigate to Friends Page
  const handleFriendsClick = () => {
    navigate(`/friends`);
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* ✅ User Profile Click */}
          <div
            className="user"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          >
            <img
              src={currentUser?.profilePic || "/default-avatar.png"}
              alt="Profile"
            />
            <span>{currentUser?.name || "Profile"}</span>
          </div>

          {/* ✅ Friends Section Click */}
          <div
            className="item"
            onClick={handleFriendsClick}
            style={{ cursor: "pointer" }}
          >
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;


