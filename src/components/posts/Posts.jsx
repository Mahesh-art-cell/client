
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


import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const { isLoading, error, data } = useQuery(
    ["posts"], 
    async () => {
      const response = await makeRequest.get("/posts");
      return response.data;
    },
    {
      refetchInterval: 10000, // Refetch every 10 seconds
      staleTime: 5000, // Consider data stale after 5 seconds
    }
  );

  if (error) {
    console.error("❌ Error fetching posts:", error);
    return <div className="error-message">Failed to load posts</div>;
  }

  return (
    <div className="posts">
      {isLoading ? (
        <div className="loading">Loading posts...</div>
      ) : data.length === 0 ? (
        <div className="no-posts">No posts yet. Share something!</div>
      ) : (
        data.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;