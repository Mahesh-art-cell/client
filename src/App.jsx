

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
// import "./style.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/authContext";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// function App() {
//   // ✅ Get user & dark mode context
//   const { currentUser } = useContext(AuthContext);
//   const { darkMode } = useContext(DarkModeContext);

//   // ✅ Create a Query Client for React Query
//   const queryClient = new QueryClient();

//   // ✅ Layout with Navbar, LeftBar, RightBar, and Outlet for children
//   const Layout = () => {
//     return (
//       <QueryClientProvider client={queryClient}>
//         <div className={`theme-${darkMode ? "dark" : "light"}`}>
//           <Navbar />
//           <div style={{ display: "flex" }}>
//             <LeftBar />
//             <div style={{ flex: 6 }}>
//               <Outlet />
//             </div>
//             <RightBar />
//           </div>
//         </div>
//       </QueryClientProvider>
//     );
//   };

//   // ✅ Protect Routes - Redirect to Login if not authenticated
//   const ProtectedRoute = ({ children }) => {
//     if (!currentUser) {
//       console.log("🔒 Protected route, redirecting to /login");
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   // ✅ Router Configuration
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <ProtectedRoute>
//           <Layout />
//         </ProtectedRoute>
//       ),
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//         {
//           path: "/profile/:id",
//           element: <Profile />,
//         },
//       ],
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//     {
//       path: "/register",
//       element: <Register />,
//     },
//     {
//       path: "*", // ✅ Fallback route to redirect invalid paths
//       element: <Navigate to="/" />,
//     },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;



import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { DarkModeContext } from "./context/darkModeContext";

// Components
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Share from "./components/share/Share";
import Posts from "./components/posts/Posts";

// Pages
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

// Styles
import "./style.scss";

function App() {
  // Get user & dark mode context
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  
  // Create a Query Client for React Query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 10000, // Refetch every 10 seconds
        staleTime: 5000, // Consider data stale after 5 seconds
      }
    }
  });
  
  // Layout component with navbar, sidebars, and outlet for children
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }} className="main-content">
            <Share />
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };
  
  // Protect routes - redirect to login if not authenticated
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      console.log("🔒 Protected route, redirecting to /login");
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  
  // Router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <QueryClientProvider client={queryClient}>
            <Layout />
          </QueryClientProvider>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*", // Fallback route to redirect invalid paths
      element: <Navigate to="/" />,
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;