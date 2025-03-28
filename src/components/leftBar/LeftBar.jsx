
// import "./leftBar.scss";
// import Friends from "../../assets/1.png";
// import { AuthContext } from "../../context/authContext";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

// const LeftBar = () => {
//   const { currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // ✅ Handle Profile Click and Navigate to Profile
//   const handleProfileClick = () => {
//     navigate(`/profile/${currentUser.id}`); // Dynamically navigate to profile
//   };

//   return (
//     <div className="leftBar">
//       <div className="container">
//         <div className="menu">
//           {/* ✅ User Profile Click to Navigate */}
//           <div
//             className="user"
//             onClick={handleProfileClick}
//             style={{ cursor: "pointer" }}
//           >
//             <img
//               src={currentUser.profilePic || "/default-avatar.png"}
//               alt="User Profile"
//             />
//             <span>{currentUser.name}</span>
//           </div>

//           {/* ✅ Friends Section */}
//           <div className="item">
//             <img src={Friends} alt="Friends" />
//             <span>Friends</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeftBar;




import "./leftBar.scss";
import Friends from "../../assets/1.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Navigate to Profile
  const handleProfileClick = () => {
    navigate(`/profile/${currentUser.id}`);
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
              src={currentUser.profilePic || "/default-avatar.png"}
              alt="User Profile"
            />
            <span>{currentUser.name}</span>
          </div>

          {/* ✅ Friends Section Click */}
          <div className="item" onClick={handleFriendsClick} style={{ cursor: "pointer" }}>
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
