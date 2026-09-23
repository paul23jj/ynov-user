<<<<<<< HEAD
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store";

import routes from "./route";

import type { User as UserType } from "./type/user";
import { setUsers } from "./store/reducer/user";
import axios from "axios";
import { setLoggedUser } from "./store/reducer/auth";
import { setLoading } from "./store/reducer/loading";
=======
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css';
import routes from './route.tsx';
import { setLoggedUser } from './store/reducer/auth';
import { setLoading } from "./store/reducer/loading.ts";
import { setUsers } from './store/reducer/user.ts';
import { store } from './store/store.ts';
import type { User as UserType } from './type/user';
>>>>>>> spike

interface UsersResponse {
  users: UserType[];
}

const getUsers = async () => {
  try {
    const response = await axios.get<UsersResponse>(
      "https://dummyjson.com/users",
    );

    store.dispatch(setUsers(response.data.users));
  } catch (e) {
    console.error("Erreur lors de la récupération des utilisateurs", e);
  }
};

const getLoggedUser = async () => {
  const accessToken = localStorage.getItem("accessToken");

<<<<<<< HEAD
  if (!accessToken) {
    store.dispatch(setLoggedUser(null));
    return;
  }

  try {
    const response = await axios.get<UserType>(
      "https://dummyjson.com/auth/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    store.dispatch(setLoggedUser(response.data));
  } catch (e) {
    console.error("Token invalide ou expiré", e);

    localStorage.removeItem("connectedUserId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    store.dispatch(setLoggedUser(null));
  }
};

Promise.all([getUsers(), getLoggedUser()]).finally(() => {
  store.dispatch(setLoading(false));
});
=======


Promise.all([getUsers(), getLoggedUser()]).finally(() => store.dispatch(setLoading(false)))
>>>>>>> spike

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
