
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Posts = ({ userId }) => {
  const { currentUser } = useContext(AuthContext);

  // ✅ Fetch Posts Dynamically
  const { isLoading, error, data } = useQuery(["posts", userId], async () => {
    try {
      const endpoint = userId
        ? `/posts?userId=${userId}` // ✅ Fetch posts for a specific user
        : `/posts`; // ✅ Fetch all posts
      const res = await makeRequest.get(endpoint);
      return res.data;
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
      throw new Error(err.response?.data?.message || "Failed to load posts");
    }
  });

  // ✅ UI Return
  return (
    <div className="posts">
      {isLoading ? (
        <div className="loading">Loading posts...</div>
      ) : error ? (
        <div className="error">Error loading posts: {error.message}</div>
      ) : (
        data?.map((post) => <Post post={post} key={post.id} />)
      )}
    </div>
  );
};

export default Posts;
