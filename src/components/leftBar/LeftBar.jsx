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
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Handle Profile Click and Navigate to Profile
  const handleProfileClick = () => {
    navigate(`/profile/${currentUser.id}`); // Dynamically navigate to profile
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* ✅ User Profile Click to Navigate */}
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

          {/* ✅ Friends Section */}
          <div className="item">
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
