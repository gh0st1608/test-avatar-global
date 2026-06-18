import { useQuery } from "@tanstack/react-query";

import { container } from "@/bootstrap/container";

export function useFavoritePokemons() {
  return useQuery({
    queryKey: ["favorites"],

    queryFn: () =>
      Promise.resolve(
        container
          .getFavoritePokemons
          .execute(),
      ),
  });
}