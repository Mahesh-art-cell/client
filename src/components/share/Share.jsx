
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Post Mutation
  const mutation = useMutation(
    async (newPost) => {
      const formData = new FormData();
      formData.append("content", newPost.content);
      if (newPost.file) {
        formData.append("file", newPost.file); // ✅ Add file if exists
      }

      const res = await makeRequest.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Auth token
        },
      });

      return res.data;
    },
    {
      onSuccess: (data) => {
        console.log("✅ Post Added Successfully:", data);
        queryClient.invalidateQueries(["posts"]); // ✅ Refetch posts after success
        setContent(""); // ✅ Clear input after sharing
        setFile(null);
      },
      onError: (error) => {
        console.error("❌ Error sharing post:", error);
        alert("Error sharing post. Please try again.");
      },
    }
  );

  // ✅ Handle Share Button
  const handleClick = async (e) => {
    e.preventDefault();

    if (!content.trim() && !file) {
      alert("Please add some content or an image before sharing.");
      return;
    }

    setUploading(true);

    mutation.mutate({
      content,
      file,
    });

    setUploading(false);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={currentUser?.profilePic || "/avatar.png"}
              alt="Profile"
            />
            <textarea
              placeholder={`What's on your mind, ${
                currentUser?.name || "User"
              }?`}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="right">
            {file && (
              <img
                className="file"
                alt="Preview"
                src={URL.createObjectURL(file)}
              />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="Add" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="Location" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="Friends" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button
              onClick={handleClick}
              disabled={mutation.isPending || uploading}
            >
              {mutation.isPending || uploading ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;



