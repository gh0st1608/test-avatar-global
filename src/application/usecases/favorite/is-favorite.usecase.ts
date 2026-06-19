import type { FavoritePokemonRepositoryPort } from "@domain/ports/favorite-pokemon.port";

export class IsFavoritePokemonUseCase {
  constructor(
    private readonly repository: FavoritePokemonRepositoryPort,
  ) {}

  async execute(
    pokemonId: number,
  ): Promise<boolean> {
    return this.repository.exists(
      pokemonId,
    );
  }
}