import { Link } from 'react-router-dom'

function UserList() {
    const users = [
        {
            "first_name": "Tom",
            "last_name": "Lalieve"
        },
        {
            "first_name": "Amex",
            "last_name": "annexe"
        },
        {
            "first_name": "Kéké",
            "last_name": "dab"
        }
    ];

    return (
        <>
            {users.map((user) =>
                <div>
                    <p>name : {user.first_name}</p>
                    <p>last name : {user.last_name}</p>
                    <Link to={`/user/${user.username}`}/>
                </div>
            )}
        </>
    );
}

export default UserList;