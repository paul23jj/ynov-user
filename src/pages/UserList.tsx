import { Link } from 'react-router-dom'
import users from '../data/users.json'

function UserList() {

    return (
        <>
            {users.users.map((user) =>
                <div key={user.id}>
                    <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                    <p>name : {user.firstName}</p>
                    <p>last name : {user.lastName}</p>
                    <p>username : {user.username}</p>
                    <Link to={`/user/${user.id}`}>voir le profil</Link>
                </div>
            )}
        </>
    );
}

export default UserList;