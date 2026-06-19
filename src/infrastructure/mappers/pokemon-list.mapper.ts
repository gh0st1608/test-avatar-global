import { PokemonListItem } from "@/domain/entities/pokemon-list-item.entity";
import { PokemonType } from "@/domain/entities/pokemon-type.entity";
import { PokemonDetailResponse } from "../dto/pokemon.dto";

export class PokemonListItemMapper {
  static toDomain(
    dto: PokemonDetailResponse,
  ): PokemonListItem {
    return PokemonListItem.hydrate({
      id: dto.id,

      name: dto.name,

      image:
        dto.sprites.front_default ??
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dto.id}.png`,

      types: dto.types.map(
        (type) =>
          PokemonType.hydrate({
            name: type.type.name,
          })
      ),
    });
  }
}