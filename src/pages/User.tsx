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
            <h1>{user.username}</h1>

            <img src={user.image} alt={user.image}/>

            <p>Prénom :{user.firstName}</p>
            <p>Nom :{user.lastName}</p>
            <p>Email :{user.email}</p>
            <p>Téléphone :{user.phone}</p>
            <p>Age :{user.age}</p>
            <p>Rôle :{user.role}</p>
            <p>Ville :{user.address.city}</p>
            <p>Entreprise :{user.company.name}</p>
        </>

    );
}

export default User;