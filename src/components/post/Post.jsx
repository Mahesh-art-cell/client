
import "./post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext, useEffect } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify"; // ✅ Import toast from react-toastify

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
  const { isLoading, data } = useQuery(["likes", post._id], async () => {
    try {
      const res = await makeRequest.get(`/likes?postId=${post._id}`);
      console.log("✅ Likes fetched:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Error fetching likes:", err);
      throw new Error("Failed to load likes");
    }
  });

  // ✅ Update Like Count When Data is Available
  useEffect(() => {
    // console.log(post._id)
    if (data) {
      setLikeCount(data.length);
      setLiked(data.includes(currentUser.id));
    }
  }, [data, currentUser.id]);

  // ✅ Define Mutation for Like/Unlike
  const likeMutation = useMutation(
    (liked) => {
      if (liked) {
        return makeRequest.delete(`/likes?postId=${post._id}`);
      } else {
        return makeRequest.post("/likes", { postId: post._id });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes", post._id]);
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
    likeMutation.mutate(liked);
  };

  // ✅ Delete Post Mutation
  const deleteMutation = useMutation(
    async () => {
      return makeRequest.delete(`/posts/${post._id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("✅ Post deleted successfully!"); // ✅ Success Toast
      },
      onError: () => {
        toast.error("❌ Failed to delete post. Try again!"); // ❌ Error Toast
      },
    }
  );
console.log(currentUser.profilePic)
console.log(post.userId._id)
console.log(currentUser.id)
console.log(post.userId.profilePic)
  // ✅ Handle Post Deletion with Confirmation
  const handleDeletePost = () => {
    toast.info(
      <div>
        <p>🗑️ Are you sure you want to delete this post?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => {
              deleteMutation.mutate();
              toast.dismiss(); // ✅ Close toast after confirmation
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
            onClick={() => toast.dismiss()} // ❌ Cancel Toast
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

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={post.userId.profilePic || "/defaultProfilePic.jpg"}
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

          {/* ✅ Delete Button (Show Only for Owner of Post) */}
          {post.userId._id === currentUser.id && (
            <DeleteOutlineIcon
              className="delete-btn"
              onClick={handleDeletePost}
            />
          )}
        </div>

        {/* ✅ Post Content and Media */}
        <div className="content">
          <p className="post-text">{post.desc}</p>

          {post.img && (
            <div className="media-container">
              {isImage(post.img) ? (
                <img
                  src={post.img} // ✅ Cloudinary Image URL
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
        </div>

        {/* ✅ Like, Comment, and Share Section */}
        <div className="info">
          <div className="item" onClick={handleLike}>
            {isLoading ? (
              "Loading..."
            ) : liked ? (
              <FavoriteOutlinedIcon
                style={{ color: "red", cursor: "pointer" }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon style={{ cursor: "pointer" }} />
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
        {commentOpen && <Comments postId={post._id} />}
      </div>
    </div>
  );
};

export default Post;
