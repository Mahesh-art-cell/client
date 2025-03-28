
// import Post from "../post/Post";
// import "./posts.scss";
// import { useQuery } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";

// const Posts = ({ userId }) => {
//   const { currentUser } = useContext(AuthContext);

//   // ✅ Fetch Posts Dynamically
//   const { isLoading, error, data } = useQuery(["posts", userId], async () => {
//     try {
//       const endpoint = userId
//         ? `/posts?userId=${userId}` // ✅ Fetch posts for a specific user
//         : `/posts`; // ✅ Fetch all posts
//       const res = await makeRequest.get(endpoint);
//       return res.data;
//     } catch (err) {
//       console.error("❌ Error fetching posts:", err);
//       throw new Error(err.response?.data?.message || "Failed to load posts");
//     }
//   });

//   // ✅ UI Return
//   return (
//     <div className="posts">
//       {isLoading ? (
//         <div className="loading">Loading posts...</div>
//       ) : error ? (
//         <div className="error">Error loading posts: {error.message}</div>
//       ) : (
//         data?.map((post) => <Post post={post} key={post.id} />)
//       )}
//     </div>
//   );
// };

// export default Posts;




import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import Post from "../post/Post";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  // ✅ Fetch Posts - Home or Profile
  const { isLoading, error, data } = useQuery(["posts", userId], () =>
    makeRequest
      .get(`/posts?userId=${userId || ""}`)
      .then((res) => res.data)
  );

  return (
    <div className="posts">
      {isLoading
        ? "Loading..."
        : error
        ? "Error fetching posts!"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
