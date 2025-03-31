import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.css"
import LeftBar from "../../components/leftBar/LeftBar"

const Home = () => {
  return (
    <div className="home">
      <LeftBar/>
      <Stories/>
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home

