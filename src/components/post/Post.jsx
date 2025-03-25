
// import "./post.scss";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { Link } from "react-router-dom";
// import Comments from "../comments/Comments";
// import { useState, useContext } from "react";
// import moment from "moment";
// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { AuthContext } from "../../context/authContext";

// const Post = ({ post }) => {
//   const [commentOpen, setCommentOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { currentUser } = useContext(AuthContext);

//   // Fetch likes data
//   const { isLoading, error, data } = useQuery(["likes", post.id], () =>
//     makeRequest.get("/likes?postId=" + post.id).then((res) => res.data)
//   );

//   if (error) {
//     console.error("Error fetching likes:", error);
//   }

//   const queryClient = useQueryClient();

//   // Like/Unlike mutation
//   const mutation = useMutation(
//     (liked) => {
//       if (liked) return makeRequest.delete("/likes?postId=" + post.id);
//       return makeRequest.post("/likes", { postId: post.id });
//     },
//     {
//       onSuccess: () => {
//         queryClient.setQueryData(["likes", post.id], (oldData) => {
//           if (!oldData) return [];
//           return oldData.includes(currentUser.id)
//             ? oldData.filter((id) => id !== currentUser.id)
//             : [...oldData, currentUser.id];
//         });
//       },
//     }
//   );

//   // Delete post mutation
//   const deleteMutation = useMutation(
//     (postId) => makeRequest.delete("/posts/" + postId),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["posts"]);
//       },
//     }
//   );

//   const handleLike = () => {
//     mutation.mutate(data?.includes(currentUser.id) ?? false);
//   };

//   const handleDelete = () => {
//     deleteMutation.mutate(post.id);
//   };

//   return (
//     <div className="post">
//       <div className="container">
//         <div className="user">
//           <div className="userInfo">
//             <img
//               src={post.profilePic ? `/upload/${post.profilePic}` : "/defaultProfilePic.jpg"}
//               alt="Profile"
//             />
//             <div className="details">
//               <Link
//                 to={`/profile/${post.userId}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <span className="name">{post.name}</span>
//               </Link>
//               <span className="date">{moment(post.createdAt).fromNow()}</span>
//             </div>
//           </div>
//           <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
//           {menuOpen && post.userId === currentUser.id && (
//             <button className="delete-btn" onClick={handleDelete}>Delete</button>
//           )}
//         </div>
//         <div className="content">
//           <p>{post.desc}</p>
//           {post.img && (
//             <img
//               src={post.img ? `/upload/${post.img}` : "/defaultPostImage.jpg"}
//               alt="Post"
//             />
//           )}
//         </div>
//         <div className="info">
//           <div className="item">
//             {isLoading ? (
//               "Loading..."
//             ) : data?.includes(currentUser.id) ? (
//               <FavoriteOutlinedIcon style={{ color: "red" }} onClick={handleLike} />
//             ) : (
//               <FavoriteBorderOutlinedIcon onClick={handleLike} />
//             )}
//             {data?.length || 0} Likes
//           </div>
//           <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
//             <TextsmsOutlinedIcon />
//             See Comments
//           </div>
//           <div className="item">
//             <ShareOutlinedIcon />
//             Share
//           </div>
//         </div>
//         {commentOpen && <Comments postId={post.id} />}
//       </div>
//     </div>
//   );
// };

// export default Post;




import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

// ✅ Function to Check File Type
const isImage = (url) => {
  return /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);
};

const isVideo = (url) => {
  return /\.(mp4|webm|ogg|avi|mov)$/i.test(url);
};

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Fetch Likes
  const { isLoading, data } = useQuery(["likes", post.id], async () => {
    try {
      const res = await makeRequest.get(`/likes?postId=${post.id}`);
      return res.data;
    } catch (err) {
      console.error("❌ Error fetching likes:", err);
      throw new Error("Failed to load likes");
    }
  });

  // ✅ Define Mutation for Like/Unlike
  const mutation = useMutation(
    (liked) => {
      if (liked) {
        return makeRequest.delete(`/likes?postId=${post.id}`);
      } else {
        return makeRequest.post("/likes", { postId: post.id });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes", post.id]);
      },
    }
  );

  // ✅ Handle Like Click
  const handleLike = () => {
    const liked = data?.includes(currentUser.id);
    mutation.mutate(liked);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={post.profilePic || "/defaultProfilePic.jpg"}
              alt="Profile"
            />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>

        {/* ✅ Display Media Content from Cloudinary (img column) */}
        {post.img && (
          <div className="media-container">
            {isImage(post.img) ? (
              <img
                src={post.img} // ✅ Direct Cloudinary URL
                alt="Post Media"
                className="post-image"
              />
            ) : isVideo(post.img) ? (
              <video width="100%" controls>
                <source src={post.img} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        )}

        {/* ✅ Like and Comment Section */}
        <div className="info">
          <div className="item">
            {isLoading ? (
              "Loading..."
            ) : data?.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length || 0} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>

        {/* ✅ Comments Section */}
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
