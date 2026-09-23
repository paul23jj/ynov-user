import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import type { RootState } from "../store/store.ts";
import type { Post } from "../type/post"
import { setPosts, addPost, removePost } from "../store/reducer/post.ts";

interface PostResponse {
    posts: Post[];
}

function PostList() {
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.post.posts)
    const loggedUser = useSelector((state: RootState) => state.auth.loggedUser)
    const url = "https://dummyjson.com/posts"

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try{
                const response = await axios.get<PostResponse>(url)
                dispatch(setPosts(response.data.posts))
            } catch (e) {
                console.error(e);
            }
        }) ();
    }, [dispatch]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await axios.post('https://dummyjson.com/posts/add', {
                title,
                body,
                userId: loggedUser?.id ?? 1,
            });

            const newPost: Post = {
                id: response.data.id,
                title: title,
                body: body,
                tags: [],
                reactions: { likes: 0, dislikes: 0 },
                views: 0,
                userId: loggedUser?.id ?? 1,
            };

            dispatch(addPost(newPost));
            setTitle('');
            setBody('');
            setError('');
        } catch (e) {
            console.error(e);
            setError("Impossible de publier l'article");
        }
    }

    async function handleDelete(postId: number) {
        try {
            await axios.delete(`https://dummyjson.com/posts/${postId}`);
            dispatch(removePost(postId));
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Blog</h1>

            <form onSubmit={handleSubmit} className="form">
                <div>
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="body">Contenu :</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        required
                    />
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit">Publier</button>
            </form>

            <div className="grid">
                {posts.map((post) => (
                    <article key={post.id} className="card">
                        <h2>{post.title}</h2>
                        <p>{post.body.slice(0, 100) + '...'}</p>
                        <p>{post.reactions.likes} {post.reactions.dislikes}</p>
                        <p>{post.views}</p>

                        <Link to={`/posts/${post.id}`}>Voir le post</Link>
                        <button type="button" onClick={() => handleDelete(post.id)}>Supprimer</button>
                    </article>
                ))}
            </div>
        </>
    )
}

export default PostList