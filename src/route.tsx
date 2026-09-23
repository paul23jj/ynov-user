import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import App from "./App.tsx";
import Favoris from "./pages/Favoris.tsx";
import Login from "./pages/Login.tsx";
import Header from "./pages/Navbar.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/Profile.tsx";
import RecipeDetail from "./pages/RecipeDetail.tsx";
import User from "./pages/User.tsx";
import UserList from "./pages/UserList.tsx";
import GuestRoute from "./routes/GuestRoute.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";

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
        path: "/favoris",
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
        path: "/login",
        element: (
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
