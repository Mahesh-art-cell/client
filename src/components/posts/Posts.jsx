
// import Post from "../post/Post";
// import "./posts.scss";
// import { useQuery } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";

// const Posts = ({ userId }) => {
//   const { currentUser } = useContext(AuthContext);
//   const validUserId = userId || currentUser?.id; // ✅ Ensure userId is never undefined

//   // ✅ Fetch posts from backend
//   const { isLoading, error, data } = useQuery(["posts", validUserId], async () => {
//     try {
//       const res = await makeRequest.get(`/posts?userId=${validUserId}`);
//       return res.data;
//     } catch (err) {
//       throw new Error(err.response?.data?.message || "Failed to fetch posts");
//     }
//   });

//   return (
//     <div className="posts">
//       {isLoading && <p>Loading posts...</p>}
//       {error && <p className="error">⚠️ {error.message}</p>}
//       {data?.length === 0 ? <p>No posts available.</p> : data?.map((post) => <Post post={post} key={post.id} />)}
//     </div>
//   );
// };

// export default Posts;


import Post from "../post/Post";
import Share from "../share/Share";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Posts = ({ userId }) => {
  const { currentUser } = useContext(AuthContext);
  // Define query key based on whether we're viewing a profile or home feed
  const queryKey = userId ? ["posts", userId] : ["posts"];

  // Fetch posts from backend
  const { isLoading, error, data } = useQuery(queryKey, async () => {
    try {
      // If userId is provided, fetch that user's posts, otherwise fetch feed
      const endpoint = userId ? `/posts?userId=${userId}` : "/posts";
      const res = await makeRequest.get(endpoint);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch posts");
    }
  });

  return (
    <div className="posts-container">
      {/* ✅ Show Share component only on home feed or own profile */}
      {(!userId || userId === currentUser?.id) && <Share />}
      
      <div className="posts">
        {isLoading ? (
          <div className="loading">Loading posts...</div>
        ) : error ? (
          <div className="error">Error: {error.message}</div>
        ) : data?.length === 0 ? (
          <div className="no-posts">No posts available.</div>
        ) : (
          data?.map((post) => <Post post={post} key={post.id} />)
        )}
      </div>
    </div>
  );
};

export default Posts;
