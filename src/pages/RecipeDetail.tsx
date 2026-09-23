import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import type { Recipe as RecipeType } from "../type/recipe"

function RecipeDetail() {
    const { id } = useParams<{ id: string}>();
    const [recipe, setRecipe] = useState<RecipeType | null>(null);

    useEffect(() => {
        if (!id) return;

        const url = `https://dummyjson.com/recipes/${id}`;

        (async () => {
            try{
                const response = await axios.get<RecipeType>(url);
                setRecipe(response.data);
            } catch (e) {
                console.error(e);
            }
        }) ();
    }, [id]);
    if (!recipe) {
        return (
            <p>Chargement...</p>
        )
    }

    return (
        <>
            <div className="detail">
                <h1>{recipe.name}</h1>

                <img src={recipe.image} alt={recipe.name}/>

                <p>Temps de préparation {recipe.prepTimeMinutes}</p>
                <p>Temps de cuisson {recipe.cookTimeMinutes}</p>

                <h2>Ingrédients</h2>
                <ul>
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>

                <h2>Etapes</h2>

                <ol>
                    {recipe.instructions.map((instruction) =>(
                        <li key={instruction}>{instruction}</li>
                    ))}
                </ol>
            </div>
        </>
    );
}

export default RecipeDetail;