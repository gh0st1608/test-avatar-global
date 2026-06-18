import { useQuery } from "@tanstack/react-query";

import { container } from "@/bootstrap/container";

export function usePokemons(page: number) {
  return useQuery({
    queryKey: ["pokemons", page],

    queryFn: () => container.getPokemons.execute(page * 20, 20),
  });
}
