

// // 📁 src/pages/profile/Profile.jsx
// import "./profile.css";
// import { useContext, useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { useLocation } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import Update from "../../components/update/Update";
// import Share from "../../components/share/Share";
// import Posts from "../../components/posts/Posts";

// const Profile = () => {
//   const [openUpdate, setOpenUpdate] = useState(false);
//   // const { currentUser, login } = useContext(AuthContext);
//   const { currentUser, updateProfile } = useContext(AuthContext);


//   const queryClient = useQueryClient();
//   const location = useLocation();

//   const userId = location.pathname.split("/")[2];

//   const { isLoading, error, data: profileData } = useQuery(
//     ["user", userId],
//     async () => {
//       const res = await makeRequest.get(`/users/find/${userId}`);
//       return res.data;
//     }
//   );

//   console.log("userId:", userId);
// console.log("currentUser.id:", currentUser.id);
// console.log("Match:", userId === currentUser.id);
// comment.userId._id === currentUser?.id 

//   // const handleProfileUpdate = (updatedUser) => {
//   //   login(updatedUser); // Update user in context
//   //   queryClient.invalidateQueries(["user", userId]);
//   //   setOpenUpdate(false);
//   // };


//   const handleProfileUpdate = (updatedUser) => {
//   updateProfile(updatedUser); // ✅ Correct usage
//   queryClient.invalidateQueries(["user", userId]);
//   setOpenUpdate(false);
// };


//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading profile</div>;

//   return (
//     <div className="profile">
//       <div className="images">
//         <img src={profileData.coverPic || "/default-cover.png"} alt="Cover" className="cover" />
//         <img src={profileData.profilePic || "/default-avatar.png"} alt="Profile" className="profilePic" />
//       </div>

//       <div className="profileContainer">
//         <div className="uInfo">
//           <div className="center">
//             <span>{profileData.name}</span>
//             {userId === currentUser.id && (
//               <button className="updateBtn" onClick={() => setOpenUpdate(true)}>
//                 Update your profile
//               </button>
//             )}
//           </div>
//         </div>

//         {userId === currentUser._id && <Share />}
//         <Posts userId={userId} />
//       </div>

//       {/* ✅ Modal triggered here */}
//       {openUpdate && (
//         <Update
//           user={profileData}
//           setOpenUpdate={setOpenUpdate}
//           onProfileUpdate={handleProfileUpdate}
//         />
//       )}
//     </div>
//   );
// };

// export default Profile;



// 📁 src/pages/profile/Profile.jsx
import "./profile.css";
import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import Share from "../../components/share/Share";
import Posts from "../../components/posts/Posts";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser, updateProfile } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const { isLoading, error, data: profileData } = useQuery(
    ["user", userId],
    async () => {
      const res = await makeRequest.get(`/users/find/${userId}`);
      return res.data;
    }
  );

console.log("userId:", userId);
console.log("currentUser.id:", currentUser.id);
console.log("Match:", userId === currentUser.id);

  const handleProfileUpdate = (updatedFields) => {
    updateProfile(updatedFields);
    queryClient.invalidateQueries(["user", userId]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="profile">
      <div className="images">
        <img
          src={profileData.coverPic || "/default-cover.png"}
          alt="Cover"
          className="cover"
        />
        <img
          src={profileData.profilePic || "/default-avatar.png"}
          alt="Profile"
          className="profilePic"
        />
      </div>

      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
            <span>{profileData.name}</span>
            {userId === currentUser?.id && (
              <button className="updateBtn" onClick={() => setOpenUpdate(true)}>
                Update your profile
              </button>
            )}
          </div>
        </div>

        {userId === currentUser?.id && <Share />}
        <Posts userId={userId} />
      </div>

      {openUpdate && (
        <Update
          user={currentUser}
          setOpenUpdate={setOpenUpdate}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default Profile;
