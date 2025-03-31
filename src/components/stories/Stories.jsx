
// import { useContext, useRef, useState } from "react";
// import "./stories.css";
// import { AuthContext } from "../../context/authContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { toast } from "react-toastify"; // ✅ Import toast from react-toastify

// const Stories = () => {
//   const { currentUser } = useContext(AuthContext);
//   const fileInputRef = useRef(null);
//   const [uploading, setUploading] = useState(false);

//   const queryClient = useQueryClient();

//   // ✅ Fetch Stories
//   const { isLoading, error, data } = useQuery(["stories"], () =>
//     makeRequest.get("/stories").then((res) => res.data)
//   );

//   // ✅ Add Story Mutation
//   const addMutation = useMutation(
//     async (formData) => {
//       return makeRequest.post("/stories", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["stories"]);
//         toast.success("✅ Story uploaded successfully!"); // 🎉 Upload Success Toast
//       },
//       onError: () => {
//         toast.error("❌ Failed to upload story. Please try again.");
//       },
//     }
//   );

//   // ✅ Delete Story Mutation
//   const deleteMutation = useMutation(
//     async (storyId) => {
//       return makeRequest.delete(`/stories/${storyId}`);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["stories"]);
//         toast.success("✅ Story deleted successfully!"); // 🎉 Delete Success Toast
//       },
//       onError: () => {
//         toast.error("❌ Failed to delete story. Try again.");
//       },
//     }
//   );

//   // ✅ Handle Story Upload
//   const handleStoryUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       // ✅ Upload story
//       await addMutation.mutateAsync(formData);
//     } catch (err) {
//       console.error("❌ Error uploading story:", err);
//       toast.error("❌ Error uploading story. Try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✅ Handle Story Deletion with Confirmation Toast
//   const handleDeleteStory = async (storyId) => {
//     toast.info(
//       <div>
//         <p>🗑️ Are you sure you want to delete this story?</p>
//         <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//           <button
//             onClick={() => {
//               deleteMutation.mutate(storyId);
//               toast.dismiss(); // ✅ Close toast after confirmation
//             }}
//             style={{
//               backgroundColor: "#ff4d4d",
//               color: "white",
//               border: "none",
//               padding: "5px 10px",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Yes
//           </button>
//           <button
//             onClick={() => toast.dismiss()} // ❌ Cancel Toast
//             style={{
//               backgroundColor: "#4caf50",
//               color: "white",
//               border: "none",
//               padding: "5px 10px",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             No
//           </button>
//         </div>
//       </div>,
//       {
//         position: "top-center",
//         autoClose: false,
//         closeOnClick: false,
//         draggable: false,
//         closeButton: false,
//       }
//     );
//   };

//   return (
//     <div className="stories">
//       {/* ✅ Upload New Story */}
//       <div
//         className="story upload-story"
//         onClick={() => fileInputRef.current.click()}
//       >
//         <img
//           src={
//             currentUser.profilePic
//               //? `/upload/${currentUser.profilePic}`
//               // : "/default-avatar.png"
//           }
//           alt="profile"
//         />
//         <span>{currentUser.name}</span>
//         <button className="plus-btn">+</button>
//       </div>

//       {/* ✅ Hidden File Input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         accept="image/*, video/*"
//         onChange={handleStoryUpload}
//         style={{ display: "none" }}
//       />

//       {uploading && <p>Uploading...</p>}

//       {/* ✅ Display Stories in a Swiper */}
//       {error ? (
//         <p>Something went wrong!</p>
//       ) : isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <Swiper
//           spaceBetween={10}
//           slidesPerView="auto"
//           navigation
//           modules={[Navigation]}
//           className="swiper-container"
//         >
//           {/* ✅ Show User Stories */}
//           {data?.map((story) => (
//             <SwiperSlide key={story.id} className="story-slide">
//               {story.img.endsWith(".mp4") ? (
//                 <video controls className="story-media">
//                   <source src={story.img} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               ) : (
//                 <img src={story.img} alt="story" className="story-media" />
//               )}
//               <span>{story.name}</span>

//               {/* ✅ Show Delete Button for User's Own Story */}
//               {story.userId === currentUser.id && (
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDeleteStory(story.id)}
//                 >
//                   ❌
//                 </button>
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
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
import { toast } from "react-toastify";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const storiesContainerRef = useRef(null); // ✅ Ref for scrolling
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
        toast.success("✅ Story uploaded successfully!");
      },
      onError: () => {
        toast.error("❌ Failed to upload story. Please try again.");
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
        toast.success("✅ Story deleted successfully!");
      },
      onError: () => {
        toast.error("❌ Failed to delete story. Try again.");
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
      toast.error("❌ Error uploading story. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle Story Deletion with Confirmation Toast
  const handleDeleteStory = async (storyId) => {
    toast.info(
      <div>
        <p>🗑️ Are you sure you want to delete this story?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => {
              deleteMutation.mutate(storyId);
              toast.dismiss();
            }}
            style={{
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  // ✅ Scroll Stories Left/Right
  const scrollLeft = () => {
    storiesContainerRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    storiesContainerRef.current.scrollLeft += 300;
  };

  return (
    <div className="stories-wrapper" style={{ position: "relative" }}>
      {/* ✅ Scroll Buttons */}
      <button className="scroll-btn left" onClick={scrollLeft}>
        {"<"}
      </button>
      <button className="scroll-btn right" onClick={scrollRight}>
        {">"}
      </button>

      <div className="stories" ref={storiesContainerRef}>
        {/* ✅ Upload New Story */}
        <div
          className="story upload-story"
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={
              currentUser.profilePic ||
              "/default-avatar.png"
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

        {/* ✅ Display Stories */}
        {error ? (
          <p>Something went wrong!</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data?.map((story) => (
              <div key={story.id} className="story-slide">
                {story.img.endsWith(".mp4") ? (
                  <video controls className="story-media">
                    <source src={story.img} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={story.img} alt="story" className="story-media" />
                )}
                <span>{story.name}</span>

                {story.userId === currentUser.id && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteStory(story.id)}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Stories;





