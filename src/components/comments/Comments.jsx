

// import { useContext, useEffect, useState } from "react";
// import "./comments.css";
// import { AuthContext } from "../../context/authContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import moment from "moment";

// const Comments = ({ postId }) => {
//   const [desc, setDesc] = useState("");
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   const { isLoading, error, data:comments } = useQuery(
//     ["comments", postId],
//     () => makeRequest.get(`/comments?postId=${postId}`).then((res) => res.data),
//     {
//       enabled: !!postId,
//     }
//   );


//   const addMutation = useMutation(
//     (newComment) => makeRequest.post("/comments", newComment),
//     {
//       onSuccess: () => queryClient.invalidateQueries(["comments", postId]),
//     }
//   );
//   useEffect(()=>{
//     // console.log(comment)
//     console.log(comments)

//   },[comments])

//   const deleteMutation = useMutation(
//     (commentId) => makeRequest.delete(`/comments/${commentId}`),
//     {
//       onSuccess: () => queryClient.invalidateQueries(["comments", postId]),
//     }
//   );

//   const handleClick = async (e) => {
//     e.preventDefault();
//     if (desc.trim() === "") {
//       alert("⚠️ Comment cannot be empty!");
//       return;
//     }
//     addMutation.mutate({ desc, postId });
//     setDesc("");
//   };
//   const handleDelete = (commentId) => {
//     console.log(commentId)
//     if (window.confirm("Are you sure you want to delete this comment?")) {
//       deleteMutation.mutate(commentId);
//     }
//   };

//   if (!postId) {
//     return <div className="comments"><p>⚠️ No Post ID provided.</p></div>;
//   }

//   return (
//     <div className="comments">
//       {/* ✅ Write Comment */}
//       <div className="write">
//         <img src={currentUser.profilePic || "/default-avatar.png"} alt="user" />
//         <input
//           type="text"
//           placeholder="Write a comment"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//         />
//         <button onClick={handleClick}>Send</button>
//       </div>

//       {/* ✅ Comment List */}
//       {error ? (
//         <p>❌ Something went wrong</p>
//       ) : isLoading ? (
//         <p>Loading comments...</p>
//       ) : comments?.length === 0 ? (
//         <div className="empty">No comments yet.</div>
//       ) : (
//         comments.map((comment) => (
//           <div className="comment" key={comment.id}>
//             <img src={comment.profilePic || "/default-avatar.png"} alt="profile" />
//             <div className="info">
//               <span>{comment.name}</span>
//               <p>{comment.description}</p>
//               <span className="date">{moment(comment.createdAt).fromNow()}</span>
//             </div>
//             {comment.userId._id === currentUser?.id && (
//               <button className="deleteBtn" onClick={() => handleDelete(comment._id)}>
//                 Delete
//               </button>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Comments;




import { useContext, useEffect, useState } from "react";
import "./comments.css";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Fetch Comments
  const { isLoading, error, data: comments } = useQuery(
    ["comments", postId],
    () => makeRequest.get(`/comments?postId=${postId}`).then((res) => res.data),
    {
      enabled: !!postId,
    }
  );

  useEffect(() => {
    console.log("📥 Comments fetched:", comments);
  }, [comments]);

  // ✅ Add Comment
  const addMutation = useMutation(
    (newComment) => {
      console.log("📝 Adding comment:", newComment);
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        console.log("✅ Comment added successfully");
        queryClient.invalidateQueries(["comments", postId]);
      },
      onError: (err) => {
        console.error("❌ Failed to add comment:", err.response?.data || err.message);
      }
    }
  );

  // ✅ Delete Comment
  const deleteMutation = useMutation(
    (commentId) => {
      console.log("🗑️ Deleting comment:", commentId);
      return makeRequest.delete(`/comments/${commentId}`);
    },
    {
      onSuccess: () => {
        console.log("✅ Comment deleted");
        queryClient.invalidateQueries(["comments", postId]);
      },
      onError: (err) => {
        console.error("❌ Failed to delete comment:", err.response?.data || err.message);
      }
    }
  );

  // ✅ Handle Comment Submit
  const handleClick = async (e) => {
    e.preventDefault();
    if (desc.trim() === "") {
      alert("⚠️ Comment cannot be empty!");
      return;
    }
    addMutation.mutate({ desc, postId });
    setDesc("");
  };

  // ✅ Handle Comment Delete
  const handleDelete = (commentId) => {
    console.log("🗑️ Attempting to delete comment ID:", commentId);
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteMutation.mutate(commentId);
    }
  };

  if (!postId) {
    return <div className="comments"><p>⚠️ No Post ID provided.</p></div>;
  }

  return (
    <div className="comments">
      {/* ✅ Write Comment */}
      <div className="write">
        <img src={currentUser.profilePic || "/default-avatar.png"} alt="user" />
        <input
          type="text"
          placeholder="Write a comment"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
            console.log("✍️ Writing comment:", e.target.value);
          }}
        />
        <button onClick={handleClick}>Send</button>
      </div>

      {/* ✅ Comment List */}
      {error ? (
        <p>❌ Something went wrong</p>
      ) : isLoading ? (
        <p>Loading comments...</p>
      ) : comments?.length === 0 ? (
        <div className="empty">No comments yet.</div>
      ) : (
        comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <img src={comment.userId.profilePic || "/default-avatar.png"} alt="profile" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.description}</p>
              <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>

            {/* ✅ Show delete button only if comment belongs to current user */}
            {comment.userId?._id === currentUser?.id && (
              <button className="deleteBtn" onClick={() => handleDelete(comment._id)}>
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
