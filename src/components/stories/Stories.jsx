
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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { toast } from "react-toastify";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [viewingStory, setViewingStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const queryClient = useQueryClient();

  // Fetch Stories
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => res.data)
  );

  // Add Story Mutation
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

  // Delete Story Mutation
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

  // Handle Story Upload
  const handleStoryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await addMutation.mutateAsync(formData);
    } catch (err) {
      console.error("❌ Error uploading story:", err);
      toast.error("❌ Error uploading story. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle Story Deletion with Confirmation Toast
  const handleDeleteStory = async (storyId, e) => {
    e.stopPropagation(); // Prevent opening the story view
    
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

  // Open Story View
  const openStoryView = (index) => {
    setCurrentStoryIndex(index);
    setViewingStory(data[index]);
  };

  // Go to next story
  const goToNextStory = (e) => {
    e.stopPropagation();
    if (currentStoryIndex < data.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setViewingStory(data[currentStoryIndex + 1]);
    } else {
      closeStoryView();
    }
  };

  // Go to previous story
  const goToPrevStory = (e) => {
    e.stopPropagation();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setViewingStory(data[currentStoryIndex - 1]);
    }
  };

  // Close story view
  const closeStoryView = () => {
    setViewingStory(null);
  };

  // Calculate the number of slides to show based on viewport width
  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 7; // Default for SSR
    const width = window.innerWidth;
    if (width < 480) return 3;
    if (width < 768) return 5;
    if (width < 1024) return 7;
    return 10;
  };

  // Need to show all stories or at least a number higher than what we have
  const slidesToShow = data?.length > 10 ? data.length : 10;

  return (
    <div className="stories-container">
      <div className="stories-wrapper">
        {/* Upload New Story */}
        <div
          className="story upload-story"
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={currentUser.profilePic}
            alt="profile"
          />
          <span>{currentUser.name}</span>
          <button className="plus-btn">+</button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*, video/*"
          onChange={handleStoryUpload}
          style={{ display: "none" }}
        />

        {uploading && <p className="upload-status">Uploading...</p>}

        {/* Display Stories in a horizontally scrollable container */}
        {error ? (
          <p className="error-message">Something went wrong!</p>
        ) : isLoading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          <div className="stories-carousel">
            {/* We're switching from Swiper to a simple scrollable container */}
            <div className="stories-scroll-container">
              {data?.map((story, index) => (
                <div 
                  key={story.id} 
                  className="story-slide"
                  onClick={() => openStoryView(index)}
                >
                  {story.img.endsWith(".mp4") ? (
                    <video className="story-media" muted>
                      <source src={story.img} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={story.img} alt="story" className="story-media" />
                  )}
                  <span>{story.name}</span>

                  {/* Show Delete Button for User's Own Story */}
                  {story.userId === currentUser.id && (
                    <button
                      className="delete-btn"
                      onClick={(e) => handleDeleteStory(story.id, e)}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full Story View Modal */}
      {viewingStory && (
        <div className="story-view-overlay" onClick={closeStoryView}>
          <div className="story-view-container" onClick={(e) => e.stopPropagation()}>
            <div className="story-view-header">
              <div className="story-user-info">
                <img 
                  src={currentUser.profilePic} 
                  alt="User" 
                  className="story-user-pic"
                />
                <span>{viewingStory.name}</span>
              </div>
              <button className="close-btn" onClick={closeStoryView}>×</button>
            </div>
            
            <div className="story-content">
              {viewingStory.img.endsWith(".mp4") ? (
                <video controls autoPlay className="story-view-media">
                  <source src={viewingStory.img} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src={viewingStory.img} 
                  alt="story" 
                  className="story-view-media"
                />
              )}
              
              {/* Navigation buttons */}
              <button 
                className="story-nav-btn prev-btn" 
                onClick={goToPrevStory}
                style={{ display: currentStoryIndex > 0 ? 'block' : 'none' }}
              >
                ◀
              </button>
              <button 
                className="story-nav-btn next-btn" 
                onClick={goToNextStory}
              >
                ▶
              </button>
            </div>
            
            {/* Story progress indicator */}
            <div className="story-progress-container">
              {data?.map((story, idx) => (
                <div 
                  key={idx} 
                  className={`story-progress-bar ${idx === currentStoryIndex ? 'active' : idx < currentStoryIndex ? 'viewed' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;

