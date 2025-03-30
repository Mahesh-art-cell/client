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
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Stories />
      <Share />
      {/* ✅ Show All Posts for All Users */}
      <Posts userId={null} />
    </div>
  );
};

export default Home;
