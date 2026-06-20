import { createBrowserRouter } from "react-router-dom";
import { PokemonListScreen } from "@/presentation/screens/pokemon-list-screen";
import { PokemonDetailScreen } from "@/presentation/screens/pokemon-detail-screen";
import { MainLayout } from "@/presentation/components/layout/main";

export const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <PokemonListScreen />,
        },
        {
          path: "/pokemon/:id",
          element: <PokemonDetailScreen />,
        },
      ],
    },
  ],
  {
    basename: "/pokeapp",
  }
);
