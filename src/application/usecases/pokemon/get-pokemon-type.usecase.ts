import { PokemonListItem } from "@/domain/entities/pokemon-list-item.entity";
import { PokemonRepositoryPort } from "@domain/ports/pokemon.port";

export class GetPokemonsByTypeUseCase {
  constructor(
    private readonly repository: PokemonRepositoryPort,
  ) {}

  async execute(
    type: string
  ): Promise<PokemonListItem[]> {
    return this.repository.getPokemonsByType(
      type
    );
  }
}