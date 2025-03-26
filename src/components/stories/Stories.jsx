
// import { useContext } from "react";
// import "./stories.scss";
// import { AuthContext } from "../../context/authContext";
// import { useQuery } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";

// const Stories = () => {
//   const { currentUser } = useContext(AuthContext);

//   // Ensure the request is only made if currentUser exists
//   const { isLoading, error, data } = useQuery(["stories"], async () => {
//     if (!currentUser) throw new Error("User not authenticated");
//     return makeRequest.get("/stories").then((res) => res.data);
//   });

//   return (
//     <div className="stories">
//       <div className="story">
//         <img src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : "/default-avatar.png"} alt="" />
//         <span>{currentUser.name}</span>
//         <button>+</button>
//       </div>
//       {error
//         ? "Something went wrong"
//         : isLoading
//         ? "loading..."
//         : data.map((story) => (
//             <div className="story" key={story.id}>
//               <img src={story.img} alt="" />
//               <span>{story.name}</span>
//             </div>
//           ))}
//     </div>
//   );
// };

// export default Stories;



import { useContext, useState, useEffect } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// ✅ Stories Component
const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ State for File Upload and Story List
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch Stories
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => res.data)
  );

  // ✅ Upload Story to Backend
  const handleStoryUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await makeRequest.post("/stories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Story uploaded successfully!");
      queryClient.invalidateQueries("stories"); // Refresh stories after upload
    } catch (err) {
      console.error("❌ Error uploading story:", err);
      alert("Error uploading story. Please try again.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  // ✅ Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="stories-container">
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        className="stories-swiper"
      >
        {/* ✅ Upload Story Button */}
        <SwiperSlide className="story upload" onClick={() => document.getElementById("fileInput").click()}>
          <div className="add-story">
            <span>+</span>
            <p>Add Story</p>
          </div>
        </SwiperSlide>

        {/* ✅ File Input for Upload */}
        <input
          id="fileInput"
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {file && (
          <button className="upload-btn" onClick={handleStoryUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Story"}
          </button>
        )}

        {/* ✅ Display Stories */}
        {error ? (
          <p>Something went wrong!</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          data.map((story) => (
            <SwiperSlide className="story" key={story.id}>
              {story.img.includes(".mp4") || story.img.includes(".webm") ? (
                <video src={story.img} controls />
              ) : story.img.includes(".mp3") || story.img.includes(".wav") ? (
                <audio src={story.img} controls />
              ) : (
                <img src={story.img} alt="story" />
              )}
              <span>{story.name || "Your Story"}</span>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Stories;
