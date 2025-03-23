

// import "./share.scss";
// import Image from "../../assets/img.png";
// import Map from "../../assets/map.png";
// import Friend from "../../assets/friend.png";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/authContext";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";

// const Share = () => {
//   const [file, setFile] = useState(null);
//   const [content, setContent] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   // ✅ Upload Image to Backend
//   const upload = async () => {
//     if (!file) return null;

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await makeRequest.post("/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("✅ Upload successful:", res.data);
//       return res.data.filename;
//     } catch (err) {
//       console.error("❌ Upload Error:", err);
//       throw new Error("Failed to upload image.");
//     }
//   };

//   // ✅ Mutation to create a new post
//   const mutation = useMutation({
//     mutationFn: async (newPost) => {
//       const res = await makeRequest.post("/posts", newPost);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["posts"]);
//       setContent("");
//       setFile(null);
//     },
//     onError: (error) => {
//       console.error("❌ Post creation error:", error);
//       alert("Error sharing post. Please try again.");
//     },
//   });

//   // ✅ Handle Share Button Click
//   const handleClick = async (e) => {
//     e.preventDefault();

//     if (!content.trim() && !file) {
//       alert("Please add some content or an image before sharing.");
//       return;
//     }

//     try {
//       setUploading(true);

//       // Upload image if file exists
//       let imgUrl = null;
//       if (file) {
//         imgUrl = await upload(); // ✅ Get uploaded image URL
//       }

//       // ✅ Create post with content and image URL
//       mutation.mutate({
//         content: content,
//         img: imgUrl,
//       });
//     } catch (error) {
//       console.error("❌ Error while sharing post:", error);
//       alert("Error while sharing post. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="share">
//       <div className="container">
//         <div className="top">
//           <div className="left">
//             <img
//               src={currentUser?.profilePic ? `/upload/${currentUser.profilePic}` : "/avatar.png"}
//               alt="Profile"
//             />
//             <div className="input-area">
//               <textarea
//                 placeholder={`What's on your mind, ${currentUser?.name || "User"}?`}
//                 onChange={(e) => setContent(e.target.value)}
//                 value={content}
//                 className="content-input"
//               />
//             </div>
//           </div>
//           <div className="right">
//             {file && (
//               <img className="file" alt="Preview" src={URL.createObjectURL(file)} />
//             )}
//           </div>
//         </div>
//         <hr />
//         <div className="bottom">
//           <div className="left">
//             <input
//               type="file"
//               id="file"
//               style={{ display: "none" }}
//               onChange={(e) => setFile(e.target.files[0])}
//               accept="image/*"
//             />
//             <label htmlFor="file">
//               <div className="item">
//                 <img src={Image} alt="Add" />
//                 <span>Add Image</span>
//               </div>
//             </label>
//             <div className="item">
//               <img src={Map} alt="Location" />
//               <span>Add Place</span>
//             </div>
//             <div className="item">
//               <img src={Friend} alt="Friends" />
//               <span>Tag Friends</span>
//             </div>
//           </div>
//           <div className="right">
//             <button
//               onClick={handleClick}
//               disabled={mutation.isPending || uploading}
//               className={mutation.isPending || uploading ? "disabled" : ""}
//             >
//               {mutation.isPending || uploading ? "Sharing..." : "Share"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Share;




import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Upload Image to Cloudinary
  // ✅ Upload Image to Cloudinary
const upload = async (file) => {
  if (!file) {
    throw new Error("❌ No file selected.");
  }

  console.log("📢 Uploading file to backend...");

  try {
    const formData = new FormData();
    formData.append("file", file);

    // ✅ Send file to backend -> Cloudinary
    const res = await makeRequest.post("/api/upload", formData);
    console.log("✅ File Uploaded Successfully:", res.data.url);
    return res.data.url; // ✅ Return the uploaded URL
  } catch (err) {
    console.error("❌ Upload Error:", err);
    throw new Error("Failed to upload image.");
  }
};


  // ✅ Create New Post Mutation
  // ✅ Create New Post Mutation
const mutation = useMutation({
  mutationFn: async (newPost) => {
    const res = await makeRequest.post("/api/posts", newPost);
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["posts"]); // ✅ Re-fetch posts list
    setContent("");
    setFile(null);
  },
  onError: (error) => {
    console.error("❌ Post creation error:", error);
    alert("Error sharing post. Please try again.");
  },
});


  // ✅ Handle Share Button Click
  // ✅ Handle Share Button Click
const handleClick = async (e) => {
  e.preventDefault();

  if (!content.trim() && !file) {
    alert("Please add some content or an image before sharing.");
    return;
  }

  try {
    setUploading(true);

    // ✅ Upload image if file exists
    let imgUrl = null;
    if (file) {
      imgUrl = await upload(file); // ✅ Get Cloudinary URL
      console.log("✅ Cloudinary URL:", imgUrl);
    }

    // ✅ Create post with content and image URL
    mutation.mutate(
      {
        content: content,
        img: imgUrl, // ✅ Pass Cloudinary URL to backend
      },
      {
        onSuccess: (data) => {
          console.log("✅ Post Added to DB:", data);
          queryClient.invalidateQueries(["posts"]); // ✅ Re-fetch posts
        },
      }
    );
  } catch (error) {
    console.error("❌ Error while sharing post:", error);
    alert("Error while sharing post. Please try again.");
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={currentUser?.profilePic || "/avatar.png"}
              alt="Profile"
            />
            <textarea
              placeholder={`What's on your mind, ${
                currentUser?.name || "User"
              }?`}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          {/* <div className="right">
            {file && (
              <img
                className="file"
                alt="Preview"
                src={URL.createObjectURL(file)}
              />
            )}
          </div> */}
          <div className="right">
             {file ? (
               <img
                className="file"
              alt="Preview"
                  src={URL.createObjectURL(file)} // ✅ Display selected image
              />
              ) : (
                    ""
                  )}
          </div>

        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="Add" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="Location" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="Friends" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button
              onClick={handleClick}
              disabled={mutation.isPending || uploading}
            >
              {mutation.isPending || uploading ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
