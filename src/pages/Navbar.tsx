import { Link } from "react-router-dom";

function Header() {
    return(
        <nav className="Header">
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/userList">Annuaire</Link></li>
                <li><Link to="/login">Connexion</Link></li>
                <li><Link to="/profile">Profil</Link></li>
                <li><Link to="/favoris">favoris</Link></li>
            </ul>
        </nav>
    );
}

export default Header;