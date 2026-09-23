import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router"
import './App.css'
import type { RootState } from "./store/store"
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
const loggedUser = useSelector(
    (state: RootState) => state.auth.loggedUser
);

const connected = loggedUser != null;
const [favorites, setFavorites] = useState<number[]>([]);
useEffect(() => {
    if (!loggedUser) {
        setFavorites([]);
        return;
    }

    const savedFavorites = localStorage.getItem(
        `favorites_${loggedUser.id}`
    );

    if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
    } else {
        setFavorites([]);
    }

}, [loggedUser]);
const toggleFavorite = (id: number) => {

    if (!loggedUser) return;

    let newFavorites: number[];

    if (favorites.includes(id)) {

        newFavorites = favorites.filter(
            (favoriteId) => favoriteId !== id
        );

    } else {

        newFavorites = [...favorites, id];

    }

    setFavorites(newFavorites);

    localStorage.setItem(
        `favorites_${loggedUser.id}`,
        JSON.stringify(newFavorites)
    );
};
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
                          <p>
                              Temps de préparation : {recipe.prepTimeMinutes} min
                          </p>
                          <Link to={`/recipe/${recipe.id}`}>
                              recette
                          </Link>
                          {connected && (
                              <button onClick={() => toggleFavorite(recipe.id)}>
                                  {favorites.includes(recipe.id)
                                      ? "Retirer des favoris"
                                      : "Ajouter aux favoris"
                                  }
                              </button>
                          )}

    </article>
))}
                </div>
            </section>
        </>
    )
}

export default App
