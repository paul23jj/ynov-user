import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import type { Post } from "../type/post"

function PostDetail() {
    const { id } = useParams <{id: string}>();
    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        if (!id) return;
        const url = `https://dummyjson.com/posts/${id}`;

        (async () => {
            try{
                const response = await axios.get<Post>(url);
                setPost(response.data);
            } catch (e) {
                console.error(e);
            }
        }) ();
    }, [id]);
    if (!post) {
        return (
            <p>Chargement...</p>
        )
    }
    return (
        <>
            <div className="detail">
                <h1>{post.title}</h1>

                <p>{post.body}</p>
                <p>{post.tags.join(',')}</p>
                <p>👍{post.reactions.likes}  👎{post.reactions.dislikes}</p>
                <p>vues : {post.views}</p>
            </div>
        </>
    )
}

export default PostDetail