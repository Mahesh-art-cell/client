import "./details.css";
import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const { user } = location.state || {};

  if (!user) {
    return <div className="error">❌ No user found!</div>;
  }

  return (
    <div className="details-container">
      <div className="details-card">
        <img
          src={user.profilePic || "/default-avatar.png"}
          alt={user.username}
          className="details-pic"
        />
        <h2 className="details-name">{user.username}</h2>
        <p className="details-info">
          <strong>Email:</strong> {user.email || "Not available"}
        </p>
        <p className="details-info">
          <strong>Location:</strong> {user.location || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default Details;
