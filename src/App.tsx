import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

import type { Recipe } from "./type/recipe";
import type { RootState } from "./store/store";

import "./App.css";

interface RecipeResponse {
  recipes: Recipe[];
}

function App() {
  const url = "https://dummyjson.com/recipes";

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const loggedUser = useSelector((state: RootState) => state.auth.loggedUser);

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

  return (
    <>
      <section>
        <h1>
          {loggedUser
            ? `${loggedUser.firstName} ${loggedUser.lastName}`
            : "Bienvenue"}
        </h1>

        <p>catalogue des recettes</p>
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
  );
}

export default App;
