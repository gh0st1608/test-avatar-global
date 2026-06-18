import { FavoritePokemon } from "@domain/entities/favorite-pokemon.entity";

export interface FavoritePokemonRepositoryPort {
  getAll(): FavoritePokemon[];

  add(
    favorite: FavoritePokemon,
  ): void;

  remove(
    pokemonId: number,
  ): void;

  exists(
    pokemonId: number,
  ): boolean;
}