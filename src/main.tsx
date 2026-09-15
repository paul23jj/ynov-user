import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Outlet } from 'react-router'
import './index.css'
import App from './App.tsx'
import UserList from './pages/UserList.tsx'
import Header from './pages/Navbar.tsx'
import User from './pages/User.tsx'

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
                path: '/user/:username',
                element: <User/>
            }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
