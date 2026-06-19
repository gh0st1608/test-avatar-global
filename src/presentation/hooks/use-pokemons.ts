import { useQuery } from "@tanstack/react-query";

import { container } from "@/bootstrap/container";

export function usePokemons(page: number, search: string, type: string) {
  return useQuery({
    queryKey: ["pokemons", page, search, type],

    queryFn: async () => {
      const pokemons = type
        ? await container.getPokemonsByType.execute(type)
        : await container.getPokemons.execute(page * 20, 20);

      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );

      if (type) {
        return filtered.slice(page * 20, (page + 1) * 20);
      }

      return filtered;
    },
  });
}
