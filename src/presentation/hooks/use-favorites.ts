import { useQuery } from "@tanstack/react-query";

import { container } from "@/bootstrap/container";
import { FavoritePokemon } from "@/domain/entities/favorite-pokemon.entity";

export function useFavoritePokemons() {
  return useQuery({
    queryKey: ["favorites"],

    queryFn: () =>
      container
        .getFavoritePokemons
        .execute(),
  });
}