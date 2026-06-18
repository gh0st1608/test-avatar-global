import { useQuery } from "@tanstack/react-query";

import { container } from "@/bootstrap/container";

export function usePokemon(
  id: string,
) {
  return useQuery({
    queryKey: [
      "pokemon",
      id,
    ],

    queryFn: () =>
      container
        .getPokemonById
        .execute(id),
  });
}