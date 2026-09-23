import { useState } from 'react'
import { useNavigate } from 'react-router'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    expiresInMins: 30,
                }),
                credentials: 'include',
            })

            if (!response.ok) {
                setError('Identifiants incorrects')
                return
            }

            const data = await response.json()

            setError('')
            console.log('success')
            navigate(`/user/${data.id}`)
        } catch (e) {
            console.error(e)
            console.log('erreur')
        }
    }


    return(
        <>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit} className="form">
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

                {error && <p className="error">{error}</p>}

                <button type="submit">Se connecter</button>
            </form>
        </>
    )
}

export default Login