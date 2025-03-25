


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

// const Profile = () => {
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const userId = Number(useLocation().pathname.split("/")[2]);
//   const [refreshKey, setRefreshKey] = useState(Date.now());

//   // ✅ Fetch user data with error handling
//   const { isLoading, error, data } = useQuery(
//     ["user", userId, refreshKey],
//     async () => {
//       const res = await makeRequest.get(`/users/find/${userId}`);
//       return res.data;
//     },
//     { enabled: !isNaN(userId), refetchOnWindowFocus: false }
//   );

//   // ✅ Upload Handler (Profile/Cover Image)
//   const handleFileUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await makeRequest.post(
//         `/users/upload/${currentUser.id}?type=${type}`,
//         formData
//       );

//       const updateData = type === "profile" ? { profilePic: res.data.filename } : { coverPic: res.data.filename };
//       await makeRequest.put(`/users/${currentUser.id}`, updateData);

//       setRefreshKey(Date.now()); // Force profile refresh
//       queryClient.invalidateQueries(["user", userId]);
//     } catch (err) {
//       console.error("Upload error:", err.message);
//     }
//   };

//   if (isLoading) return <div className="loading">Loading profile...</div>;
//   if (error) return <div className="error">Error loading profile: {error.message}</div>;

//   return (
//     <div className="profile">
//       <div className="images">
//         {/* Cover Image */}
//         <img src={`/upload/${data?.coverPic || "default-cover.png"}`} alt="Cover" className="cover" />
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

//         {/* Profile Image */}
//         <img src={`/upload/${data?.profilePic || "default-avatar.png"}`} alt="Profile" className="profilePic" />
//         {userId === currentUser.id && (
//           <label htmlFor="profileUpload" className="upload-button">
//             Change
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
//             <a href={data?.facebook}><FacebookTwoToneIcon fontSize="large" /></a>
//             <a href={data?.instagram}><InstagramIcon fontSize="large" /></a>
//             <a href={data?.twitter}><TwitterIcon fontSize="large" /></a>
//             <a href={data?.linkedin}><LinkedInIcon fontSize="large" /></a>
//             <a href={data?.pinterest}><PinterestIcon fontSize="large" /></a>
//           </div>

//           <div className="center">
//             <span>{data?.name}</span>
//             <div className="info">
//               <div className="item">
//                 <PlaceIcon />
//                 <span>{data?.city || "Not Available"}</span>
//               </div>
//               <div className="item">
//                 <LanguageIcon />
//                 <span>{data?.website || "No Website"}</span>
//               </div>
//             </div>

//             {userId === currentUser.id && (
//               <button onClick={() => setOpenUpdate(true)}>Update</button>
//             )}
//           </div>

//           <div className="right">
//             <EmailOutlinedIcon />
//             <MoreVertIcon />
//           </div>
//         </div>

//         <Posts userId={userId} />
//       </div>

//       {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
//     </div>
//   );
// };

// export default Profile;



import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import Share from "../../components/share/Share"; // ✅ Import Share

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const userId = Number(useLocation().pathname.split("/")[2]);
  const [refreshKey, setRefreshKey] = useState(Date.now());

  // ✅ Fetch user data with error handling
  const { isLoading, error, data } = useQuery(
    ["user", userId, refreshKey],
    async () => {
      const res = await makeRequest.get(`/users/find/${userId}`);
      return res.data;
    },
    { enabled: !isNaN(userId), refetchOnWindowFocus: false }
  );

  // ✅ Upload Handler (Profile/Cover Image)
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await makeRequest.post(
        `/users/upload/${currentUser.id}?type=${type}`,
        formData
      );

      const updateData =
        type === "profile"
          ? { profilePic: res.data.filename }
          : { coverPic: res.data.filename };
      await makeRequest.put(`/users/${currentUser.id}`, updateData);

      setRefreshKey(Date.now()); // Force profile refresh
      queryClient.invalidateQueries(["user", userId]);
    } catch (err) {
      console.error("Upload error:", err.message);
    }
  };

  if (isLoading) return <div className="loading">Loading profile...</div>;
  if (error)
    return <div className="error">Error loading profile: {error.message}</div>;

  return (
    <div className="profile">
      <div className="images">
        {/* Cover Image */}
        <img
          src={`/upload/${data?.coverPic || "default-cover.png"}`}
          alt="Cover"
          className="cover"
        />
        {userId === currentUser.id && (
          <label htmlFor="coverUpload" className="upload-button">
            Change Cover
            <input
              type="file"
              id="coverUpload"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e, "cover")}
              accept="image/*"
            />
          </label>
        )}

        {/* Profile Image */}
        <img
          src={`/upload/${data?.profilePic || "default-avatar.png"}`}
          alt="Profile"
          className="profilePic"
        />
        {userId === currentUser.id && (
          <label htmlFor="profileUpload" className="upload-button">
            Change
            <input
              type="file"
              id="profileUpload"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e, "profile")}
              accept="image/*"
            />
          </label>
        )}
      </div>

      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href={data?.facebook}>
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href={data?.instagram}>
              <InstagramIcon fontSize="large" />
            </a>
            <a href={data?.twitter}>
              <TwitterIcon fontSize="large" />
            </a>
            <a href={data?.linkedin}>
              <LinkedInIcon fontSize="large" />
            </a>
            <a href={data?.pinterest}>
              <PinterestIcon fontSize="large" />
            </a>
          </div>

          <div className="center">
            <span>{data?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data?.city || "Not Available"}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data?.website || "No Website"}</span>
              </div>
            </div>

            {userId === currentUser.id && (
              <button onClick={() => setOpenUpdate(true)}>Update</button>
            )}
          </div>

          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>

        {/* ✅ Show Share only if visiting own profile */}
        {userId === currentUser.id && <Share />}

        {/* ✅ Render Posts */}
        <Posts userId={userId} />
      </div>

      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
