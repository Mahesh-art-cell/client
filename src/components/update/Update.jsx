
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

//   // ✅ Fixed upload function
//   const upload = async (file) => {
//     if (!file) return null;
    
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
      
//       // ✅ Consistent endpoint
//       const res = await makeRequest.post(`/users/upload/${user.id}`, formData, {
//         headers: { 
//           "Content-Type": "multipart/form-data",
//         },
//       });
      
//       console.log("📸 Upload Successful:", res.data);
//       return res.data.filename;
//     } catch (err) {
//       console.error("❌ Upload Error:", err.response?.data || err.message);
//       return null;
//     }
//   };

//   // ✅ Mutation for updating user profile
//   const mutation = useMutation(
//     async (updatedUser) => {
//       // ✅ PUT request to update user info
//       return makeRequest.put(`/users/${user.id}`, updatedUser);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["user", user.id]);
//         setOpenUpdate(false);
//         setIsSubmitting(false);
//       },
//       onError: (error) => {
//         console.error("❌ Update Failed:", error.response?.data || error.message);
//         setIsSubmitting(false);
//       },
//     }
//   );

//   // ✅ Handle form submission
//   const handleClick = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       let coverUrl = user.coverPic;
//       let profileUrl = user.profilePic;
      
//       if (cover) {
//         const uploadedCover = await upload(cover);
//         if (uploadedCover) coverUrl = uploadedCover;
//       }
      
//       if (profile) {
//         const uploadedProfile = await upload(profile);
//         if (uploadedProfile) profileUrl = uploadedProfile;
//       }
      
//       // ✅ Updated user data to send to API
//       const updatedUser = {
//         name: texts.name,
//         email: texts.email,
//         username: texts.username,
//         coverPic: coverUrl,
//         profilePic: profileUrl,
//       };
      
//       console.log("🔄 Updating user with:", updatedUser);
//       mutation.mutate(updatedUser);
//     } catch (err) {
//       console.error("❌ Update process failed:", err);
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="update">
//       <div className="wrapper">
//         <h1>Update Your Profile</h1>
//         <form>
//           {/* Cover Upload */}
//           <label htmlFor="cover">
//             <span>Cover Picture</span>
//             <div className="imgContainer">
//               <img
//                 src={cover ? URL.createObjectURL(cover) : `/upload/${user.coverPic}`}
//                 alt="Cover"
//               />
//               <CloudUploadIcon className="icon" />
//             </div>
//           </label>
//           <input
//             type="file"
//             id="cover"
//             style={{ display: "none" }}
//             onChange={(e) => setCover(e.target.files[0])}
//           />

//           {/* Profile Upload */}
//           <label htmlFor="profile">
//             <span>Profile Picture</span>
//             <div className="imgContainer">
//               <img
//                 src={profile ? URL.createObjectURL(profile) : `/upload/${user.profilePic}`}
//                 alt="Profile"
//               />
//               <CloudUploadIcon className="icon" />
//             </div>
//           </label>
//           <input
//             type="file"
//             id="profile"
//             style={{ display: "none" }}
//             onChange={(e) => setProfile(e.target.files[0])}
//           />

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
//           <button onClick={handleClick} disabled={isSubmitting}>
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

  // ✅ Fixed upload function with proper URL handling
  const upload = async (file) => {
    if (!file) return null;
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      console.log(`📤 Uploading file: ${file.name}`);
      
      const res = await makeRequest.post(`/users/upload/${user.id}`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("📸 Upload Successful:", res.data);
      return res.data.filename; // Return just the filename
    } catch (err) {
      console.error("❌ Upload Error:", err.response?.data || err.message);
      return null;
    }
  };

  // ✅ Mutation for updating user profile
  const mutation = useMutation(
    async (updatedUser) => {
      console.log("🔄 Sending update with data:", updatedUser);
      return makeRequest.put(`/users/${user.id}`, updatedUser);
    },
    {
      onSuccess: () => {
        console.log("✅ Profile updated successfully!");
        queryClient.invalidateQueries(["user", user.id]);
        setOpenUpdate(false);
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error("❌ Update Failed:", error.response?.data || error.message);
        setIsSubmitting(false);
      },
    }
  );

  // ✅ Improved form submission with proper image handling
  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a new object that will hold the updated user data
      const updatedUser = {
        name: texts.name,
        email: texts.email,
        username: texts.username,
        // Include existing image paths for now
        coverPic: user.coverPic,
        profilePic: user.profilePic,
      };
      
      console.log("🔄 Starting update process...");
      
      // Handle cover image upload if a new file is selected
      if (cover) {
        console.log("📤 Uploading new cover image...");
        const coverFilename = await upload(cover);
        if (coverFilename) {
          console.log(`✅ Cover uploaded: ${coverFilename}`);
          updatedUser.coverPic = coverFilename;
        }
      }
      
      // Handle profile image upload if a new file is selected
      if (profile) {
        console.log("📤 Uploading new profile image...");
        const profileFilename = await upload(profile);
        if (profileFilename) {
          console.log(`✅ Profile uploaded: ${profileFilename}`);
          updatedUser.profilePic = profileFilename;
        }
      }
      
      console.log("🔄 Final update payload:", updatedUser);
      
      // Send the update request with the new data
      mutation.mutate(updatedUser);
    } catch (err) {
      console.error("❌ Update process failed:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          {/* Cover Upload */}
          <label htmlFor="cover">
            <span>Cover Picture</span>
            <div className="imgContainer">
              <img
                src={
                  cover 
                    ? URL.createObjectURL(cover) 
                    : user.coverPic 
                      ? `/upload/${user.coverPic}` 
                      : "/default-cover.png"
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
            onChange={(e) => setCover(e.target.files[0])}
          />

          {/* Profile Upload */}
          <label htmlFor="profile">
            <span>Profile Picture</span>
            <div className="imgContainer">
              <img
                src={
                  profile 
                    ? URL.createObjectURL(profile) 
                    : user.profilePic 
                      ? `/upload/${user.profilePic}` 
                      : "/default-avatar.png"
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
            onChange={(e) => setProfile(e.target.files[0])}
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