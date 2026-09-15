import { useParams } from 'react-router'

function User() {
    let { username } = useParams()
    return (
        <p>user name is {username}</p>
    );
}

export default User;