
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

//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   // ✅ Upload image function
//   const upload = async () => {
//     if (!file) return null;
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const res = await makeRequest.post("/upload", formData);
//       return res.data; // ✅ Returns uploaded image filename/path
//     } catch (err) {
//       console.log("❌ Upload Error:", err);
//       return null;
//     }
//   };

//   // ✅ Mutation to create a new post
//   const mutation = useMutation(
//     async (newPost) => await makeRequest.post("/posts", newPost),
//     {
//       onSuccess: (data) => {
//         console.log("✅ Post added:", data);
//         queryClient.invalidateQueries(["posts"]); // ✅ Refetch posts after adding
//       },
//     }
//   );

//   // ✅ Handle share button click
//   const handleClick = async (e) => {
//     e.preventDefault();
//     let imgUrl = "";

//     if (file) {
//       imgUrl = await upload();
//     }

//     if (!desc.trim() && !imgUrl) {
//       alert("Please add a description or image before sharing!");
//       return;
//     }

//     mutation.mutate({ desc, img: imgUrl });

//     setDesc(""); // ✅ Reset input field
//     setFile(null); // ✅ Reset file input
//   };

//   return (
//     <div className="share">
//       <div className="container">
//         <div className="top">
//           <div className="left">
//             <img src={`/upload/${currentUser.profilePic}`} alt="Profile" />
//             <input
//               type="text"
//               placeholder={`What's on your mind, ${currentUser.name}?`}
//               onChange={(e) => setDesc(e.target.value)}
//               value={desc}
//             />
//           </div>
//           <div className="right">
//             {file && <img className="file" alt="Preview" src={URL.createObjectURL(file)} />}
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
//             />
//             <label htmlFor="file">
//               <div className="item">
//                 <img src={Image} alt="Add Image" />
//                 <span>Add Image</span>
//               </div>
//             </label>
//             <div className="item">
//               <img src={Map} alt="Add Place" />
//               <span>Add Place</span>
//             </div>
//             <div className="item">
//               <img src={Friend} alt="Tag Friends" />
//               <span>Tag Friends</span>
//             </div>
//           </div>
//           <div className="right">
//             <button onClick={handleClick} disabled={mutation.isLoading}>
//               {mutation.isLoading ? "Sharing..." : "Share"}
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
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Upload image function
  const upload = async () => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      console.log("✅ Image uploaded successfully:", res.data);
      return res.data;
    } catch (err) {
      console.log("❌ Upload Error:", err);
      return null;
    }
  };

  // Mutation to create a new post
  const mutation = useMutation(
    async (newPost) => await makeRequest.post("/posts", newPost),
    {
      onSuccess: () => {
        console.log("✅ Post added successfully");
        queryClient.invalidateQueries(["posts"]); // Refetch posts after adding
      },
      onError: (error) => {
        console.log("❌ Failed to add post:", error);
        alert("Failed to share post. Please try again.");
      }
    }
  );

  // Handle share button click
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";

    if (file) {
      imgUrl = await upload();
      if (!imgUrl && file) {
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    if (!desc.trim() && !imgUrl) {
      alert("Please add a description or image before sharing!");
      return;
    }

    // Match the backend API expectations (title and content instead of desc and img)
    mutation.mutate({
      title: desc.substring(0, 50), // Use first 50 chars as title
      content: desc + (imgUrl ? `\n[Image: ${imgUrl}]` : "") // Store both text and image reference
    });

    setDesc(""); // Reset input field
    setFile(null); // Reset file input
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
            <input
              type="text"
              placeholder={`What's on your mind, ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
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
              accept="image/*" // Only accept image files
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="Add Image" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="Add Place" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="Tag Friends" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button 
              onClick={handleClick} 
              disabled={mutation.isLoading}
              className={mutation.isLoading ? "loading" : ""}
            >
              {mutation.isLoading ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;