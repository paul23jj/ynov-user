import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store.ts'
import routes from './route.tsx'
import type { User as UserType } from './type/user'
import { setUsers } from './store/reducer/user.ts'
import axios from 'axios'
import { setLoggedUser } from './store/reducer/auth'
import { setLoading } from "./store/reducer/loading.ts";

interface UsersResponse {
    users: UserType[];
}

const getUsers = async () => {
    const url = 'https://dummyjson.com/users';
    const response = await axios.get<UsersResponse>(url);
    store.dispatch(setUsers(response.data.users))
}

const getLoggedUser = async () => {
    try {
        const url = 'https://dummyjson.com/auth/me'
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        store.dispatch(setLoggedUser(response.data))
    } catch (e) {
        localStorage.removeItem('token')
        store.dispatch(setLoggedUser(null))
    }
}

Promise.all([getUsers(), getLoggedUser()]).finally(() => store.dispatch(setLoading(false)))

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)