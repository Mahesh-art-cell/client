
// // Share.jsx Component
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
//   const [desc, setDesc] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   // Upload image function - Fixed to handle errors properly
//   const upload = async () => {
//     if (!file) return null;
//     setUploading(true);
    
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
      
//       // Ensure Content-Type is NOT set (browser will set it with boundary)
//       const res = await makeRequest.post("/upload", formData);
//       setUploading(false);
//       return res.data;
//     } catch (err) {
//       console.error("Upload Error:", err);
//       setUploading(false);
//       alert("Failed to upload image. Please try again.");
//       return null;
//     }
//   };

//   // Mutation to create a new post
//   const mutation = useMutation(
//     async (newPost) => {
//       const response = await makeRequest.post("/posts", newPost);
//       return response.data;
//     },
//     {
//       onSuccess: () => {
//         // Refresh posts list
//         queryClient.invalidateQueries(["posts"]);
        
//         // Reset form
//         setDesc("");
//         setFile(null);
//       },
//       onError: (error) => {
//         console.error("Post creation error:", error);
//         alert("Error sharing post. Please try again.");
//       }
//     }
//   );

//   // Handle share button click
//   const handleClick = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!desc.trim() && !file) {
//       alert("Please add a description or image before sharing!");
//       return;
//     }
    
//     try {
//       // Upload image if present
//       let imgUrl = null;
//       if (file) {
//         imgUrl = await upload();
//         if (!imgUrl) return; // Exit if upload failed
//       }
      
//       // Create post with correct fields matching backend
//       mutation.mutate({
//         content: desc,
//         img: imgUrl // Backend should expect this field
//       });
      
//     } catch (error) {
//       console.error("Share error:", error);
//       alert("Error sharing post. Please try again.");
//     }
//   };

//   return (
//     <div className="share">
//       <div className="container">
//         <div className="top">
//           <div className="left">
//             <img 
//               src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : "/avatar.png"} 
//               alt="" 
//             />
//             <input
//               type="text"
//               placeholder={`What's on your mind, ${currentUser.name}?`}
//               onChange={(e) => setDesc(e.target.value)}
//               value={desc}
//             />
//           </div>
//           <div className="right">
//             {file && (
//               <img 
//                 className="file" 
//                 alt="" 
//                 src={URL.createObjectURL(file)} 
//               />
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
//                 <img src={Image} alt="" />
//                 <span>Add Image</span>
//               </div>
//             </label>
//             <div className="item">
//               <img src={Map} alt="" />
//               <span>Add Place</span>
//             </div>
//             <div className="item">
//               <img src={Friend} alt="" />
//               <span>Tag Friends</span>
//             </div>
//           </div>
//           <div className="right">
//             <button 
//               onClick={handleClick} 
//               disabled={mutation.isLoading || uploading}
//             >
//               {mutation.isLoading || uploading ? "Sharing..." : "Share"}
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

  // Upload image function
  const upload = async () => {
    try {
      if (!file) return null;
      
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await makeRequest.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      
      console.log("Upload successful:", res.data);
      return res.data;
    } catch (err) {
      console.error("Upload Error:", err);
      throw new Error("Failed to upload image");
    }
  };

  // Mutation to create a new post
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const response = await makeRequest.post("/posts", newPost);
      return response.data;
    },
    onSuccess: () => {
      // Refresh posts list
      queryClient.invalidateQueries(["posts"]);
      
      // Reset form
      setContent("");
      setFile(null);
    },
    onError: (error) => {
      console.error("Post creation error:", error);
      alert("Error sharing post. Please try again.");
    }
  });

  // Handle share button click
  const handleClick = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!content.trim() && !file) {
      alert("Please add a description or image before sharing!");
      return;
    }
    
    try {
      setUploading(true);
      
      // Upload image if present
      let imgUrl = null;
      if (file) {
        imgUrl = await upload();
      }
      
      // Create post with or without image
      mutation.mutate({
        content: content,
        img: imgUrl
      });
      
    } catch (error) {
      console.error("Share error:", error);
      alert("Error sharing post: " + (error.message || "Please try again."));
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
              src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : "/avatar.png"} 
              alt="Profile" 
            />
            <div className="input-area">
              <textarea
                placeholder={`What's on your mind, ${currentUser.name}?`}
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="content-input"
              />
            </div>
          </div>
          <div className="right">
            {file && (
              <img 
                className="file" 
                alt="Preview" 
                src={URL.createObjectURL(file)} 
              />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
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
              className={mutation.isPending || uploading ? "disabled" : ""}
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

