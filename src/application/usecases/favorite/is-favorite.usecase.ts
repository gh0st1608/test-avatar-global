import type { FavoritePokemonRepositoryPort } from "@domain/ports/favorite-pokemon.port";

export class IsFavoritePokemonUseCase {
  constructor(
    private readonly repository: FavoritePokemonRepositoryPort,
  ) {}

  execute(
    pokemonId: number,
  ): boolean {
    return this.repository.exists(
      pokemonId,
    );
  }
}