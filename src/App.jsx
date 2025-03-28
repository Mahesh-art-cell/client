

// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./components/navBar/Navbar";
// import LeftBar from "./components/leftBar/LeftBar";
// import RightBar from "./components/rightBar/RightBar";
// import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
// import MediaList from "./components/media/MediaList";
// import Friends from "./pages/friends/Friends"; // ✅ Import Friends Page
// import "./style.css";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/authContext";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// function App() {
//   const { currentUser } = useContext(AuthContext);
//   const { darkMode } = useContext(DarkModeContext);
//   const queryClient = new QueryClient();

//   // ✅ Layout Wrapper
//   const Layout = () => (
//     <QueryClientProvider client={queryClient}>
//       <div className={`theme-${darkMode ? "dark" : "light"}`}>
//         <Navbar />
//         <div style={{ display: "flex" }}>
//           <LeftBar />
//           <div style={{ flex: 6 }}>
//             <Outlet />
//           </div>
//           <RightBar />
//         </div>
//       </div>
//     </QueryClientProvider>
//   );

//   // ✅ Protected Route Wrapper
//   const ProtectedRoute = ({ children }) => {
//     if (!currentUser) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   // ✅ Define Routes
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <ProtectedRoute>
//           <Layout />
//         </ProtectedRoute>
//       ),
//       children: [
//         { path: "/", element: <Home /> },
//         { path: "/profile/:id", element: <Profile /> },
//         { path: "/media", element: <MediaList /> },
//         { path: "/friends", element: <Friends /> }, // ✅ Friends Page Route Added
//       ],
//     },
//     { path: "/login", element: <Login /> },
//     { path: "/register", element: <Register /> },
//     { path: "*", element: <Navigate to="/" /> }, // ✅ Handle invalid routes
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;



// 📌 src/App.jsx
import { useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/navBar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import MediaList from "./components/media/MediaList";
import Friends from "./pages/friends/Friends";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/authContext";
import { DarkModeContext } from "./context/darkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  // ✅ Layout Wrapper
  const Layout = () => (
    <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    </QueryClientProvider>
  );

  // ✅ Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // ✅ Define Routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/media", element: <MediaList /> },
        { path: "/friends", element: <Friends /> }, // ✅ Friends Page Route
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/" /> }, // ✅ Handle invalid routes
  ]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
