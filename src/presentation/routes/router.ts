import {
  createBrowserRouter,
} from "react-router-dom";

export const router =
  createBrowserRouter([
    {
      path: "/",
      element:
        <PokemonListScreen />,
    },

    {
      path:
        "/pokemon/:id",
      element:
        <PokemonDetailScreen />,
    },
  ]);