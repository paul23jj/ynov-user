import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { clearLoggedUser } from "../store/reducer/auth";

function Header() {
  const loggedUser = useSelector((state: RootState) => state.auth.loggedUser);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("connectedUserId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch(clearLoggedUser());

    navigate("/login");
  }

  return (
    <nav className="Header">
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/userList">Annuaire</Link></li>
        <li><Link to="/posts">posts</Link></li>

        {!loggedUser && (
          <li><Link to="/login">Connexion</Link></li>
        )}

        {loggedUser && (
          <>
            <li><Link to="/profile">Profil</Link></li>
            <li><Link to="/favorites">Favoris</Link></li>
            <li><button type="button" onClick={handleLogout}>Déconnexion</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
