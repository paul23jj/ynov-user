import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import type {RootState} from "../store/store.ts";
import type { Post } from "../type/post"
import { setPosts } from "../store/reducer/post.ts";

interface PostResponse {
    posts: Post[];
}

function PostList() {
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.post.posts)
    const url = "https://dummyjson.com/posts"

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
    return (
        <>
            <h1>Blog</h1>

            <div className="grid">
                {posts.map((post) => (
                    <article key={post.id} className="card">
                        <h2>{post.title}</h2>
                        <p>{post.body.slice(0, 100) + '...'}</p>
                        <p>👍{post.reactions.likes}  👎{post.reactions.dislikes}</p>
                        <p>{post.views}</p>

                        <Link to={`/posts/${post.id}`}>Voir le post</Link>
                    </article>
                ))}
            </div>
        </>
    )
}

export default PostList