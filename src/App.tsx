import { Link } from 'react-router-dom'
import './App.css'
import recipesData from './data/recipes.json'

function App() {

  return (
    <>
        <section>
            <h1>Paul GAULMIN</h1>
            <p>catalogue des recettes</p>
        </section>

        <section>
            <h2>recettes :</h2>

            <div className="grid">
                {recipesData.recipes.map((recipe) => (
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
