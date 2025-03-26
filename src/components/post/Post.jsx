
// import "./post.scss";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import { Link } from "react-router-dom";
// import Comments from "../comments/Comments";
// import { useState, useContext } from "react";
// import moment from "moment";
// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { AuthContext } from "../../context/authContext";

// // ✅ Function to Check File Type
// const isImage = (url) => {
//   return /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);
// };

// const isVideo = (url) => {
//   return /\.(mp4|webm|ogg|avi|mov)$/i.test(url);
// };

// const Post = ({ post }) => {
//   const [commentOpen, setCommentOpen] = useState(false);
//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   // ✅ Fetch Likes
//   const { isLoading, data } = useQuery(["likes", post.id], async () => {
//     try {
//       const res = await makeRequest.get(`/likes?postId=${post.id}`);
//       return res.data;
//     } catch (err) {
//       console.error("❌ Error fetching likes:", err);
//       throw new Error("Failed to load likes");
//     }
//   });

//   // ✅ Define Mutation for Like/Unlike
//   const mutation = useMutation(
//     (liked) => {
//       if (liked) {
//         return makeRequest.delete(`/likes?postId=${post.id}`);
//       } else {
//         return makeRequest.post("/likes", { postId: post.id });
//       }
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["likes", post.id]);
//       },
//     }
//   );

//   // ✅ Handle Like Click
//   const handleLike = () => {
//     const liked = data?.includes(currentUser.id);
//     mutation.mutate(liked);
//   };

//   return (
//     <div className="post">
//       <div className="container">
//         <div className="user">
//           <div className="userInfo">
//             <img
//               src={post.profilePic || "/defaultProfilePic.jpg"}
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
//         </div>

//         {/* ✅ Display Media Content from Cloudinary (img column) */}
//         {post.img && (
//           <div className="media-container">
//             {isImage(post.img) ? (
//               <img
//                 src={post.img} // ✅ Direct Cloudinary URL
//                 alt="Post Media"
//                 className="post-image"
//               />
//             ) : isVideo(post.img) ? (
//               <video width="100%" controls>
//                 <source src={post.img} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             ) : null}
//           </div>
//         )}

//         {/* ✅ Like and Comment Section */}
//         <div className="info">
//           <div className="item">
//             {isLoading ? (
//               "Loading..."
//             ) : data?.includes(currentUser.id) ? (
//               <FavoriteOutlinedIcon
//                 style={{ color: "red" }}
//                 onClick={handleLike}
//               />
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

//         {/* ✅ Comments Section */}
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
import { useState, useContext, useEffect } from "react";
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

  // ✅ State to Store Like Count Locally
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // ✅ Fetch Likes
  const { isLoading, data } = useQuery(["likes", post.id], async () => {
    try {
      const res = await makeRequest.get(`/likes?postId=${post.id}`);
      console.log("✅ Likes fetched:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Error fetching likes:", err);
      throw new Error("Failed to load likes");
    }
  });

  // ✅ Update Like Count When Data is Available
  useEffect(() => {
    if (data) {
      setLikeCount(data.length);
      setLiked(data.includes(currentUser.id));
    }
  }, [data, currentUser.id]);

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
    const newLiked = !liked;
    setLiked(newLiked);

    // ✅ Update Local Like Count
    if (newLiked) {
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount((prev) => prev - 1);
    }

    // ✅ Mutate to Update Backend
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
            ) : liked ? (
              <FavoriteOutlinedIcon
                style={{ color: "red", cursor: "pointer" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={handleLike}
              />
            )}
            {likeCount} Likes
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
