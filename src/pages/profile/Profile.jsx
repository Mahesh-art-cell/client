



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
// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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
//   const { isLoading, data } = useQuery(["user", userId], () =>
//     makeRequest.get(`/users/find/${userId}`).then((res) => res.data),
//     { enabled: !isNaN(userId) }
//   );

//   // Upload Handler
//   const handleFileUpload = async (e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("type", type); // 'coverPic' or 'profilePic'

//       await makeRequest.post(`/users/upload/${userId}`, formData);
//       queryClient.invalidateQueries(["user", userId]); // ✅ Refresh user data immediately
//     } catch (err) {
//       console.error("Upload Error:", err);
//     }
//   };

//   return (
//     <div className="profile">
//       {isLoading ? (
//         "Loading..."
//       ) : (
//         <>
//           <div className="images">
//             {/* ✅ Clickable Cover Image Upload */}
//             <label htmlFor="coverUpload">
//               <img
//                 src={data?.coverPic ? `/upload/${data.coverPic}?timestamp=${Date.now()}` : "/default-cover.png"}
//                 alt="Cover"
//                 className="cover"
//               />
//             </label>
//             <input type="file" id="coverUpload" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "coverPic")} />

//             {/* ✅ Clickable Profile Picture Upload */}
//             <label htmlFor="profileUpload">
//               <img
//                 src={data?.profilePic ? `/upload/${data.profilePic}?timestamp=${Date.now()}` : "/default-avatar.png"}
//                 alt="Profile"
//                 className="profilePic"
//               />
//             </label>
//             <input type="file" id="profileUpload" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "profilePic")} />
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
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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

  // Fetch user data
  const { isLoading, data } = useQuery(
    ["user", userId],
    () => makeRequest.get(`/users/find/${userId}`).then((res) => res.data),
    { enabled: !isNaN(userId) }
  );

  // ✅ Upload Handler (Fixed)
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await makeRequest.post("/upload", formData);
      const uploadedUrl = res.data.url; // ✅ Get the uploaded image URL

      // ✅ Update user data with new image
      await makeRequest.put(`/users/${userId}`, { [type]: uploadedUrl });

      queryClient.invalidateQueries(["user", userId]); // ✅ Refresh user data
    } catch (err) {
      console.error("Upload Error:", err);
    }
  };

  return (
    <div className="profile">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="images">
            {/* ✅ Clickable Cover Image Upload */}
            <label htmlFor="coverUpload">
              <img
                src={data?.coverPic || "/default-cover.png"}
                alt="Cover"
                className="cover"
              />
            </label>
            {userId === currentUser.id && (
              <input type="file" id="coverUpload" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "coverPic")} />
            )}

            {/* ✅ Clickable Profile Picture Upload */}
            <label htmlFor="profileUpload">
              <img
                src={data?.profilePic || "/default-avatar.png"}
                alt="Profile"
                className="profilePic"
              />
            </label>
            {userId === currentUser.id && (
              <input type="file" id="profileUpload" style={{ display: "none" }} onChange={(e) => handleFileUpload(e, "profilePic")} />
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

                {userId === currentUser.id && <button onClick={() => setOpenUpdate(true)}>Update</button>}
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
