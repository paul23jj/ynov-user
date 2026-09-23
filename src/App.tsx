import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import './App.css'
import type { Quotes } from './type/quotes'
import type { Recipe } from "./type/recipe"

interface RecipeResponse {
    recipes: Recipe[]
}

interface QuotesResponse {
    quotes: Quotes[]
}

const day = new Date().getDate();

function App() {
    const url = "https://dummyjson.com/recipes";
    const [recipes, setRecipes] = useState<Recipe[]>([])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<RecipeResponse>(url);
                setRecipes(response.data.recipes);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

const quoteUrl = `https://dummyjson.com/quotes/${day}`;
const [quote, setQuote] = useState<Quotes | null>(null);

useEffect(() => {
    (async () => {
        try {
            const response = await axios.get<Quotes>(quoteUrl);
            setQuote(response.data);
        } catch (e) {
            console.error(e);
        }
    })();
}, []);
    return (
        <>
            <section>
                <h1>Paul GAULMIN</h1>
                <div>
                    {quote && (
                        <>
                        <p>{quote.quote}</p>
                        <p>{quote.author}</p>
                        </>
                    )}
                </div>
            </section>

            <section>
                <h2>recettes :</h2>

                <div className="grid">
                    {recipes.map((recipe) => (
                        <article key={recipe.id} className="card">
                            <img src={recipe.image} alt={recipe.name} />
                            <h3>{recipe.name}</h3>
                            <p>Temps de préparation : {recipe.prepTimeMinutes} min</p>
                            <Link to={`/recipe/${recipe.id}`}>recette</Link>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}

export default App
