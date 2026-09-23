import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import type { Post } from "../type/post"
import type { Comment } from "../type/comment"
import type { RootState } from "../store/store"
import { setComments, addComment, removeComment } from "../store/reducer/comment"

interface CommentsResponse {
    comments: Comment[];
}

function PostDetail() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null)
    const [commentBody, setCommentBody] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const comments = useSelector((state: RootState) => state.comment.comments)
    const loggedUser = useSelector((state: RootState) => state.auth.loggedUser)

    useEffect(() => {
        if (!id) return;
        const postUrl = `https://dummyjson.com/posts/${id}`;
        const commentsUrl = `https://dummyjson.com/comments/post/${id}`;

        (async () => {
            try{
                const response = await axios.get<Post>(postUrl);
                setPost(response.data);
            } catch (e) {
                console.error(e);
            }
        })();

        (async () => {
            try{
                const response = await axios.get<CommentsResponse>(commentsUrl);
                dispatch(setComments(response.data.comments));
            } catch (e) {
                console.error(e);
            }
        })();
    }, [id, dispatch]);

    async function handleAddComment(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!id) return;

        try {
            const response = await axios.post('https://dummyjson.com/comments/add', {
                body: commentBody,
                postId: Number(id),
                userId: loggedUser?.id ?? 1,
            });

            const newComment: Comment = {
                id: response.data.id,
                body: commentBody,
                postId: Number(id),
                likes: 0,
                user: {
                    id: loggedUser?.id ?? 1,
                    username: loggedUser?.username ?? 'anonyme',
                    fullName: loggedUser ? `${loggedUser.firstName} ${loggedUser.lastName}` : 'Anonyme',
                },
            };

            dispatch(addComment(newComment));
            setCommentBody('');
            setError('');
        } catch (e) {
            console.error(e);
            setError("Impossible d'ajouter le commentaire");
        }
    }

    async function handleDeleteComment(commentId: number) {
        try {
            await axios.delete(`https://dummyjson.com/comments/${commentId}`);
            dispatch(removeComment(commentId));
        } catch (e) {
            console.error(e);
        }
    }

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

                <h2>Commentaires</h2>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <strong>{comment.user.username}</strong> : {comment.body}
                            <button type="button" onClick={() => handleDeleteComment(comment.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleAddComment} className="form">
                    <div>
                        <label htmlFor="comment">Ajouter un commentaire :</label>
                        <textarea
                            id="comment"
                            value={commentBody}
                            onChange={(event) => setCommentBody(event.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button type="submit">Commenter</button>
                </form>
            </div>
        </>
    )
}

export default PostDetail