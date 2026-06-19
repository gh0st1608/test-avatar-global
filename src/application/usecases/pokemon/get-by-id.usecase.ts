import { Pokemon } from "@domain/entities/pokemon.entity";
import { PokemonRepositoryPort } from "@domain/ports/pokemon.port";

export class GetPokemonByIdUseCase {
  constructor(
    private readonly repository: PokemonRepositoryPort,
  ) {}

  async execute(
    id: string,
  ): Promise<Pokemon | null> {
    return this.repository.getPokemonById(
      id
    );
  }
}