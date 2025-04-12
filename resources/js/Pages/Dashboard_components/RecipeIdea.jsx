import { useState, useEffect } from "react";
import { createClient } from "pexels";
import axios from "axios";

export default function RecipeIdea() {
  const [recipe, setRecipe] = useState(null);
  const [image, setImage] = useState("");

  const client = createClient("NjDfuEr4QNQV5HK3IX7bli2ldP0YbEeVbOs7n8apNT5k7UyGDSl0lAVm");

  useEffect(() => {
    axios
      .get("/random-recipe")
      .then((response) => {
        console.log(response.data.recipe.recipe_name);
        setRecipe(response.data.recipe);
      })
      .catch((error) => {
        console.error("Error al obtener la receta:", error);
      });
  }, []);

  useEffect(() => {
    if (!recipe?.recipe_name) return;

    client.photos
  .search({ query: `${recipe.recipe_name} food`, per_page: 1 })
      .then((photos) => {
        if (photos.photos.length > 0) {
            console.log(photos);
          setImage(photos.photos[0].src.medium

          ); // <- Usamos src.large o similar
        } else {
          console.warn("No se encontraron imágenes");
        }
      })
      .catch((err) => console.error("Error al buscar imagen:", err));
  }, [recipe]);

return (
    <div>
        <h3 className="font-bold text-[1.5em] text-avocado truncate mb-3">{recipe?.recipe_name}</h3>
        {image && (
            <img
                className="w-full h-[210px] rounded-xl object-cover"
                src={image}
                alt={recipe?.recipe_name}
            />
        )}
    </div>
);
}
