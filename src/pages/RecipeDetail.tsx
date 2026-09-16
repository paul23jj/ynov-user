import { useParams } from 'react-router'
import recipesData from '../data/recipes.json'

function RecipeDetail() {
    const { id } = useParams()
    const recipe = recipesData.recipes.find((recipe) => recipe.id === Number(id))

    if (!recipe) {
        return (
            <>
                <h1>Recette introuvable</h1>
                <p>la recette demandée n'existe pas...</p>
            </>
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