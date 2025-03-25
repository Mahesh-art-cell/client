
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

//   // ✅ Upload Image to Cloudinary
//   const upload = async (file) => {
//     if (!file) {
//       throw new Error("❌ No file selected.");
//     }

//     console.log("📢 Uploading file to backend...");

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       // ✅ Correct API Endpoint
//       const res = await makeRequest.post("/upload/", formData);
//       console.log("✅ File Uploaded Successfully:", res.data.url);
//       return res.data.url; // ✅ Return the uploaded URL
//     } catch (err) {
//       console.error("❌ Upload Error:", err);
//       throw new Error("Failed to upload image.");
//     }
//   };

//   // ✅ Define Post Mutation with useMutation
//   const mutation = useMutation(
//     async (newPost) => {
//       const res = await makeRequest.post("/api/posts", newPost);
//       return res.data;
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["posts"]); // ✅ Re-fetch posts after adding
//         setContent(""); // ✅ Clear content after success
//         setFile(null); // ✅ Clear file after success
//       },
//       onError: (error) => {
//         console.error("❌ Post creation error:", error);
//         alert("Error sharing post. Please try again.");
//       },
//     }
//   );

//   // ✅ Handle Share Button Click
//   const handleClick = async (e) => {
//     e.preventDefault();

//     if (!content.trim() && !file) {
//       alert("Please add some content or an image before sharing.");
//       return;
//     }

//     try {
//       setUploading(true);

//       // ✅ Upload image if file exists
//       let imgUrl = null;
//       if (file) {
//         imgUrl = await upload(file); // ✅ Get Cloudinary URL
//         console.log("✅ Cloudinary URL:", imgUrl);
//       }

//       // ✅ Create post with content and image URL
//       mutation.mutate(
//         {
//           content: content,
//           img: imgUrl, // ✅ Pass Cloudinary URL to backend
//         },
//         {
//           onSuccess: (data) => {
//             console.log("✅ Post Added to DB:", data);
//             queryClient.invalidateQueries(["posts"]); // ✅ Re-fetch posts
//           },
//         }
//       );
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
//               src={currentUser?.profilePic || "/avatar.png"}
//               alt="Profile"
//             />
//             <textarea
//               placeholder={`What's on your mind, ${
//                 currentUser?.name || "User"
//               }?`}
//               onChange={(e) => setContent(e.target.value)}
//               value={content}
//             />
//           </div>
//           <div className="right">
//             {file ? (
//               <img
//                 className="file"
//                 alt="Preview"
//                 src={URL.createObjectURL(file)} // ✅ Display selected image
//               />
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//         <hr />
//         <div className="bottom">
//           <div className="left">
//             <input
//               type="file"
//               id="file"
//               onChange={(e) => setFile(e.target.files[0])}
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



// import "./share.scss";
// import Image from "../../assets/img.png";
// import Map from "../../assets/map.png";
// import Friend from "../../assets/friend.png";
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/authContext";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";

// const Share = () => {
//   const [file, setFile] = useState(null);
//   const [content, setContent] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   // ✅ Fetch Posts from Database (including Cloudinary URL)
//   const { data: posts, isLoading } = useQuery(["posts"], async () => {
//     const res = await makeRequest.get("/posts");
//     console.log("✅ Fetched Posts:", res.data);
//     return res.data;
//   });

//   // ✅ Upload Image to Cloudinary
//   const upload = async (file) => {
//     if (!file) {
//       throw new Error("❌ No file selected.");
//     }

//     console.log("📢 Uploading file to backend...");

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       // ✅ Correct API Endpoint
//       const res = await makeRequest.post("//", formData);
//       console.log("✅ File Uploaded Successfully:", res.data.url);
//       return res.data.url; // ✅ Return the uploaded URL
//     } catch (err) {
//       console.error("❌ Upload Error:", err);
//       throw new Error("Failed to upload image.");
//     }
//   };

//   // ✅ Define Post Mutation with useMutation
//   const mutation = useMutation(
//     async (newPost) => {
//       const res = await makeRequest.post("/api/posts", newPost);
//       return res.data;
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["posts"]); // ✅ Re-fetch posts after adding
//         setContent(""); // ✅ Clear content after success
//         setFile(null); // ✅ Clear file after success
//       },
//       onError: (error) => {
//         console.error("❌ Post creation error:", error);
//         alert("Error sharing post. Please try again.");
//       },
//     }
//   );

