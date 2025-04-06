// import Stories from "../../components/stories/Stories"
// import Posts from "../../components/posts/Posts"
// import Share from "../../components/share/Share"
// import "./home.css"
// import LeftBar from "../../components/leftBar/LeftBar"

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
import LeftBar from "../../components/leftBar/LeftBar";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        {/* <LeftBar /> */}
        <div className="mainContent">
          <Stories />
          <Share />
          <Posts />
        </div>
      </div>  
    </div>
  );
};

export default Home;
