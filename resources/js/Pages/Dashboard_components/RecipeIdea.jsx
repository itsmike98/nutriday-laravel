// import { useState, useEffect } from "react";
// import { createClient } from "pexels";
// import axios from "axios";
// import Popup from "reactjs-popup";
// import { RotateLoader } from "react-spinners";

// export default function RecipeIdea() {
//   const [recipe, setRecipe] = useState(null);
//   const [image, setImage] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   const client = createClient("NjDfuEr4QNQV5HK3IX7bli2ldP0YbEeVbOs7n8apNT5k7UyGDSl0lAVm");

//   useEffect(() => {
//     axios
//       .get("/random-recipe")
//       .then((response) => {
//         setRecipe(response.data.recipe);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error al obtener la receta:", error);
//         setIsLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (!recipe?.recipe_name) return;

//     client.photos
//       .search({ query: `${recipe.recipe_name} dish OR plate OR meal`, per_page: 1 })
//       .then((photos) => {
//         if (photos.photos.length > 0) {
//           setImage(photos.photos[0].src.medium);
//         } else {
//           console.warn("No se encontraron imágenes");
//         }
//       })
//       .catch((err) => console.error("Error al buscar imagen:", err));
//   }, [recipe]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-[300px]">
//         <RotateLoader color="#C1C86D" loading={true} />
//       </div>
//     );
//   }

//   if (!recipe) return null;

//   return (
//     <Popup
//       trigger={
//         <div className="cursor-pointer">
//           <h3 className="font-bold text-[1.5em] text-avocado truncate mb-3">
//             {recipe.recipe_name}
//           </h3>
//           {image && (
//             <img
//               className="w-full h-[210px] rounded-xl object-cover"
//               src={image}
//               alt={recipe.recipe_name}
//             />
//           )}
//         </div>
//       }
//       modal
//     >
//       {(close) => (
//         <div className="bg-[#1E1E1E] text-white p-6 rounded-xl max-h-[90vh] overflow-y-auto w-full max-w-2xl">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">{recipe.recipe_name}</h2>
//             <button onClick={close} className="text-avocado text-lg font-bold">✕</button>
//           </div>
//           {image && (
//             <img src={image} alt="recipe" className="rounded-lg mb-4 w-full object-cover max-h-[300px]" />
//           )}

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-avocado mb-2">Ingredients</h3>
//             <ul className="list-disc pl-5 space-y-1">
//               {recipe.ingredients.ingredient.map((ing, index) => (
//                 <li key={index}>{ing.ingredient_description}</li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-avocado mb-2">Directions</h3>
//             <ol className="list-decimal pl-5 space-y-2">
//               {recipe.directions.direction.map((dir, index) => (
//                 <li key={index}>{dir.direction_description}</li>
//               ))}
//             </ol>
//           </div>
//         </div>
//       )}
//     </Popup>
//   );
// }