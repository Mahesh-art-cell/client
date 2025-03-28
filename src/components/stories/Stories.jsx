
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



import { useContext, useRef, useState } from "react";
import "./stories.css";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  // ✅ Fetch Stories
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => res.data)
  );

  // ✅ Add Story Mutation
  const addMutation = useMutation(
    async (formData) => {
      return makeRequest.post("/stories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  // ✅ Delete Story Mutation
  const deleteMutation = useMutation(
    async (storyId) => {
      return makeRequest.delete(`/stories/${storyId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  // ✅ Handle Story Upload
  const handleStoryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // ✅ Upload story
      await addMutation.mutateAsync(formData);
    } catch (err) {
      console.error("❌ Error uploading story:", err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle Story Deletion
  const handleDeleteStory = async (storyId) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      await deleteMutation.mutateAsync(storyId);
    }
  };

  return (
    <div className="stories">
      {/* ✅ Upload New Story */}
      <div
        className="story upload-story"
        onClick={() => fileInputRef.current.click()}
      >
        <img
          src={
            currentUser.profilePic
              ? `/upload/${currentUser.profilePic}`
              : "/default-avatar.png"
          }
          alt="profile"
        />
        <span>{currentUser.name}</span>
        <button className="plus-btn">+</button>
      </div>

      {/* ✅ Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*, video/*"
        onChange={handleStoryUpload}
        style={{ display: "none" }}
      />

      {uploading && <p>Uploading...</p>}

      {/* ✅ Display Stories in a Swiper */}
      {error ? (
        <p>Something went wrong!</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          navigation
          modules={[Navigation]}
          className="swiper-container"
        >
          {/* ✅ Show User Stories */}
          {data?.map((story) => (
            <SwiperSlide key={story.id} className="story-slide">
              {story.img.endsWith(".mp4") ? (
                <video controls className="story-media">
                  <source src={story.img} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={story.img} alt="story" className="story-media" />
              )}
              <span>{story.name}</span>

              {/* ✅ Show Delete Button for User's Own Story */}
              {story.userId === currentUser.id && (
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteStory(story.id)}
                >
                  ❌
                </button>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Stories;
