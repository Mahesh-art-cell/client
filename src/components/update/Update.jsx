
// import { useState } from "react";
// import { makeRequest } from "../../axios";
// import "./update.scss";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// const Update = ({ setOpenUpdate, user }) => {
//   const queryClient = useQueryClient();
//   const [cover, setCover] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [texts, setTexts] = useState({
//     email: user?.email || "",
//     name: user?.name || "",
//     username: user?.username || "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState({
//     cover: 0,
//     profile: 0
//   });

//   // Improved upload function with progress tracking
//   const upload = async (file, type) => {
//     if (!file) return null;
//     setError(null);
    
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
      
//       console.log(`📤 Uploading ${type} file: ${file.name}, size: ${file.size} bytes`);
      
//       const res = await makeRequest.post(`/users/upload/${user.id}`, formData, {
//         headers: { 
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(prev => ({
//             ...prev,
//             [type]: percentCompleted
//           }));
//         }
//       });
      
//       console.log(`📸 ${type} Upload Successful:`, res.data);
//       return res.data.filename; // Return just the filename
//     } catch (err) {
//       console.error(`❌ ${type} Upload Error:`, err);
//       setError(err.response?.data?.error || `Failed to upload ${type} image. Please try again.`);
//       return null;
//     }
//   };

//   // Improved mutation for updating user profile
//   const mutation = useMutation(
//     async (updatedUser) => {
//       console.log("🔄 Sending update with data:", updatedUser);
//       return makeRequest.put(`/users/${user.id}`, updatedUser);
//     },
//     {
//       onSuccess: () => {
//         console.log("✅ Profile updated successfully!");
//         // Force refetch to ensure data is fresh
//         queryClient.invalidateQueries(["user", user.id]);
//         // Short delay to ensure data is refreshed
//         setTimeout(() => {
//           setOpenUpdate(false);
//           setIsSubmitting(false);
//         }, 1000);
//       },
//       onError: (error) => {
//         console.error("❌ Update Failed:", error);
//         setError(error.response?.data?.error || "Failed to update profile. Please try again.");
//         setIsSubmitting(false);
//       },
//     }
//   );

//   // Improved form submission with better error handling and sequential uploads
//   const handleClick = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
    
//     try {
//       // Create a new object that will hold the updated user data
//       const updatedUser = {
//         name: texts.name,
//         email: texts.email,
//         username: texts.username,
//       };
      
//       console.log("🔄 Starting update process...");
      
//       // Handle cover image upload if a new file is selected
//       if (cover) {
//         console.log("📤 Uploading new cover image...");
//         const coverFilename = await upload(cover, "cover");
//         if (coverFilename) {
//           console.log(`✅ Cover uploaded: ${coverFilename}`);
//           updatedUser.coverPic = coverFilename;
//         } else if (error) {
//           // If upload failed and error is set, return early
//           setIsSubmitting(false);
//           return;
//         }
//       }
      
//       // Handle profile image upload if a new file is selected
//       if (profile) {
//         console.log("📤 Uploading new profile image...");
//         const profileFilename = await upload(profile, "profile");
//         if (profileFilename) {
//           console.log(`✅ Profile uploaded: ${profileFilename}`);
//           updatedUser.profilePic = profileFilename;
//         } else if (error) {
//           // If upload failed and error is set, return early
//           setIsSubmitting(false);
//           return;
//         }
//       }
      
//       console.log("🔄 Final update payload:", updatedUser);
      
//       // Only proceed with update if we have data to update
//       if (Object.keys(updatedUser).length > 0) {
//         // Send the update request with the new data
//         mutation.mutate(updatedUser);
//       } else {
//         console.log("ℹ️ No changes to update");
//         setOpenUpdate(false);
//         setIsSubmitting(false);
//       }
//     } catch (err) {
//       console.error("❌ Update process failed:", err);
//       setError("Update process failed. Please try again.");
//       setIsSubmitting(false);
//     }
//   };

//   // Helper function to get image URL with cache busting
//   const getImageUrl = (imagePath, defaultPath) => {
//     if (!imagePath) return defaultPath;
//     // If it's a full URL, use it directly
//     if (imagePath.startsWith('http')) return imagePath;
//     // Otherwise, assume it's a filename in the upload folder
//     return `/upload/${imagePath}?t=${Date.now()}`;
//   };

//   return (
//     <div className="update">
//       <div className="wrapper">
//         <h1>Update Your Profile</h1>
//         {error && <div className="error-message">{error}</div>}
//         <form>
//           {/* Cover Upload */}
//           <div className="image-upload-container">
//             <label>Cover Picture</label>
//             <label htmlFor="cover" className="image-upload-label">
//               <div className="imgContainer">
//                 <img
//                   src={
//                     cover 
//                       ? URL.createObjectURL(cover) 
//                       : getImageUrl(user.coverPic, "/default-cover.png")
//                   }
//                   alt="Cover"
//                   className="preview-image"
//                 />
//                 <CloudUploadIcon className="icon" />
//                 {uploadProgress.cover > 0 && uploadProgress.cover < 100 && (
//                   <div className="upload-progress">{uploadProgress.cover}%</div>
//                 )}
//               </div>
//             </label>
//             <input
//               type="file"
//               id="cover"
//               style={{ display: "none" }}
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file && file.size > 10 * 1024 * 1024) {
//                   setError("File too large! Max size is 10MB.");
//                   return;
//                 }
//                 setCover(file);
//                 setError(null);
//                 setUploadProgress(prev => ({...prev, cover: 0}));
//               }}
//               accept="image/jpeg,image/png,image/gif"
//             />
//           </div>

//           {/* Profile Upload */}
//           <div className="image-upload-container">
//             <label>Profile Picture</label>
//             <label htmlFor="profile" className="image-upload-label">
//               <div className="imgContainer profile-container">
//                 <img
//                   src={
//                     profile 
//                       ? URL.createObjectURL(profile) 
//                       : getImageUrl(user.profilePic, "/default-avatar.png")
//                   }
//                   alt="Profile"
//                   className="preview-image profile-preview"
//                 />
//                 <CloudUploadIcon className="icon" />
//                 {uploadProgress.profile > 0 && uploadProgress.profile < 100 && (
//                   <div className="upload-progress">{uploadProgress.profile}%</div>
//                 )}
//               </div>
//             </label>
//             <input
//               type="file"
//               id="profile"
//               style={{ display: "none" }}
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file && file.size > 10 * 1024 * 1024) {
//                   setError("File too large! Max size is 10MB.");
//                   return;
//                 }
//                 setProfile(file);
//                 setError(null);
//                 setUploadProgress(prev => ({...prev, profile: 0}));
//               }}
//               accept="image/jpeg,image/png,image/gif"
//             />
//           </div>

//           {/* Name */}
//           <label>Name</label>
//           <input
//             type="text"
//             value={texts.name}
//             name="name"
//             onChange={(e) => setTexts((prev) => ({ ...prev, name: e.target.value }))}
//           />

//           {/* Email */}
//           <label>Email</label>
//           <input
//             type="text"
//             value={texts.email}
//             name="email"
//             onChange={(e) => setTexts((prev) => ({ ...prev, email: e.target.value }))}
//           />

//           {/* Username */}
//           <label>Username</label>
//           <input
//             type="text"
//             value={texts.username}
//             name="username"
//             onChange={(e) => setTexts((prev) => ({ ...prev, username: e.target.value }))}
//           />

//           {/* Submit Button */}
//           <button 
//             type="button" 
//             onClick={handleClick} 
//             disabled={isSubmitting}
//             className="update-button"
//           >
//             {isSubmitting ? "Updating..." : "Update"}
//           </button>
//         </form>

//         <button className="close" onClick={() => setOpenUpdate(false)}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Update;




import { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user, refreshProfile }) => {
  const queryClient = useQueryClient();
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user?.email || "",
    name: user?.name || "",
    username: user?.username || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Reset Form if user data changes
  useEffect(() => {
    if (user) {
      setTexts({
        email: user.email || "",
        name: user.name || "",
        username: user.username || "",
      });
    }
  }, [user]);

  // ✅ Upload Function to Cloudinary and Update API
  const upload = async (file, type) => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append(type === "profile" ? "profilePic" : "coverPic", file);

      console.log(`📤 Uploading ${type}...`);
      const res = await makeRequest.put(`/users/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(`✅ ${type} Uploaded:`, res.data);
      return res.data.url;
    } catch (err) {
      console.error(`❌ ${type} Upload Failed:`, err);
      return null;
    }
  };

  // ✅ Mutation to Update User
  const mutation = useMutation(
    async (updatedUser) => {
      console.log("🔄 Updating user:", updatedUser);
      return makeRequest.put(`/users/${user.id}`, updatedUser);
    },
    {
      onSuccess: (data) => {
        console.log("✅ User updated successfully:", data.data);
        
        // ✅ Refresh parent profile after update
        if (typeof refreshProfile === "function") {
          refreshProfile(data.data);
        }

        // ✅ Update user state with new image URLs
        queryClient.setQueryData(["user", user.id], (prevUser) => ({
          ...prevUser,
          profilePic: data.data.profilePic,
          coverPic: data.data.coverPic,
        }));

        setOpenUpdate(false);
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error("❌ Update Failed:", error);
        setError(error.response?.data?.error || "Failed to update profile.");
        setIsSubmitting(false);
      },
    }
  );

  // ✅ Handle Form Submission
  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedUser = { ...texts };

    // ✅ Upload Cover Pic if available
    if (cover) {
      const coverUrl = await upload(cover, "cover");
      if (coverUrl) {
        updatedUser.coverPic = coverUrl;
        console.log(`🌐 Cover Pic URL: ${coverUrl}`);
      }
    }

    // ✅ Upload Profile Pic if available
    if (profile) {
      const profileUrl = await upload(profile, "profile");
      if (profileUrl) {
        updatedUser.profilePic = profileUrl;
        console.log(`🌐 Profile Pic URL: ${profileUrl}`);
      }
    }

    mutation.mutate(updatedUser);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        {error && <div className="error-message">{error}</div>}

        <form>
          {/* ✅ Cover Upload */}
          <label>Cover Picture</label>
          <div className="imgContainer">
            <img
              src={
                cover
                  ? URL.createObjectURL(cover)
                  : user.coverPic || "/default-cover.png"
              }
              alt="Cover"
            />
            <label htmlFor="cover">
              <CloudUploadIcon className="icon" />
              <input
                type="file"
                id="cover"
                style={{ display: "none" }}
                onChange={(e) => setCover(e.target.files[0])}
                accept="image/*"
              />
            </label>
          </div>

          {/* ✅ Profile Upload */}
          <label>Profile Picture</label>
          <div className="imgContainer">
            <img
              src={
                profile
                  ? URL.createObjectURL(profile)
                  : user.profilePic || "/default-avatar.png"
              }
              alt="Profile"
            />
            <label htmlFor="profile">
              <CloudUploadIcon className="icon" />
              <input
                type="file"
                id="profile"
                style={{ display: "none" }}
                onChange={(e) => setProfile(e.target.files[0])}
                accept="image/*"
              />
            </label>
          </div>

          {/* ✅ Name, Email, and Username */}
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            onChange={(e) =>
              setTexts((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <label>Email</label>
          <input
            type="email"
            value={texts.email}
            onChange={(e) =>
              setTexts((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <label>Username</label>
          <input
            type="text"
            value={texts.username}
            onChange={(e) =>
              setTexts((prev) => ({ ...prev, username: e.target.value }))
            }
          />

          {/* ✅ Submit Button */}
          <button
            type="button"
            onClick={handleClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </form>

        <button className="close" onClick={() => setOpenUpdate(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
