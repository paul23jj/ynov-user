import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { setLoggedUser } from "../store/reducer/auth";
import type { User } from "../type/user";

interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    try {
      const response = await axios.post<LoginResponse>(
        "https://dummyjson.com/auth/login",
        {
          username,
          password,
          expiresInMins: 30,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("connectedUserId", String(data.id));

      dispatch(setLoggedUser(data));

      navigate("/profile");
    } catch (e) {
      console.error(e);
      setError("Identifiants incorrects");
    }
  }

  return (
    <>
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="username">Username :</label>

          <input
            type="text"
            id="username"
            placeholder="Entrez votre nom d'utilisateur"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe :</label>

          <input
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Se connecter</button>
      </form>
    </>
  );
}

export default Login;
