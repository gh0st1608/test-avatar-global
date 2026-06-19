import { FavoritePokemon } from "@domain/entities/favorite-pokemon.entity";

export interface FavoritePokemonRepositoryPort {
  getAll(): Promise<FavoritePokemon[]>;

  add(
    favorite: FavoritePokemon,
  ): Promise<void>;

  remove(
    pokemonId: number,
  ): Promise<void>;

  exists(
    pokemonId: number,
  ): Promise<boolean>;
}