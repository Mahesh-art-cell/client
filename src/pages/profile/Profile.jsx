

// import "./profile.scss";
// import { useContext, useEffect, useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { useLocation } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import Update from "../../components/update/Update";
// import Share from "../../components/share/Share";
// import Posts from "../../components/posts/Posts";

// const Profile = () => {
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const { currentUser, login } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const userId = Number(useLocation().pathname.split("/")[2]);
//   const [profileData, setProfileData] = useState(null);

//   // ✅ Fetch User Data
//   const { isLoading, error, data } = useQuery(
//     ["user", userId],
//     async () => {
//       const res = await makeRequest.get(`/users/find/${userId}`);
//       return res.data;
//     },
//     { enabled: !isNaN(userId), refetchOnWindowFocus: false }
//   );

//   useEffect(() => {
//     if (data) {
//       setProfileData(data);
//     }
//   }, [data]);

//   // ✅ Profile Update Callback to Refresh Data
//   const handleProfileUpdate = (updatedUser) => {
//     setProfileData(updatedUser);
//     login(updatedUser); // ✅ Update Context
//     queryClient.invalidateQueries(["user", userId]);
//   };

//   if (isLoading) return <div className="loading">Loading profile...</div>;
//   if (error)
//     return <div className="error">Error loading profile: {error.message}</div>;

//   return (
//     <div className="profile">
//       <div className="images">
//         <img
//           src={profileData?.coverPic || "/default-cover.png"}
//           alt="Cover"
//           className="cover"
//         />
//         <img
//           src={profileData?.profilePic || "/default-avatar.png"}
//           alt="Profile"
//           className="profilePic"
//         />
//       </div>

//       <div className="profileContainer">
//         <div className="uInfo">
//           <div className="center">
//             <span>{profileData?.name || "User"}</span>
//             {userId === currentUser?.id && (
//               <button onClick={() => setOpenUpdate(true)}>Update</button>
//             )}
//           </div>
//         </div>

//         {userId === currentUser?.id && <Share />}
//         <Posts userId={userId} />
//       </div>

//       {openUpdate && (
//         <Update
//           setOpenUpdate={setOpenUpdate}
//           user={profileData}
//           onProfileUpdate={handleProfileUpdate}
//         />
//       )}
//     </div>
//   );
// };

// export default Profile;




import "./profile.scss";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import Share from "../../components/share/Share";
import Posts from "../../components/posts/Posts";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userId = Number(useLocation().pathname.split("/")[2]);
  const [profileData, setProfileData] = useState(null);

  // ✅ Fetch User Data
  const { isLoading, error, data } = useQuery(["user", userId], async () => {
    const res = await makeRequest.get(`/users/find/${userId}`);
    return res.data;
  });

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data]);

  if (isLoading) return <div className="loading">Loading profile...</div>;
  if (error)
    return <div className="error">Error loading profile: {error.message}</div>;

  return (
    <div className="profile">
      <div className="images">
        <img
          src={profileData?.coverPic || "/default-cover.png"}
          alt="Cover"
          className="cover"
        />
        <img
          src={profileData?.profilePic || "/default-avatar.png"}
          alt="Profile"
          className="profilePic"
        />
      </div>

      <div className="profileContainer">
        <div className="uInfo">
          <span>{profileData?.name || "User"}</span>
          {userId === currentUser?.id && (
            <button onClick={() => setOpenUpdate(true)}>Update</button>
          )}
        </div>

        {userId === currentUser?.id && <Share />}
        <Posts userId={userId} />
      </div>

      {openUpdate && (
        <Update
          setOpenUpdate={setOpenUpdate}
          user={profileData}
        />
      )}
    </div>
  );
};

export default Profile;
