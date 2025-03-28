
// import "./profile.scss";
// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import PlaceIcon from "@mui/icons-material/Place";
// import LanguageIcon from "@mui/icons-material/Language";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Posts from "../../components/posts/Posts";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { useLocation } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/authContext";
// import Update from "../../components/update/Update";
// import Share from "../../components/share/Share";

// const Profile = () => {
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const { currentUser, setCurrentUser } = useContext(AuthContext); // ✅ Update Context State
//   const queryClient = useQueryClient();
//   const userId = Number(useLocation().pathname.split("/")[2]);
//   const [profileData, setProfileData] = useState(null); // ✅ State to hold user data

//   // ✅ Fetch User Data with Error Handling
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
//       setProfileData(data); // ✅ Set initial data
//     }
//   }, [data]);

//   // ✅ Upload Handler for Profile & Cover Image
//   const handleFileUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append(type === "profile" ? "profilePic" : "coverPic", file);

//       // ✅ Upload to Backend
//       const res = await makeRequest.put(
//         `/users/${currentUser.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(`✅ ${type === "profile" ? "Profile" : "Cover"} Pic Updated!`);
      
//       // ✅ Update Profile Data with New URLs
//       const updatedData = {
//         ...profileData,
//         profilePic: type === "profile" ? res.data.profilePic : profileData.profilePic,
//         coverPic: type === "cover" ? res.data.coverPic : profileData.coverPic,
//       };

//       setProfileData(updatedData); // ✅ Update Profile Data
//       setCurrentUser({
//         ...currentUser,
//         profilePic: res.data.profilePic || currentUser.profilePic,
//         coverPic: res.data.coverPic || currentUser.coverPic,
//       });

//       queryClient.invalidateQueries(["user", userId]); // ✅ Invalidate Cache
//     } catch (err) {
//       console.error("❌ Upload Error:", err.message);
//     }
//   };

//   if (isLoading) return <div className="loading">Loading profile...</div>;
//   if (error)
//     return <div className="error">Error loading profile: {error.message}</div>;

//   return (
//     <div className="profile">
//       <div className="images">
//         {/* ✅ Cover Image */}
//         <img
//           src={profileData?.coverPic || "/default-cover.png"}
//           alt="Cover"
//           className="cover"
//         />
//         {userId === currentUser.id && (
//           <label htmlFor="coverUpload" className="upload-button">
//             Change Cover
//             <input
//               type="file"
//               id="coverUpload"
//               style={{ display: "none" }}
//               onChange={(e) => handleFileUpload(e, "cover")}
//               accept="image/*"
//             />
//           </label>
//         )}

//         {/* ✅ Profile Image */}
//         <img
//           src={profileData?.profilePic || "/default-avatar.png"}
//           alt="Profile"
//           className="profilePic"
//         />
//         {userId === currentUser.id && (
//           <label htmlFor="profileUpload" className="upload-button">
//             Change Profile
//             <input
//               type="file"
//               id="profileUpload"
//               style={{ display: "none" }}
//               onChange={(e) => handleFileUpload(e, "profile")}
//               accept="image/*"
//             />
//           </label>
//         )}
//       </div>

//       <div className="profileContainer">
//         <div className="uInfo">
//           <div className="left">
//             <a href={profileData?.facebook || "#"}>
//               <FacebookTwoToneIcon fontSize="large" />
//             </a>
//             <a href={profileData?.instagram || "#"}>
//               <InstagramIcon fontSize="large" />
//             </a>
//             {/* <a href={profileData?.twitter || "#"}>
//               <TwitterIcon fontSize="large" />
//             </a> */}
//             <a href={profileData?.linkedin || "#"}>
//               <LinkedInIcon fontSize="large" />
//             </a>
//             {/* <a href={profileData?.pinterest || "#"}>
//               <PinterestIcon fontSize="large" />
//             </a> */}
//           </div>

//           <div className="center">
//             <span>{profileData?.name || "User"}</span>
//             {/* <div className="info">
//               <div className="item">
//                 <PlaceIcon />
//                 <span>{profileData?.city || "Not Available"}</span>
//               </div>
//               <div className="item">
//                 <LanguageIcon />
//                 <span>{profileData?.website || "No Website"}</span>
//               </div>
//             </div> */}

//             {userId === currentUser.id && (
//               <button onClick={() => setOpenUpdate(true)}>Update</button>
//             )}
//           </div>

//           <div className="right">
//             <EmailOutlinedIcon />
//             <MoreVertIcon />
//           </div>
//         </div>

//         {/* ✅ Show Share only for Own Profile */}
//         {userId === currentUser.id && <Share />}

//         {/* ✅ Render Posts */}
//         <Posts userId={userId} />
//       </div>

//       {/* ✅ Open Update Modal */}
//       {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={profileData} />}
//     </div>
//   );
// };

// export default Profile;





import "./profile.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient(); // ✅ Corrected here
  const userId = Number(useLocation().pathname.split("/")[2]);

  // ✅ Fetch User Data
  const { data: profileData, isLoading } = useQuery(["user", userId], async () => {
    const res = await makeRequest.get(`/users/find/${userId}`);
    return res.data;
  });

  if (isLoading) return <div className="loading">Loading profile...</div>;

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
        <h2>{profileData?.name}</h2>
        <p>@{profileData?.username}</p>
        {userId === currentUser.id && (
          <button onClick={() => setOpenUpdate(true)}>Update Profile</button>
        )}
      </div>

      {openUpdate && (
        <Update
          setOpenUpdate={setOpenUpdate}
          user={profileData}
          refreshProfile={(updatedData) => {
            queryClient.setQueryData(["user", userId], updatedData); // ✅ Correctly updates cache
          }}
        />
      )}
    </div>
  );
};

export default Profile;
