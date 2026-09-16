import { Navigate } from 'react-router'
import { useNavigate } from 'react-router'
import usersData from '../data/users.json'

function Profile() {
    const navigate = useNavigate()
    const connectedUserId = localStorage.getItem('connectedUserId')

    if(!connectedUserId) {
        return <Navigate to="/login" />
    }

    const user = usersData.users.find((user) => user.id === Number(connectedUserId))

    if(!user) {
        return <Navigate to="/login" />
    }

    function handleLogout() {
        localStorage.removeItem('connectedUserId')
        navigate('/login')
    }

    return(
        <>
            <div className="detail">
                <h1>Profil</h1>
                <img src={user.image} alt={user.username} />
                <p>Prénom : {user.firstName}</p>
                <p>Nom : {user.lastName}</p>
                <p>Username : {user.username}</p>
                <p>Email : {user.email}</p>

                <button type="button" onClick={handleLogout}>Se déconnecter</button>
            </div>
        </>
    )
}

export default Profile