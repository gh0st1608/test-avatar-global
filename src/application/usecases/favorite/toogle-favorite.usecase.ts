import { FavoritePokemon } from "@domain/entities/favorite-pokemon.entity";
import { FavoritePokemonRepositoryPort } from "@domain/ports/favorite-pokemon.port";

export class ToggleFavoritePokemonUseCase {
  constructor(
    private readonly repository: FavoritePokemonRepositoryPort,
  ) {}

  async execute(
    pokemonId: number,
  ): Promise<boolean> {
    const exists =
      this.repository.exists(
        pokemonId,
      );

    if (exists) {
      this.repository.remove(
        pokemonId,
      );

      return false;
    }

    this.repository.add(
      FavoritePokemon.create(
        pokemonId,
      ),
    );

    return true;
  }
}