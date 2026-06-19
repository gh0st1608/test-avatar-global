import { PokemonListItem } from "@/domain/entities/pokemon-list-item.entity";
import { PokemonRepositoryPort } from "@domain/ports/pokemon.port";

export class GetPokemonsUseCase {
  constructor(
    private readonly repository: PokemonRepositoryPort,
  ) {}

  async execute(
    offset: number,
    limit: number,
  ): Promise<PokemonListItem[]> {
    return this.repository.getPokemons(
      offset,
      limit
    );
  }
}