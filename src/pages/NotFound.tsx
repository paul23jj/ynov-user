import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>404</h1>
      <p> Page introuvable</p>
      <Link to="/"> Retour à l'accueil</Link>
    </>
  );
}

export default NotFound;
