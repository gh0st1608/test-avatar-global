import { Pokemon } from "@domain/entities/pokemon.entity";
import { PokemonListItem } from "../entities/pokemon-list-item.entity";
import { PokemonType } from "../entities/pokemon-type.entity";

export interface PokemonRepositoryPort {
  getPokemons(
    offset: number,
    limit: number
  ): Promise<PokemonListItem[]>;

  getPokemonById(
    id: string,
  ): Promise<Pokemon | null>;

  getPokemonsByType(
    type: string,
  ): Promise<PokemonListItem[]>;

  getPokemonTypes(): Promise<PokemonType[]>;
}