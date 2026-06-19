import { Pokemon } from "@/domain/entities/pokemon.entity";
import { PokemonDetailResponse } from "../dto/pokemon.dto";
import { PokemonType } from "@/domain/entities/pokemon-type.entity";

export class PokemonMapper {
  static toDomain(
    dto: PokemonDetailResponse,
  ): Pokemon {
    return Pokemon.hydrate({
      id: dto.id,

      name: dto.name,

      sprites: dto.sprites,

      height: dto.height,

      weight: dto.weight,

      types: dto.types.map((type) =>
        PokemonType.hydrate({
          name: type.type.name,
        })
      ),
    });
  }
}