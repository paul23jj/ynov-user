import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { User } from "../type/user";
import axios from "axios";

function Profile() {
  const loggedUser = useSelector((state: RootState) => state.auth.loggedUser);

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    async function getCurrentUser() {
      try {
        const response = await axios.get<User>(
          "https://dummyjson.com/auth/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setUser(response.data);
        setError("");
      } catch (e) {
        console.error(e);
        setError("Impossible de récupérer le profil");
      }
    }

    getCurrentUser();
  }, [accessToken]);

  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return (
      <>
        <p>Impossible de récupérer le profil</p>
        <p className="error">{error}</p>
      </>
    );
  }

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="detail">
      <h1>Mon profil</h1>

      <img src={user.image} alt={user.username} />

      <p>
        <strong>Prénom :</strong> {user.firstName}
      </p>

      <p>
        <strong>Nom :</strong> {user.lastName}
      </p>

      <p>
        <strong>Username :</strong> {user.username}
      </p>

      <p>
        <strong>Email :</strong> {user.email}
      </p>

      <p>
        <strong>Téléphone :</strong> {user.phone}
      </p>

      <p>
        <strong>Âge :</strong> {user.age}
      </p>

      <p>
        <strong>Date de naissance :</strong> {user.birthDate}
      </p>

      <p>
        <strong>Genre :</strong> {user.gender}
      </p>

      <p>
        <strong>Rôle :</strong> {user.role}
      </p>

      {user.address && (
        <>
          <h2>Adresse</h2>
          <p>{user.address.address}</p>
          <p>
            {user.address.postalCode} {user.address.city}
          </p>
          <p>{user.address.country}</p>
        </>
      )}

      {user.company && (
        <>
          <h2>Entreprise</h2>
          <p>{user.company.name}</p>
          <p>{user.company.department}</p>
          <p>{user.company.title}</p>
        </>
      )}
    </div>
  );
}

export default Profile;
