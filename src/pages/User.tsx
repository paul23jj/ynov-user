import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { User as UserType} from "../type/user"

function User() {
    const { id } = useParams<{ id: string}>();
    const [user, setUser] = useState<UserType | null>(null);
    useEffect(() => {
        if (!id) return;

        const url = `https://dummyjson.com/users/${id}`;

        (async () => {
            try{
                const response = await axios.get<UserType>(url);
                setUser(response.data);
            } catch (e) {
                console.error(e);
            }
        }) ();
    }, [id]);

    if (!user) {
        return (
            <p>Chargement...</p>
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

