// import { useContext } from "react";
// import "./stories.scss";
// import { AuthContext } from "../../context/authContext";
// import { useQuery } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";

// const Stories = () => {
//   const { currentUser } = useContext(AuthContext);

//   const { isLoading, error, data } = useQuery(["stories"], () =>
//     makeRequest.get("/stories").then((res) => {
//       return res.data;
//     })
//   );

//   //TODO Add story using react-query mutations and use upload function.

//   return (
//     <div className="stories">
//       <div className="story">
//         <img src={"/upload/" + currentUser.profilePic} alt="" />
//         <span>{currentUser.name}</span>
//         <button>+</button>
//       </div>
//       {error
//         ? "Something went wrong"
//         : isLoading
//         ? "loading"
//         : data.map((story) => (
//             <div className="story" key={story.id}>
//               <img src={story.img} alt="" />
//               <span>{story.name}</span>
//             </div>
//           ))}
//     </div>
//   );
// };

// export default Stories;



import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  // Ensure the request is only made if currentUser exists
  const { isLoading, error, data } = useQuery(["stories"], async () => {
    if (!currentUser) throw new Error("User not authenticated");
    return makeRequest.get("/stories").then((res) => res.data);
  });

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : "/default-avatar.png"} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading..."
        : data.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;
