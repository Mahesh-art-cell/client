
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
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/authContext";
// import Update from "../../components/update/Update";

// const Profile = () => {
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const userId = Number(useLocation().pathname.split("/")[2]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(Date.now()); // Add refresh key for forcing re-renders

//   // Fetch user data with better error handling
//   const { isLoading, error: fetchError, data } = useQuery(
//     ["user", userId, refreshKey], // Add refreshKey to the query key
//     async () => {
//       try {
//         const res = await makeRequest.get(`/users/find/${userId}`);
//         console.log("🔍 Fetched user data:", res.data);
//         return res.data;
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         throw new Error(err.response?.data || "Failed to fetch user data");
//       }
//     },
//     { 
//       enabled: !isNaN(userId),
//       refetchOnWindowFocus: false,
//       staleTime: 0, // Always fetch fresh data
//       cacheTime: 0 // Don't cache data
//     }
//   );

//   // Listen for update completion
//   useEffect(() => {
//     // This function will be called when we need to force a refresh
//     const handleUpdateCompletion = () => {
//       console.log("🔄 Forcing profile refresh");
//       setRefreshKey(Date.now());
//       queryClient.invalidateQueries(["user", userId]);
//     };

//     // Clean up function to avoid memory leaks
//     return () => {
//       // Any cleanup code if needed
//     };
//   }, [queryClient, userId]);

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

//       const res = await makeRequest.post(`/users/upload/${currentUser.id}?type=${type}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
//       const uploadedFilename = res.data.filename;
//       console.log(`✅ ${type} uploaded successfully:`, uploadedFilename);
      
//       // Step 2: Update user profile with the new image
//       const updateData = {};
//       if (type === "profile") {
//         updateData.profilePic = uploadedFilename;
//       } else if (type === "cover") {
//         updateData.coverPic = uploadedFilename;
//       }
      
//       const updateRes = await makeRequest.put(`/users/${currentUser.id}`, updateData);
//       console.log("✅ Profile updated via direct upload:", updateRes.data);
      
//       // Step 3: Force refresh
//       setRefreshKey(Date.now());
//       queryClient.invalidateQueries(["user", userId]);
//       queryClient.refetchQueries(["user", userId]);
      
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
//     return `/upload/${imagePath}?t=${refreshKey}`; // Using refreshKey for cache busting
//   };

//   // Update close handler to force refresh
//   const handleUpdateClose = (updated) => {
//     setOpenUpdate(false);
//     if (updated) {
//       console.log("🔄 Update completed, refreshing data");
//       setRefreshKey(Date.now());
//       queryClient.invalidateQueries(["user", userId]);
//       queryClient.refetchQueries(["user", userId]);
//     }
//   };

//   if (isLoading) return <div className="loading">Loading profile...</div>;
//   if (fetchError) return <div className="error">Error loading profile: {fetchError.message}</div>;

//   return (
//     <div className="profile">
//       <div className="images">
//         {/* Cover Image Container */}
//         <div className="cover-container">
//           <img
//             src={getImageUrl(data?.coverPic, "/default-cover.png")}
//             alt="Cover"
//             className="cover"
//             key={`cover-${refreshKey}`} // Force re-render on refresh
//           />
//           {userId === currentUser.id && (
//             <div className="upload-button-container">
//               <label htmlFor="coverUpload" className={`upload-button ${isUploading ? 'disabled' : ''}`}>
//                 Change Cover
//                 <input 
//                   type="file" 
//                   id="coverUpload" 
//                   style={{ display: "none" }} 
//                   onChange={(e) => handleFileUpload(e, "cover")} 
//                   accept="image/jpeg,image/png,image/gif"
//                   disabled={isUploading}
//                 />
//               </label>
//             </div>
//           )}
//           {isUploading && <div className="upload-indicator">Uploading...</div>}
//         </div>

//         {/* Profile Picture Container */}
//         <div className="profile-pic-container">
//           <img
//             src={getImageUrl(data?.profilePic, "/default-avatar.png")}
//             alt="Profile"
//             className="profilePic"
//             key={`profile-${refreshKey}`} // Force re-render on refresh
//           />
//           {userId === currentUser.id && (
//             <div className="profile-upload-button">
//               <label htmlFor="profileUpload" className={`upload-profile-button ${isUploading ? 'disabled' : ''}`}>
//                 Change
//                 <input 
//                   type="file" 
//                   id="profileUpload" 
//                   style={{ display: "none" }} 
//                   onChange={(e) => handleFileUpload(e, "profile")} 
//                   accept="image/jpeg,image/png,image/gif"
//                   disabled={isUploading}
//                 />
//               </label>
//             </div>
//           )}
//         </div>
//       </div>

//       {uploadError && (
//         <div className="error-message">{uploadError}</div>
//       )}

//       <div className="profileContainer">
//         <div className="uInfo">
//           <div className="left">
//             {data?.facebook && <a href={data.facebook}><FacebookTwoToneIcon fontSize="large" /></a>}
//             {data?.instagram && <a href={data.instagram}><InstagramIcon fontSize="large" /></a>}
//             {data?.twitter && <a href={data.twitter}><TwitterIcon fontSize="large" /></a>}
//             {data?.linkedin && <a href={data.linkedin}><LinkedInIcon fontSize="large" /></a>}
//             {data?.pinterest && <a href={data.pinterest}><PinterestIcon fontSize="large" /></a>}
//             {!data?.facebook && !data?.instagram && !data?.twitter && !data?.linkedin && !data?.pinterest && (
//               <>
//                 <a href="#"><FacebookTwoToneIcon fontSize="large" /></a>
//                 <a href="#"><InstagramIcon fontSize="large" /></a>
//                 <a href="#"><TwitterIcon fontSize="large" /></a>
//                 <a href="#"><LinkedInIcon fontSize="large" /></a>
//                 <a href="#"><PinterestIcon fontSize="large" /></a>
//               </>
//             )}
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
//               <button 
//                 onClick={() => setOpenUpdate(true)} 
//                 disabled={isUploading}
//                 className={isUploading ? 'disabled' : ''}
//               >
//                 Update
//               </button>
//             )}
//           </div>

//           <div className="right">
//             <EmailOutlinedIcon />
//             <MoreVertIcon />
//           </div>
//         </div>

//         <Posts userId={userId} />
//       </div>

//       {openUpdate && <Update setOpenUpdate={handleUpdateClose} user={data} refreshProfile={() => {
//         setRefreshKey(Date.now());
//         queryClient.invalidateQueries(["user", userId]);
//         queryClient.refetchQueries(["user", userId]);
//       }} />}
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

      const updateData = type === "profile" ? { profilePic: res.data.filename } : { coverPic: res.data.filename };
      await makeRequest.put(`/users/${currentUser.id}`, updateData);

      setRefreshKey(Date.now()); // Force profile refresh
      queryClient.invalidateQueries(["user", userId]);
    } catch (err) {
      console.error("Upload error:", err.message);
    }
  };

  if (isLoading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">Error loading profile: {error.message}</div>;

  return (
    <div className="profile">
      <div className="images">
        {/* Cover Image */}
        <img src={`/upload/${data?.coverPic || "default-cover.png"}`} alt="Cover" className="cover" />
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
        <img src={`/upload/${data?.profilePic || "default-avatar.png"}`} alt="Profile" className="profilePic" />
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
            <a href={data?.facebook}><FacebookTwoToneIcon fontSize="large" /></a>
            <a href={data?.instagram}><InstagramIcon fontSize="large" /></a>
            <a href={data?.twitter}><TwitterIcon fontSize="large" /></a>
            <a href={data?.linkedin}><LinkedInIcon fontSize="large" /></a>
            <a href={data?.pinterest}><PinterestIcon fontSize="large" /></a>
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

        <Posts userId={userId} />
      </div>

      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
