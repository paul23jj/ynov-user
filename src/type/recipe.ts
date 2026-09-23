export interface Recipe {
    id: number;
    name: string;
    ingredients: [];
    instructions: [];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: [];
    image: string;
    rating: number;
    reviewCount: number;
    mealType: [];
}
