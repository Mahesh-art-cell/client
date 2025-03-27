
// import "./share.scss";
// import Image from "../../assets/img.png";
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

//   // ✅ Post Mutation
//   const mutation = useMutation(
//     async (newPost) => {
//       const formData = new FormData();
//       formData.append("content", newPost.content);
//       if (newPost.file) {
//         formData.append("file", newPost.file);
//       }

//       console.log("📢 FormData Content Before API:");
//       for (let [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }

//       console.log("📢 Sending FormData to API...");
//       const res = await makeRequest.post("/posts", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("✅ API Response:", res.data);
//       return res.data;
//     },
//     {
//       onSuccess: (data) => {
//         console.log("✅ Post Added Successfully:", data);
//         queryClient.invalidateQueries(["posts"]); // ✅ Refetch posts after success
//         setContent("");
//         setFile(null);
//         alert("✅ Post shared successfully!");
//       },
//       onError: (error) => {
//         console.error(
//           "❌ Error sharing post:",
//           error.response?.data || error.message
//         );
//         alert("❌ Error sharing post. Please try again.");
//       },
//     }
//   );

//   // ✅ Handle Share Button
//   const handleClick = async (e) => {
//     e.preventDefault();

//     if (!content.trim() && !file) {
//       alert("Please add some content or an image before sharing.");
//       return;
//     }

//     setUploading(true);

//     // ✅ Send Post Data to API
//     mutation.mutate({
//       content,
//       file,
//     });

//     setUploading(false);
//   };

//   // ✅ Handle File Change (Upload Image)
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     console.log("📢 Selected File:", selectedFile);
//     setFile(selectedFile);
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
//         </div>

//         {/* ✅ Correct Preview Container */}
//         <div className="right">
//           {file && (
//             <div className="preview-container">
//               <img
//                 className="file"
//                 alt="Preview"
//                 src={URL.createObjectURL(file)}
//               />
//               {content && <p className="post-text">{content}</p>}
//             </div>
//           )}
//         </div>

//         <hr />
//         <div className="bottom">
//           <div className="left">
//             {/* ✅ File Input for Image Upload */}
//             <input
//               type="file"
//               id="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//             />
//             <label htmlFor="file">
//               <div className="item">
//                 <img src={Image} alt="Add" />
//                 <span>Add Image</span>
//               </div>
//             </label>
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




import "./share.scss";
import Image from "../../assets/img.png";
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

  // ✅ Post Mutation
  const mutation = useMutation(
    async (newPost) => {
      const formData = new FormData();
      formData.append("content", newPost.content);
      if (newPost.file) {
        formData.append("file", newPost.file);
      }

      console.log("📢 FormData Content Before API:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      console.log("📢 Sending FormData to API...");
      const res = await makeRequest.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ API Response:", res.data);
      return res.data;
    },
    {
      onSuccess: (data) => {
        console.log("✅ Post Added Successfully:", data);
        queryClient.invalidateQueries(["posts"]); // ✅ Refetch posts after success
        setContent("");
        setFile(null);
        alert("✅ Post shared successfully!");
      },
      onError: (error) => {
        console.error(
          "❌ Error sharing post:",
          error.response?.data || error.message
        );
        alert("❌ Error sharing post. Please try again.");
      },
    }
  );

  // ✅ Handle Share Button
  const handleClick = async (e) => {
    e.preventDefault();

    if (!content.trim() && !file) {
      alert("Please add some content or an image before sharing.");
      return;
    }

    setUploading(true);

    // ✅ Send Post Data to API
    mutation.mutate({
      content,
      file,
    });

    setUploading(false);
  };

  // ✅ Handle File Change (Upload Image)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    console.log("📢 Selected File:", selectedFile);
    setFile(selectedFile);
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
        </div>

        {/* ✅ Corrected Preview Section */}
        <div className="right">
          {file && (
            <div className="preview-container">
              <img
                className="file"
                alt="Preview"
                src={URL.createObjectURL(file)}
              />
              {content && <p className="post-text">{content}</p>}
            </div>
          )}
        </div>

        <hr />
        <div className="bottom">
          <div className="left">
            {/* ✅ File Input for Image Upload */}
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="Add" />
                <span>Add Image</span>
              </div>
            </label>
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
