

// import "./profile.scss";
// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import PlaceIcon from "@mui/icons-material/Place";
// import LanguageIcon from "@mui/icons-material/Language";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Posts from "../../components/posts/Posts";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { useLocation } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/authContext";
// import Update from "../../components/update/Update";

// const Profile = () => {
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const userId = Number(useLocation().pathname.split("/")[2]);

//   // Fetch user data
//   const { isLoading, data } = useQuery(
//     ["user", userId],
//     () => makeRequest.get(`/users/find/${userId}`).then((res) => res.data),
//     { enabled: !isNaN(userId) }
//   );

//   // ✅ Fixed Upload Handler
//   const handleFileUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       // ✅ Use consistent endpoint
//       const res = await makeRequest.post(`/users/upload/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
//       const uploadedFilename = res.data.filename;
      
//       // ✅ Update user data with new image
//       await makeRequest.put(`/users/${userId}`, { [type]: uploadedFilename });

//       queryClient.invalidateQueries(["user", userId]); // Refresh user data
//     } catch (err) {
//       console.error("Upload Error:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="profile">
//       {isLoading ? (
//         "Loading..."
//       ) : (
//         <>
//           <div className="images">
//             {/* Cover Image Upload */}
//             <label htmlFor="coverUpload">
//               <img
//                 src={data?.coverPic ? `/upload/${data.coverPic}` : "/default-cover.png"}
//                 alt="Cover"
//                 className="cover"
//               />
//             </label>
//             {userId === currentUser.id && (
//               <input 
//                 type="file" 
//                 id="coverUpload" 
//                 style={{ display: "none" }} 
//                 onChange={(e) => handleFileUpload(e, "coverPic")} 
//               />
//             )}

//             {/* Profile Picture Upload */}
//             <label htmlFor="profileUpload">
//               <img
//                 src={data?.profilePic ? `/upload/${data.profilePic}` : "/default-avatar.png"}
//                 alt="Profile"
//                 className="profilePic"
//               />
//             </label>
//             {userId === currentUser.id && (
//               <input 
//                 type="file" 
//                 id="profileUpload" 
//                 style={{ display: "none" }} 
//                 onChange={(e) => handleFileUpload(e, "profilePic")} 
//               />
//             )}
//           </div>

//           <div className="profileContainer">
//             <div className="uInfo">
//               <div className="left">
//                 <a href="http://facebook.com"><FacebookTwoToneIcon fontSize="large" /></a>
//                 <a href="http://instagram.com"><InstagramIcon fontSize="large" /></a>
//                 <a href="http://twitter.com"><TwitterIcon fontSize="large" /></a>
//                 <a href="http://linkedin.com"><LinkedInIcon fontSize="large" /></a>
//                 <a href="http://pinterest.com"><PinterestIcon fontSize="large" /></a>
//               </div>

//               <div className="center">
//                 <span>{data?.name}</span>
//                 <div className="info">
//                   <div className="item">
//                     <PlaceIcon />
//                     <span>{data?.city || "Not Available"}</span>
//                   </div>
//                   <div className="item">
//                     <LanguageIcon />
//                     <span>{data?.website || "No Website"}</span>
//                   </div>
//                 </div>

//                 {userId === currentUser.id && <button onClick={() => setOpenUpdate(true)}>Update</button>}
//               </div>

//               <div className="right">
//                 <EmailOutlinedIcon />
//                 <MoreVertIcon />
//               </div>
//             </div>

//             <Posts userId={userId} />
//           </div>
//         </>
//       )}

//       {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
//     </div>
//   );
// };

// export default Profile;



import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const userId = Number(useLocation().pathname.split("/")[2]);

  // ✅ Improved query with refetch interval and staleTime
  const { isLoading, data } = useQuery(
    ["user", userId],
    () => makeRequest.get(`/users/find/${userId}`).then((res) => res.data),
    { 
      enabled: !isNaN(userId),
      staleTime: 5000, // Consider data fresh for 5 seconds
      refetchOnWindowFocus: true, // Refetch when window regains focus
    }
  );

  // ✅ Improved file upload with proper error handling
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      console.log(`📤 Uploading ${type} file: ${file.name}`);
      
      const formData = new FormData();
      formData.append("file", file);

      // Step 1: Upload the file
      const uploadRes = await makeRequest.post(`/users/upload/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (!uploadRes.data || !uploadRes.data.filename) {
        throw new Error("File upload failed - no filename returned");
      }
      
      const filename = uploadRes.data.filename;
      console.log(`✅ ${type} uploaded: ${filename}`);
      
      // Step 2: Update the user record with the new filename
      const updateData = { [type]: filename };
      console.log(`🔄 Updating user with ${type}:`, updateData);
      
      const updateRes = await makeRequest.put(`/users/${userId}`, updateData);
      console.log("✅ User updated response:", updateRes.data);
      
      // Step 3: Refresh the user data in the UI
      queryClient.invalidateQueries(["user", userId]);
    } catch (err) {
      console.error(`❌ ${type} Upload Error:`, err.response?.data || err.message);
      alert(`Failed to upload ${type}. Please try again.`);
    }
  };

  // ✅ Helper function to get image URL
  const getImageUrl = (imagePath, defaultPath) => {
    if (!imagePath) return defaultPath;
    // If it's a full URL, use it directly
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, assume it's a filename in the upload folder
    return `/upload/${imagePath}`;
  };

  // ✅ Handle refetching user data
  const handleRefreshData = () => {
    queryClient.invalidateQueries(["user", userId]);
  };

  return (
    <div className="profile">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="images">
            {/* Cover Image Upload */}
            <label htmlFor="coverUpload">
              <img
                src={getImageUrl(data?.coverPic, "/default-cover.png")}
                alt="Cover"
                className="cover"
              />
            </label>
            {userId === currentUser.id && (
              <input 
                type="file" 
                id="coverUpload" 
                style={{ display: "none" }} 
                onChange={(e) => handleFileUpload(e, "coverPic")} 
              />
            )}

            {/* Profile Picture Upload */}
            <label htmlFor="profileUpload">
              <img
                src={getImageUrl(data?.profilePic, "/default-avatar.png")}
                alt="Profile"
                className="profilePic"
              />
            </label>
            {userId === currentUser.id && (
              <input 
                type="file" 
                id="profileUpload" 
                style={{ display: "none" }} 
                onChange={(e) => handleFileUpload(e, "profilePic")} 
              />
            )}
          </div>

          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com"><FacebookTwoToneIcon fontSize="large" /></a>
                <a href="http://instagram.com"><InstagramIcon fontSize="large" /></a>
                <a href="http://twitter.com"><TwitterIcon fontSize="large" /></a>
                <a href="http://linkedin.com"><LinkedInIcon fontSize="large" /></a>
                <a href="http://pinterest.com"><PinterestIcon fontSize="large" /></a>
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
                  <div className="buttons">
                    <button onClick={() => setOpenUpdate(true)}>Update Profile</button>
                    <button onClick={handleRefreshData}>Refresh</button>
                  </div>
                )}
              </div>

              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>

            <Posts userId={userId} />
          </div>
        </>
      )}

      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;