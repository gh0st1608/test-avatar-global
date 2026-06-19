import {
  useMutation,
} from "@tanstack/react-query";

import { container } from "@/bootstrap/container";
import { queryClient } from "@/presentation/providers/query-provider";

export function useToggleFavoritePokemon() {
  return useMutation({
    mutationFn: (
      pokemonId: number,
    ) =>
      container
        .toggleFavoritePokemon
        .execute(
          pokemonId,
        ),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });
}