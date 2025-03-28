// import "./leftBar.scss";
// import Friends from "../../assets/1.png";
// import { AuthContext } from "../../context/authContext";
// import { useContext } from "react";

// const LeftBar = () => {

//   const { currentUser } = useContext(AuthContext);

//   return (
//     <div className="leftBar">
//       <div className="container">
//         <div className="menu">
//           <div className="user">
//             <img
//               src={"/upload/" +currentUser.profilePic}
//               alt=""
//             />
//             <span>{currentUser.name}</span>
//           </div>
//           <div>
//             <span>Profile</span>

//           </div>
//           <div className="item">
//             <img src={Friends} alt="" />
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
import { useContext, useState } from "react";
import Profile from "../../pages/profile/Profile"; // Import Profile Page

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile((prev) => !prev); // Toggle Profile Visibility
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* ✅ User Profile Section */}
          <div className="user" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
            <img
              src={currentUser.profilePic || "/default-avatar.png"}
              alt="User Profile"
            />
            <span>{currentUser.name}</span>
          </div>

          {/* ✅ Profile Menu */}
          <div className="item">
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
        </div>
      </div>

      {/* ✅ Show Profile Page when clicked */}
      {showProfile && <Profile />}
    </div>
  );
};

export default LeftBar;
