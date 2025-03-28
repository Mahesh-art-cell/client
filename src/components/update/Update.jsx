
import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
  });

  const queryClient = useQueryClient();

  // ✅ Upload to Cloudinary via Backend API
  const mutation = useMutation(
    async (updatedUser) => {
      const formData = new FormData();
      if (profile) formData.append("profilePic", profile);
      if (cover) formData.append("coverPic", cover);

      formData.append("name", texts.name);
      formData.append("email", texts.email);
      formData.append("username", texts.username);

      return await makeRequest.put(`/users/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        setOpenUpdate(false);
      },
    }
  );

  // ✅ Handle Form Submission
  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            {/* ✅ Cover Upload */}
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : user.coverPic || "/default-cover.png"
                  }
                  alt="Cover"
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />

            {/* ✅ Profile Upload */}
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : user.profilePic || "/default-avatar.png"
                  }
                  alt="Profile"
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>

          <input
            type="text"
            placeholder="Name"
            value={texts.name}
            onChange={(e) => setTexts({ ...texts, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={texts.email}
            onChange={(e) => setTexts({ ...texts, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            value={texts.username}
            onChange={(e) => setTexts({ ...texts, username: e.target.value })}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          X
        </button>
      </div>
    </div>
  );
};

export default Update;
