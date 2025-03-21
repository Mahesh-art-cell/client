import React, { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import "./mediaList.scss";

const MediaList = () => {
  const [media, setMedia] = useState([]);

  // ✅ Fetch Media on Component Mount
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await makeRequest.get("/media");
        setMedia(res.data);
      } catch (error) {
        console.error("❌ Error fetching media:", error);
      }
    };
    fetchMedia();
  }, []);

  return (
    <div className="media-list">
      <h2>Uploaded Media</h2>
      <div className="media-container">
        {media.map((item) => (
          <div key={item.id} className="media-item">
            {item.type === "image" ? (
              <img src={item.url} alt="Uploaded Media" className="media-img" />
            ) : (
              <video width="200" controls>
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaList;
