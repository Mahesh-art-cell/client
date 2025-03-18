


// import { useState } from "react";
// import { makeRequest } from "../../axios";
// import "./update.scss";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// const Update = ({ setOpenUpdate, user }) => {
//   // ✅ Always declare hooks at the top
//   const queryClient = useQueryClient();
  
//   const [cover, setCover] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [texts, setTexts] = useState({
//     email: user?.email || "",
//     name: user?.name || "",
//     username: user?.username || "",
//   });

//   // ✅ Upload function
//   const upload = async (file) => {
//     if (!file) return null; // Skip upload if no new file is selected

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await makeRequest.post("/users/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       return res.data; // ✅ Should return the file URL
//     } catch (err) {
//       console.error("❌ Upload Error:", err.response?.data || err.message);
//       return null;
//     }
//   };

//   // ✅ Mutation for updating user details
//   const mutation = useMutation(
//     async (updatedUser) => {
//       return makeRequest.put(`/users/${user.id}`, updatedUser, {
//         withCredentials: true,
//       });
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["user", user.id]); // ✅ Refresh user data
//         setOpenUpdate(false);
//       },
//       onError: (error) => {
//         console.error("❌ Update Failed:", error.response?.data || error.message);
//       },
//     }
//   );

//   // ✅ Handle Form Submission
//   const handleClick = async (e) => {
//     e.preventDefault();

//     console.log("📌 Cookies before update request:", document.cookie);

//     const coverUrl = await upload(cover);
//     const profileUrl = await upload(profile);

//     const updatedUser = {
//       name: texts.name,
//       email: texts.email,
//       username: texts.username,
//       coverPic: coverUrl || user.coverPic,
//       profilePic: profileUrl || user.profilePic,
//     };

//     mutation.mutate(updatedUser);
//   };

//   // ✅ Instead of returning early, handle missing user in UI
//   if (!user) {
//     return (
//       <div className="update">
//         <div className="wrapper">
//           <h1>Error</h1>
//           <p>User data is missing.</p>
//           <button className="close" onClick={() => setOpenUpdate(false)}>
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="update">
//       <div className="wrapper">
//         <h1>Update Your Profile</h1>
//         <form>
//           <div className="files">
//             {/* Cover Picture */}
//             <label htmlFor="cover">
//               <span>Cover Picture</span>
//               <div className="imgContainer">
//                 <img
//                   src={cover ? URL.createObjectURL(cover) : `/upload/${user.coverPic}`}
//                   alt="Cover"
//                 />
//                 <CloudUploadIcon className="icon" />
//               </div>
//             </label>
//             <input type="file" id="cover" style={{ display: "none" }} onChange={(e) => setCover(e.target.files[0])} />

//             {/* Profile Picture */}
//             <label htmlFor="profile">
//               <span>Profile Picture</span>
//               <div className="imgContainer">
//                 <img
//                   src={profile ? URL.createObjectURL(profile) : `/upload/${user.profilePic}`}
//                   alt="Profile"
//                 />
//                 <CloudUploadIcon className="icon" />
//               </div>
//             </label>
//             <input type="file" id="profile" style={{ display: "none" }} onChange={(e) => setProfile(e.target.files[0])} />
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

//           <button onClick={handleClick}>Update</button>
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

  // ✅ Fixed upload function
  const upload = async (file) => {
    if (!file) return null;
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      // ✅ Consistent endpoint
      const res = await makeRequest.post(`/users/upload/${user.id}`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("📸 Upload Successful:", res.data);
      return res.data.filename;
    } catch (err) {
      console.error("❌ Upload Error:", err.response?.data || err.message);
      return null;
    }
  };

  // ✅ Mutation for updating user profile
  const mutation = useMutation(
    async (updatedUser) => {
      // ✅ PUT request to update user info
      return makeRequest.put(`/users/${user.id}`, updatedUser);
    },
    {
      onSuccess: () => {
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

  // ✅ Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let coverUrl = user.coverPic;
      let profileUrl = user.profilePic;
      
      if (cover) {
        const uploadedCover = await upload(cover);
        if (uploadedCover) coverUrl = uploadedCover;
      }
      
      if (profile) {
        const uploadedProfile = await upload(profile);
        if (uploadedProfile) profileUrl = uploadedProfile;
      }
      
      // ✅ Updated user data to send to API
      const updatedUser = {
        name: texts.name,
        email: texts.email,
        username: texts.username,
        coverPic: coverUrl,
        profilePic: profileUrl,
      };
      
      console.log("🔄 Updating user with:", updatedUser);
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
                src={cover ? URL.createObjectURL(cover) : `/upload/${user.coverPic}`}
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
                src={profile ? URL.createObjectURL(profile) : `/upload/${user.profilePic}`}
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
          <button onClick={handleClick} disabled={isSubmitting}>
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