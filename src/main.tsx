import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Outlet } from 'react-router'
import './index.css'
import App from './App.tsx'
import UserList from './pages/UserList.tsx'
import Header from './pages/Navbar.tsx'
import User from './pages/User.tsx'
import RecipeDetail from './pages/RecipeDetail.tsx'
import Login from './pages/Login.tsx'
import Profile from './pages/Profile.tsx'
import NotFound from './pages/NotFound.tsx'

const Layout = () => (
    <>
        <Header />
        <Outlet />
    </>
)

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <App/>
            },
            {
                path: '/userList',
                element: <UserList/>
            },
            {
                path: '/user/:id',
                element: <User/>
            },
            {
                path: '/recipe/:id',
                element: <RecipeDetail/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/profile',
                element: <Profile/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
