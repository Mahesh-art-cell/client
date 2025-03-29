// import Stories from "../../components/stories/Stories"
// import Posts from "../../components/posts/Posts"
// import Share from "../../components/share/Share"
// import "./home.css"

// const Home = () => {
//   return (
//     <div className="home">
//       <Stories/>
//       <Share/>
//       <Posts/>
//     </div>
//   )
// }

// export default Home



import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import { useSearch } from "../../context/SearchContext"; // ✅ Import Search Context
import "./home.css";

const Home = () => {
  const { searchResults } = useSearch(); // ✅ Get Search Results

  return (
    <div className="home">
      <Stories />
      <Share />
      {/* ✅ Show Search Results If Available */}
      {searchResults.length > 0 ? (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((user) => (
              <li key={user.id} className="search-item">
                <img src={user.profilePic || "/default-avatar.png"} alt={user.username} />
                <div className="info">
                  <span className="username">{user.username}</span>
                  <button className="follow-btn">Follow</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Posts />
      )}
    </div>
  );
};

export default Home;
