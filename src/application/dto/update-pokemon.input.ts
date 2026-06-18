import { PokemonType } from "@/domain/entities/pokemon-type.entity";

export interface UpdatePokemonInput {
  name: string;
  image: string;
  types: PokemonType[];
  height: number;
  weight: number;
}
