import { Outlet } from "react-router";
<<<<<<< HEAD

=======
import { Navigate } from "react-router-dom";
>>>>>>> spike
import App from "./App.tsx";
import Favoris from "./pages/favoris.tsx";
import Login from "./pages/Login.tsx";
import Header from "./pages/Navbar.tsx";
import NotFound from "./pages/NotFound.tsx";
<<<<<<< HEAD

=======
import Profile from "./pages/Profile.tsx";
import RecipeDetail from "./pages/RecipeDetail.tsx";
import User from "./pages/User.tsx";
import UserList from "./pages/UserList.tsx";
>>>>>>> spike
import GuestRoute from "./routes/GuestRoute.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const routes = [
<<<<<<< HEAD
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
=======
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
>>>>>>> spike
];

export default routes;
