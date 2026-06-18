import { PokemonType } from "@/domain/entities/pokemon-type.entity";

export interface CreatePokemonInput {
  name: string;
  image: string;
  types: PokemonType[];
  height: number;
  weight: number;
}