//   // ✅ Handle Share Button Click
//   const handleClick = async (e) => {
//     e.preventDefault();

//     if (!content.trim() && !file) {
//       alert("Please add some content or an image before sharing.");
//       return;
//     }

//     try {
//       setUploading(true);

//       // ✅ Upload image if file exists
//       let imgUrl = null;
//       if (file) {
//         imgUrl = await upload(file); // ✅ Get Cloudinary URL
//         console.log("✅ Cloudinary URL:", imgUrl);
//       }

//       // ✅ Create post with content and image URL
//       mutation.mutate(
//         {
//           content: content,
//           img: imgUrl, // ✅ Pass Cloudinary URL to backend
//         },
//         {
//           onSuccess: (data) => {
//             console.log("✅ Post Added to DB:", data);
//             queryClient.invalidateQueries(["posts"]); // ✅ Re-fetch posts
//           },
//         }
//       );
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
//               src={currentUser?.profilePic || "/avatar.png"}
//               alt="Profile"
//             />
//             <textarea
//               placeholder={`What's on your mind, ${
//                 currentUser?.name || "User"
//               }?`}
//               onChange={(e) => setContent(e.target.value)}
//               value={content}
//             />
//           </div>
//           <div className="right">
//             {file ? (
//               <img
//                 className="file"
//                 alt="Preview"
//                 src={URL.createObjectURL(file)} // ✅ Display selected image
//               />
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//         <hr />
//         <div className="bottom">
//           <div className="left">
//             <input
//               type="file"
//               id="file"
//               onChange={(e) => setFile(e.target.files[0])}
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
//             >
//               {mutation.isPending || uploading ? "Sharing..." : "Share"}
//             </button>
//           </div>
//         </div>

//         <hr />

//         {/* ✅ Display Posts with Cloudinary Images */}
//         <div className="posts">
//           {isLoading ? (
//             <p>Loading posts...</p>
//           ) : (
//             posts?.map((post) => (
//               <div className="post" key={post.id}>
//                 <div className="postContent">
//                   <p>{post.content}</p>
//                   {post.img && (
//                     <img src={post.img} alt="Post" className="postImage" />
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Fetch Posts from Database (including Cloudinary URL)
  const { data: posts, isLoading } = useQuery(["posts"], async () => {
    const res = await makeRequest.get("/api/posts");
    console.log("✅ Fetched Posts:", res.data);
    return res.data;
  });

  // ✅ Define Post Mutation with useMutation
  const mutation = useMutation(
    async (newPost) => {
      const formData = new FormData();
      formData.append("content", newPost.content);
      if (newPost.file) {
        formData.append("file", newPost.file); // ✅ Add file to formData
      }

      const res = await makeRequest.post("/api/posts", formData); // ✅ Upload and save in DB
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]); // ✅ Re-fetch posts after adding
        setContent(""); // ✅ Clear content after success
        setFile(null); // ✅ Clear file after success
      },
      onError: (error) => {
        console.error("❌ Post creation error:", error);
        alert("Error sharing post. Please try again.");
      },
    }
  );

  // ✅ Handle Share Button Click
  const handleClick = async (e) => {
    e.preventDefault();

    if (!content.trim() && !file) {
      alert("Please add some content or an image before sharing.");
      return;
    }

    try {
      setUploading(true);

      // ✅ Create post with content and image URL
      mutation.mutate({
        content: content,
        file: file, // ✅ Pass file to mutation
      });
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
          <div className="right">
            {file ? (
              <img
                className="file"
                alt="Preview"
                src={URL.createObjectURL(file)} // ✅ Display selected image preview
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

        <hr />

        {/* ✅ Display Posts with Cloudinary Images */}
        <div className="posts">
          {isLoading ? (
            <p>Loading posts...</p>
          ) : (
            posts?.map((post) => (
              <div className="post" key={post.id}>
                <div className="postContent">
                  <p>{post.content}</p>
                  {post.img && (
                    <img src={post.img} alt="Post" className="postImage" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Share;
