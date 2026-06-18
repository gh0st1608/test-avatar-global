import { FavoritePokemon } from "@domain/entities/favorite-pokemon.entity";
import { FavoritePokemonRepositoryPort } from "@domain/ports/favorite-pokemon.port";

export class GetFavoritePokemonsUseCase {
  constructor(
    private readonly repository: FavoritePokemonRepositoryPort,
  ) {}

  execute(): FavoritePokemon[] {
    return this.repository.getAll();
  }
}