import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function UserList() {
  const users = useSelector((state: RootState) => state.user.users);

  return (
    <section>
      <h1>Annuaire</h1>

      <div className="grid">
        {users.map((user) => (
          <article key={user.id} className="card">
            <img src={user.image} alt={user.username} />
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>Username : {user.username}</p>
            <p>Email : {user.email}</p>

            <Link to={`/user/${user.id}`}>Voir le profil</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UserList;
