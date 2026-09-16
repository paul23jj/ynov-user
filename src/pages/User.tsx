import { useParams } from 'react-router'
import usersData from '../data/users.json'

function User() {
    const { id } = useParams()
    const user = usersData.users.find((user) => user.id === Number(id))

    if(!user) {
        return(
            <>
                <h1>Utilisateur introuvable</h1>
                <p>l'utilisateur demandé n'existe pas...</p>
            </>
        )
    }

    return (
        <>
            <div className="detail">
                <h1>{user.username}</h1>

                <img src={user.image} alt={user.username}/>
            </div>
        </>

    );
}

export default User;