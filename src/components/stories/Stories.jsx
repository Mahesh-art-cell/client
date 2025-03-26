
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
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch Stories Query
  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => res.data)
  );

  const queryClient = useQueryClient();

  // ✅ Add Story Mutation
  const addMutation = useMutation(
    async (formData) => {
      return makeRequest.post("/stories", formData);
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

      // ✅ Upload to Backend
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
    <div className="stories-container">
      {/* ✅ Single Story Upload Container */}
      <div className="story upload-story" onClick={() => fileInputRef.current.click()}>
        <img
          src={
            currentUser.profilePic
              ? `/upload/${currentUser.profilePic}`
              : "/default-avatar.png"
          }
          alt="profile"
        />
        <span>{currentUser.name}</span>
        <button>+</button>
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
      <div className="stories">
        {error
          ? "Something went wrong"
          : isLoading
          ? "Loading..."
          : data?.map((story) => (
              <div className="story" key={story.id}>
                {/* ✅ Check if the story is an image or a video */}
                {story.img.endsWith(".mp4") || story.img.endsWith(".webm") ? (
                  <video controls className="story-media">
                    <source src={story.img} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img className="story-media" src={story.img} alt="story" />
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
      </div>
    </div>
  );
};

export default Stories;
