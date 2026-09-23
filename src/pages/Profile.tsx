
import { useNavigate, Navigate } from 'react-router'
import { useState, useEffect } from 'react'
import type { User } from '../type/user'

function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState('')

    const connectedUserId = localStorage.getItem('connectedUserId')
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        if (!connectedUserId || !accessToken) {
            return
        }

        async function getCurrentUser() {
            try {
                const response = await fetch('https://dummyjson.com/auth/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    credentials: 'include',
                })

                if (!response.ok) {
                    setError('Token incorrect')
                    return
                }

                const data: User = await response.json()

                setUser(data)
                setError('')
            } catch (e) {
                console.error(e)
                setError('Une erreur est survenue')
            }
        }

        getCurrentUser()
    }, [connectedUserId, accessToken])

    function handleLogout() {
        localStorage.removeItem('connectedUserId')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/login')
    }

    if (!connectedUserId || !accessToken) {
        return <Navigate to="/login" />
    }


    if (!user && error) {
        return (
            <>
                <p>Impossible de récupérer le profil</p>
                {error && <p className="error">{error}</p>}
            </>
        )
    }

    if (!user) {
        return <p>Chargement...</p>
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

            {error && <p className="error">{error}</p>}
        </>
    )
}

export default Profile