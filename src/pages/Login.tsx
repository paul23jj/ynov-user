import { useState } from 'react'
import { useNavigate } from 'react-router'
import usersData from '../data/users.json'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const user = usersData.users.find((user) => (
            user.username === username && user.password === password
        ))

        if (!user) {
            setError('Identifiants incorrects')
            return
        }

        setError('')
        navigate(`/profile`)
    }


    return(
        <>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text"
                           id="username"
                           placeholder="Entrez votre nom d'utilisateur"
                           value={username}
                           onChange={(event) => setUsername(event.target.value)}
                           required/>
                </div>


                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password"
                           id="password"
                           placeholder="Entrez votre mot de passe"
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}
                           required/>
                </div>

                {error && <p>{error}</p>}

                <button type="submit">Se connecter</button>
            </form>
        </>
    )
}

export default Login