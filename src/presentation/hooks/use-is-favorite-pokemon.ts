import { useQuery } from "@tanstack/react-query";

import { container } from "@/bootstrap/container";

export function useIsFavoritePokemon(
  pokemonId: number,
) {
  return useQuery({
    queryKey: [
      "isFavorite",
      pokemonId,
    ],

    queryFn: () =>
      Promise.resolve(
        container
          .isFavoritePokemon
          .execute(
            pokemonId,
          ),
      ),

    enabled: pokemonId > 0,
  });
}