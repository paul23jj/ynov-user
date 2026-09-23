import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import type { RootState } from "../store/store";
import type { Recipe } from "../type/recipe";

interface RecipeResponse {
    recipes: Recipe[];
}

function Favoris() {

    const loggedUser = useSelector(
        (state: RootState) => state.auth.loggedUser
    );

    const [favorites, setFavorites] = useState<Recipe[]>([]);

    useEffect(() => {

        if (!loggedUser) {
            setFavorites([]);
            return;
        }

        const savedFavorites = localStorage.getItem(
            `favorites_${loggedUser.id}`
        );

        if (!savedFavorites) {
            setFavorites([]);
            return;
        }

        const favoriteIds: number[] = JSON.parse(savedFavorites);

        (async () => {
            try {

                const response = await axios.get<RecipeResponse>(
                    "https://dummyjson.com/recipes"
                );

                const favoriteRecipes = response.data.recipes.filter(
                    (recipe) => favoriteIds.includes(recipe.id)
                );

                setFavorites(favoriteRecipes);

            } catch (e) {
                console.error(e);
            }
        })();

    }, [loggedUser]);


    return (
        <>
            <h1>FAVORIS</h1>

            <div className="grid">

                {favorites.map((recipe) => (

                    <article key={recipe.id} className="card">

                        <img
                            src={recipe.image}
                            alt={recipe.name}
                        />

                        <h3>{recipe.name}</h3>

                        <p>
                            Temps de préparation : {recipe.prepTimeMinutes} min
                        </p>

                        <Link to={`/recipe/${recipe.id}`}>
                            recette
                        </Link>

                    </article>

                ))}

            </div>
        </>
    );
}

export default Favoris;