// import { useContext, useState } from "react";
// import "./comments.scss";
// import { AuthContext } from "../../context/authContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import moment from "moment";

// const Comments = ({ postId }) => {
//   const [desc, setDesc] = useState("");
//   const { currentUser } = useContext(AuthContext);

//   const { isLoading, error, data } = useQuery(["comments"], () =>
//     makeRequest.get("/comments?postId=" + postId).then((res) => {
//       return res.data;
//     })
//   );

//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     (newComment) => {
//       return makeRequest.post("/comments", newComment);
//     },
//     {
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["comments"]);
//       },
//     }
//   );

//   const handleClick = async (e) => {
//     e.preventDefault();
//     mutation.mutate({ desc, postId });
//     setDesc("");
//   };

//   return (
//     <div className="comments">
//       <div className="write">
//         <img src={"/upload/" + currentUser.profilePic} alt="" />
//         <input
//           type="text"
//           placeholder="write a comment"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//         />
//         <button onClick={handleClick}>Send</button>
//       </div>
//       {error
//         ? "Something went wrong"
//         : isLoading
//         ? "loading"
//         : data.map((comment) => (
//             <div className="comment">
//               <img src={"/upload/" + comment.profilePic} alt="" />
//               <div className="info">
//                 <span>{comment.name}</span>
//                 <p>{comment.desc}</p>
//               </div>
//               <span className="date">
//                 {moment(comment.createdAt).fromNow()}
//               </span>
//             </div>
//           ))}
//     </div>
//   );
// };

// export default Comments;



import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  // ✅ Fetch Comments API
  const { isLoading, error, data } = useQuery(["comments", postId], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  // ✅ Add Comment API
  const addMutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", postId]);
      },
    }
  );

  // ✅ Delete Comment API
  const deleteMutation = useMutation(
    (commentId) => {
      return makeRequest.delete(`/comments/${commentId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", postId]);
      },
    }
  );

  // ✅ Handle Add Comment
  const handleClick = async (e) => {
    e.preventDefault();
    if (desc.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }
    addMutation.mutate({ desc, postId });
    setDesc("");
  };

  // ✅ Handle Delete Comment
  const handleDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteMutation.mutate(commentId);
    }
  };

  return (
    <div className="comments">
      {/* ✅ Write Comment Section */}
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>

      {/* ✅ Show Comments */}
      {error ? (
        "Something went wrong"
      ) : isLoading ? (
        "Loading..."
      ) : (
        data.map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={"/upload/" + comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.description}</p> {/* ✅ Fixed to use 'description' */}
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>

            {/* ✅ Show Delete Button if Comment Owner */}
            {comment.userId === currentUser.id && (
              <button
                className="deleteBtn"
                onClick={() => handleDelete(comment.id)}
              >
                ❌ Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
