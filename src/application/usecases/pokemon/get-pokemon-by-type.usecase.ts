import { Pokemon } from "@domain/entities/pokemon.entity";
import { PokemonRepositoryPort } from "@domain/ports/pokemon.port";


export class GetPokemonsByTypeUseCase {
  constructor(
    private readonly repository: PokemonRepositoryPort,
  ) {}

  async execute(
    type : string,
  ): Promise<Pokemon[]> {
    return this.repository.getPokemonsByType(
      type
    );
  }
}