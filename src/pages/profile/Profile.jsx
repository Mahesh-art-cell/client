
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
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState(null);

//   // Fetch user data
//   const { isLoading, data } = useQuery(
//     ["user", userId],
//     () => makeRequest.get(`/users/find/${userId}`).then((res) => res.data),
//     { enabled: !isNaN(userId) }
//   );

//   // Improved Upload Handler with proper error tracking and caching
//   const handleFileUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     // File size validation
//     if (file.size > 10 * 1024 * 1024) {
//       setUploadError("File too large! Max size is 10MB.");
//       return;
//     }
    
//     setIsUploading(true);
//     setUploadError(null);

//     try {
//       // Step 1: Upload the file
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await makeRequest.post(`/users/upload/${currentUser.id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
//       const uploadedFilename = res.data.filename;
      
//       // Step 2: Update user profile with the new image
//       const updateData = {};
//       updateData[type] = uploadedFilename;
      
//       await makeRequest.put(`/users/${currentUser.id}`, updateData);
      
//       // Step 3: Invalidate the cache to refresh the data
//       queryClient.invalidateQueries(["user", userId]);
      
//       // Add a short delay before setting isUploading to false
//       setTimeout(() => {
//         setIsUploading(false);
//       }, 1000);
//     } catch (err) {
//       console.error("Upload Error:", err.response?.data?.error || err.message);
//       setUploadError(err.response?.data?.error || "Failed to upload image");
//       setIsUploading(false);
//     }
//   };

//   // Helper function to get image URL with cache-busting
//   const getImageUrl = (imagePath, defaultPath) => {
//     if (!imagePath) return defaultPath;
//     // If it's a full URL, use it directly
//     if (imagePath.startsWith('http')) return imagePath;
//     // Otherwise, assume it's a filename in the upload folder
//     return `/upload/${imagePath}?t=${Date.now()}`;
//   };

//   return (
//     <div className="profile">
//       {isLoading ? (
//         "Loading..."
//       ) : (
//         <>
//           <div className="images">
//             {/* Cover Image Container */}
//             <div className="cover-container">
//               <img
//                 src={getImageUrl(data?.coverPic, "/default-cover.png")}
//                 alt="Cover"
//                 className="cover"
//               />
//               {userId === currentUser.id && (
//                 <div className="upload-button-container">
//                   <label htmlFor="coverUpload" className="upload-button">
//                     Change Cover
//                     <input 
//                       type="file" 
//                       id="coverUpload" 
//                       style={{ display: "none" }} 
//                       onChange={(e) => handleFileUpload(e, "coverPic")} 
//                       accept="image/jpeg,image/png,image/gif"
//                       disabled={isUploading}
//                     />
//                   </label>
//                 </div>
//               )}
//               {isUploading && <div className="upload-indicator">Uploading...</div>}
//             </div>

//             {/* Profile Picture Container */}
//             <div className="profile-pic-container">
//               <img
//                 src={getImageUrl(data?.profilePic, "/default-avatar.png")}
//                 alt="Profile"
//                 className="profilePic"
//               />
//               {userId === currentUser.id && (
//                 <div className="profile-upload-button">
//                   <label htmlFor="profileUpload" className="upload-profile-button">
//                     Change
//                     <input 
//                       type="file" 
//                       id="profileUpload" 
//                       style={{ display: "none" }} 
//                       onChange={(e) => handleFileUpload(e, "profilePic")} 
//                       accept="image/jpeg,image/png,image/gif"
//                       disabled={isUploading}
//                     />
//                   </label>
//                 </div>
//               )}
//             </div>
//           </div>

//           {uploadError && (
//             <div className="error-message">{uploadError}</div>
//           )}

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

//                 {userId === currentUser.id && (
//                   <button 
//                     onClick={() => setOpenUpdate(true)} 
//                     disabled={isUploading}
//                   >
//                     Update
//                   </button>
//                 )}
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Fetch user data with better error handling
  const { isLoading, error: fetchError, data } = useQuery(
    ["user", userId],
    async () => {
      try {
        const res = await makeRequest.get(`/users/find/${userId}`);
        return res.data;
      } catch (err) {
        console.error("Error fetching user data:", err);
        throw new Error(err.response?.data || "Failed to fetch user data");
      }
    },
    { 
      enabled: !isNaN(userId),
      refetchOnWindowFocus: false,
      staleTime: 30000 // 30 seconds
    }
  );

  // Improved Upload Handler with proper error tracking and caching
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // File size validation
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File too large! Max size is 10MB.");
      return;
    }
    
    setIsUploading(true);
    setUploadError(null);

    try {
      // Step 1: Upload the file
      const formData = new FormData();
      formData.append("file", file);

      const res = await makeRequest.post(`/users/upload/${currentUser.id}?type=${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      const uploadedFilename = res.data.filename;
      
      // Step 2: Update user profile with the new image
      const updateData = {};
      if (type === "profile") {
        updateData.profilePic = uploadedFilename;
      } else if (type === "cover") {
        updateData.coverPic = uploadedFilename;
      }
      
      await makeRequest.put(`/users/${currentUser.id}`, updateData);
      
      // Step 3: Invalidate the cache to refresh the data
      queryClient.invalidateQueries(["user", userId]);
      
      // Add a short delay before setting isUploading to false
      setTimeout(() => {
        setIsUploading(false);
      }, 1000);
    } catch (err) {
      console.error("Upload Error:", err.response?.data?.error || err.message);
      setUploadError(err.response?.data?.error || "Failed to upload image");
      setIsUploading(false);
    }
  };

  // Helper function to get image URL with cache-busting
  const getImageUrl = (imagePath, defaultPath) => {
    if (!imagePath) return defaultPath;
    // If it's a full URL, use it directly
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, assume it's a filename in the upload folder
    return `/upload/${imagePath}?t=${Date.now()}`;
  };

  if (isLoading) return <div className="loading">Loading profile...</div>;
  if (fetchError) return <div className="error">Error loading profile: {fetchError.message}</div>;

  return (
    <div className="profile">
      <div className="images">
        {/* Cover Image Container */}
        <div className="cover-container">
          <img
            src={getImageUrl(data?.coverPic, "/default-cover.png")}
            alt="Cover"
            className="cover"
          />
          {userId === currentUser.id && (
            <div className="upload-button-container">
              <label htmlFor="coverUpload" className={`upload-button ${isUploading ? 'disabled' : ''}`}>
                Change Cover
                <input 
                  type="file" 
                  id="coverUpload" 
                  style={{ display: "none" }} 
                  onChange={(e) => handleFileUpload(e, "cover")} 
                  accept="image/jpeg,image/png,image/gif"
                  disabled={isUploading}
                />
              </label>
            </div>
          )}
          {isUploading && <div className="upload-indicator">Uploading...</div>}
        </div>

        {/* Profile Picture Container */}
        <div className="profile-pic-container">
          <img
            src={getImageUrl(data?.profilePic, "/default-avatar.png")}
            alt="Profile"
            className="profilePic"
          />
          {userId === currentUser.id && (
            <div className="profile-upload-button">
              <label htmlFor="profileUpload" className={`upload-profile-button ${isUploading ? 'disabled' : ''}`}>
                Change
                <input 
                  type="file" 
                  id="profileUpload" 
                  style={{ display: "none" }} 
                  onChange={(e) => handleFileUpload(e, "profile")} 
                  accept="image/jpeg,image/png,image/gif"
                  disabled={isUploading}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="error-message">{uploadError}</div>
      )}

      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            {data?.facebook && <a href={data.facebook}><FacebookTwoToneIcon fontSize="large" /></a>}
            {data?.instagram && <a href={data.instagram}><InstagramIcon fontSize="large" /></a>}
            {data?.twitter && <a href={data.twitter}><TwitterIcon fontSize="large" /></a>}
            {data?.linkedin && <a href={data.linkedin}><LinkedInIcon fontSize="large" /></a>}
            {data?.pinterest && <a href={data.pinterest}><PinterestIcon fontSize="large" /></a>}
            {!data?.facebook && !data?.instagram && !data?.twitter && !data?.linkedin && !data?.pinterest && (
              <>
                <a href="#"><FacebookTwoToneIcon fontSize="large" /></a>
                <a href="#"><InstagramIcon fontSize="large" /></a>
                <a href="#"><TwitterIcon fontSize="large" /></a>
                <a href="#"><LinkedInIcon fontSize="large" /></a>
                <a href="#"><PinterestIcon fontSize="large" /></a>
              </>
            )}
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
              <button 
                onClick={() => setOpenUpdate(true)} 
                disabled={isUploading}
                className={isUploading ? 'disabled' : ''}
              >
                Update
              </button>
            )}
          </div>

          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>

        <Posts userId={userId} />
      </div>

      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;