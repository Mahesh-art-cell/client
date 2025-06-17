


// import { useState } from "react";
// import "./update.css";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import axios from "axios";

// const Update = ({ setOpenUpdate, user, onProfileUpdate }) => {
//   const [cover, setCover] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [name, setName] = useState(user.name);
//   const [email, setEmail] = useState(user.email);
//   const [username, setUsername] = useState(user.username);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("username", username);
//       if (cover) formData.append("coverPic", cover);
//       if (profile) formData.append("profilePic", profile);

//       const res = await axios.put(`http://localhost:8800/api/users/${user._id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       onProfileUpdate(res.data); // update parent state
//       setOpenUpdate(false);
//     } catch (err) {
//       console.error("❌ Profile update failed:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="updateModal">
//       <div className="updateContainer">
//         <span className="close" onClick={() => setOpenUpdate(false)}>❌</span>
//         <h2>Update Your Profile</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="images">
//             <div className="imageInput">
//               <img
//                 src={cover ? URL.createObjectURL(cover) : user.coverPic}
//                 alt="Cover"
//                 className="imagePreview"
//               />
//               <label htmlFor="coverInput"><CloudUploadIcon className="icon" /></label>
//               <input type="file" id="coverInput" style={{ display: "none" }} onChange={(e) => setCover(e.target.files[0])} />
//             </div>

//             <div className="imageInput">
//               <img
//                 src={profile ? URL.createObjectURL(profile) : user.profilePic}
//                 alt="Profile"
//                 className="imagePreview"
//               />
//               <label htmlFor="profileInput"><CloudUploadIcon className="icon" /></label>
//               <input type="file" id="profileInput" style={{ display: "none" }} onChange={(e) => setProfile(e.target.files[0])} />
//             </div>
//           </div>

//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//           <button type="submit" className="updateButton">Update</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Update;



import { useState } from "react";
import "./update.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const Update = ({ setOpenUpdate, user, onProfileUpdate }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [username, setUsername] = useState(user.username || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Only append if changed
      if (name.trim() && name !== user.name) formData.append("name", name);
      if (email.trim() && email !== user.email) formData.append("email", email);
      if (username.trim() && username !== user.username) formData.append("username", username);
      if (cover) formData.append("coverPic", cover);
      if (profile) formData.append("profilePic", profile);

      // Skip update if nothing changed
      if (!formData.has("name") && !formData.has("email") && !formData.has("username") && !cover && !profile) {
        alert("No changes to update.");
        return;
      }

      const res = await axios.put(`http://localhost:8800/api/users/${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onProfileUpdate(res.data); // Pass only updated fields
      setOpenUpdate(false);
    } catch (err) {
      console.error("❌ Profile update failed:", err.response?.data || err.message);
    }
  };

  console.log("User ID being updated:", user.id); // Should NOT be undefined


  return (
    <div className="updateModal">
      <div className="updateContainer">
        <span className="close" onClick={() => setOpenUpdate(false)}>❌</span>
        <h2>Update Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="images">
            <div className="imageInput">
              <img
                src={cover ? URL.createObjectURL(cover) : user.coverPic}
                alt="Cover"
                className="imagePreview"
              />
              <label htmlFor="coverInput"><CloudUploadIcon className="icon" /></label>
              <input type="file" id="coverInput" style={{ display: "none" }} onChange={(e) => setCover(e.target.files[0])} />
            </div>

            <div className="imageInput">
              <img
                src={profile ? URL.createObjectURL(profile) : user.profilePic}
                alt="Profile"
                className="imagePreview"
              />
              <label htmlFor="profileInput"><CloudUploadIcon className="icon" /></label>
              <input type="file" id="profileInput" style={{ display: "none" }} onChange={(e) => setProfile(e.target.files[0])} />
            </div>
          </div>

          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          
          <button type="submit" className="updateButton">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
