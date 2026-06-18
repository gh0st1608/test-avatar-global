import { Pokemon } from "@domain/entities/pokemon.entity";
import { PokemonRepositoryPort } from "@domain/ports/pokemon.port";

export class GetPokemonByNameUseCase {
  constructor(private readonly repository: PokemonRepositoryPort) {}

  async execute(name: string): Promise<Pokemon | null> {
    if (!name) {
      return null;
    }

    return this.repository.getPokemonByName(name);
  }
}
