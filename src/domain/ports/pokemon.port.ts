import { Pokemon } from "@domain/entities/pokemon.entity";

export interface PokemonRepositoryPort {
  getPokemons(
    offset: number,
    limit: number,
  ): Promise<Pokemon[]>;

  getPokemonById(
    id: string,
  ): Promise<Pokemon | null>;

  getPokemonByName(
    name: string,
  ): Promise<Pokemon | null>;

  getPokemonsByType(
    type: string,
  ): Promise<Pokemon[]>;
}