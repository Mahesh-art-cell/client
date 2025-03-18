

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



import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Update = ({ setOpenUpdate, user }) => {
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

  // Improved upload function with better error handling
  const upload = async (file) => {
    if (!file) return null;
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      console.log(`📤 Uploading file: ${file.name}, size: ${file.size} bytes`);
      
      const res = await makeRequest.post(`/users/upload/${user.id}`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("📸 Upload Successful:", res.data);
      return res.data.filename; // Return just the filename
    } catch (err) {
      console.error("❌ Upload Error:", err);
      setError(err.response?.data?.error || "Failed to upload image. Please try again.");
      return null;
    }
  };

  // Improved mutation for updating user profile
  const mutation = useMutation(
    async (updatedUser) => {
      console.log("🔄 Sending update with data:", updatedUser);
      return makeRequest.put(`/users/${user.id}`, updatedUser);
    },
    {
      onSuccess: () => {
        console.log("✅ Profile updated successfully!");
        // Force refetch to ensure data is fresh
        queryClient.invalidateQueries(["user", user.id]);
        // Short delay to ensure data is refreshed
        setTimeout(() => {
          setOpenUpdate(false);
          setIsSubmitting(false);
        }, 1000);
      },
      onError: (error) => {
        console.error("❌ Update Failed:", error);
        setError(error.response?.data?.error || "Failed to update profile. Please try again.");
        setIsSubmitting(false);
      },
    }
  );

  // Improved form submission with better error handling
  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create a new object that will hold the updated user data
      const updatedUser = {
        name: texts.name,
        email: texts.email,
        username: texts.username,
      };
      
      console.log("🔄 Starting update process...");
      
      // Handle cover image upload if a new file is selected
      if (cover) {
        console.log("📤 Uploading new cover image...");
        const coverFilename = await upload(cover);
        if (coverFilename) {
          console.log(`✅ Cover uploaded: ${coverFilename}`);
          updatedUser.coverPic = coverFilename;
        } else if (error) {
          // If upload failed and error is set, return early
          setIsSubmitting(false);
          return;
        }
      }
      
      // Handle profile image upload if a new file is selected
      if (profile) {
        console.log("📤 Uploading new profile image...");
        const profileFilename = await upload(profile);
        if (profileFilename) {
          console.log(`✅ Profile uploaded: ${profileFilename}`);
          updatedUser.profilePic = profileFilename;
        } else if (error) {
          // If upload failed and error is set, return early
          setIsSubmitting(false);
          return;
        }
      }
      
      console.log("🔄 Final update payload:", updatedUser);
      
      // Only proceed with update if we have data to update
      if (Object.keys(updatedUser).length > 0) {
        // Send the update request with the new data
        mutation.mutate(updatedUser);
      } else {
        console.log("ℹ️ No changes to update");
        setOpenUpdate(false);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("❌ Update process failed:", err);
      setError("Update process failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath, defaultPath) => {
    if (!imagePath) return defaultPath;
    // If it's a full URL, use it directly
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, assume it's a filename in the upload folder
    return `/upload/${imagePath}?t=${Date.now()}`;
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        {error && <div className="error-message">{error}</div>}
        <form>
          {/* Cover Upload */}
          <label htmlFor="cover">
            <span>Cover Picture</span>
            <div className="imgContainer">
              <img
                src={
                  cover 
                    ? URL.createObjectURL(cover) 
                    : getImageUrl(user.coverPic, "/default-cover.png")
                }
                alt="Cover"
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="cover"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.size > 10 * 1024 * 1024) {
                setError("File too large! Max size is 10MB.");
                return;
              }
              setCover(file);
              setError(null);
            }}
            accept="image/jpeg,image/png,image/gif"
          />

          {/* Profile Upload */}
          <label htmlFor="profile">
            <span>Profile Picture</span>
            <div className="imgContainer">
              <img
                src={
                  profile 
                    ? URL.createObjectURL(profile) 
                    : getImageUrl(user.profilePic, "/default-avatar.png")
                }
                alt="Profile"
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="profile"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.size > 10 * 1024 * 1024) {
                setError("File too large! Max size is 10MB.");
                return;
              }
              setProfile(file);
              setError(null);
            }}
            accept="image/jpeg,image/png,image/gif"
          />

          {/* Name */}
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={(e) => setTexts((prev) => ({ ...prev, name: e.target.value }))}
          />

          {/* Email */}
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={(e) => setTexts((prev) => ({ ...prev, email: e.target.value }))}
          />

          {/* Username */}
          <label>Username</label>
          <input
            type="text"
            value={texts.username}
            name="username"
            onChange={(e) => setTexts((prev) => ({ ...prev, username: e.target.value }))}
          />

          {/* Submit Button */}
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