
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




import "./update.scss";
import { useState } from "react";
import { makeRequest } from "../../axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [inputs, setInputs] = useState({
    name: user.name,
    bio: user.bio || "",
  });

  // ✅ Handle File Upload
  const upload = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    const res = await makeRequest.post("/upload", formData);
    return res.data.secure_url;
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileUrl = profilePic ? await upload(profilePic) : user.profilePic;
    const coverUrl = coverPic ? await upload(coverPic) : user.coverPic;

    const updatedUser = {
      ...inputs,
      profilePic: profileUrl,
      coverPic: coverUrl,
    };

    try {
      await makeRequest.put("/users", updatedUser);
      setOpenUpdate(false);
      window.location.reload();
    } catch (err) {
      console.error("❌ Update Failed:", err);
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="files">
            <label htmlFor="profilePic">
              <CloudUploadIcon /> Upload Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            placeholder="Write something about yourself"
            value={inputs.bio}
            onChange={handleChange}
          />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
