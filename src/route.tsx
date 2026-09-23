import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import App from "./App.tsx";
import UserList from "./pages/UserList.tsx";
import Header from "./pages/Navbar.tsx";
import User from "./pages/User.tsx";
import RecipeDetail from "./pages/RecipeDetail.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";
import Favoris from "./pages/Favoris.tsx";
import GuestRoute from "./routes/GuestRoute.tsx";
import PostList from "./pages/PostList.tsx";
import PostDetail from "./pages/PostDetail.tsx";

const Layout = () => (
    <>
      <Header />
      <Outlet />
    </>
);

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/recipes" replace />,
      },
      {
        path: "/recipes",
        element: <App />,
      },
      {
        path: "/favorites",
        element: <Favoris />,
      },
      {
        path: "/userList",
        element: <UserList />,
      },
      {
        path: "/user/:id",
        element: <User />,
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetail />,
      },
      {
        path: "/login",
        element: (
            <GuestRoute>
              <Login />
            </GuestRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/posts",
        element: <PostList />,
      },
      {
        path: "/posts/:id",
        element: <PostDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;