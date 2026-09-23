import { Outlet } from "react-router";

import App from "./App.tsx";
import UserList from "./pages/UserList.tsx";
import Header from "./pages/Navbar.tsx";
import User from "./pages/User.tsx";
import RecipeDetail from "./pages/RecipeDetail.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";

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
        element: <App />,
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
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
