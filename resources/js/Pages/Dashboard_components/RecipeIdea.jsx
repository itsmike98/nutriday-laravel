import { useState, useEffect } from "react";
import { createClient } from "pexels";
import axios from "axios";
import { RotateLoader } from "react-spinners"; // Import RotateLoader

export default function RecipeIdea() {
  const [recipe, setRecipe] = useState(null);
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Initialize as true

  const client = createClient("NjDfuEr4QNQV5HK3IX7bli2ldP0YbEeVbOs7n8apNT5k7UyGDSl0lAVm");

  useEffect(() => {
    axios
      .get("/random-recipe")
      .then((response) => {
        setRecipe(response.data.recipe);
        setIsLoading(false); // Set to false after successful fetch
      })
      .catch((error) => {
        console.error("Error al obtener la receta:", error);
        setIsLoading(false); // Set to false on error as well
      });
  }, []);

  useEffect(() => {
    if (!recipe?.recipe_name) return;

    client.photos
      .search({ query: `${recipe.recipe_name} food`, per_page: 1 })
      .then((photos) => {
        if (photos.photos.length > 0) {
          setImage(photos.photos[0].src.medium); // Ensure correct property access
        } else {
          console.warn("No se encontraron imágenes");
        }
      })
      .catch((err) => console.error("Error al buscar imagen:", err));
  }, [recipe]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[300px]">
          <RotateLoader
            color="#C1C86D"
            loading={isLoading}
            cssOverride={{}}
            margin={5}
          />
        </div>
      ) : (
        <div>
          <h3 className="font-bold text-[1.5em] text-avocado truncate mb-3">
            {recipe && recipe.recipe_name}
          </h3>
          {image && (
            <img
              className="w-full h-[210px] rounded-xl object-cover"
              src={image}
              alt={recipe && recipe.recipe_name}
            />
          )}
        </div>
      )}
    </>
  );
}