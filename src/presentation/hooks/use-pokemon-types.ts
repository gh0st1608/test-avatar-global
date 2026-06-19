import { useQuery } from "@tanstack/react-query";

import { container } from "@/bootstrap/container";

export function usePokemonTypes() {
  return useQuery({
    queryKey: [
      "pokemonTypes"
    ],

    queryFn: () =>
      container
        .getPokemonTypes
        .execute(),
  });
}