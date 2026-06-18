import { Pokemon } from "@domain/entities/pokemon.entity";
import { PokemonRepositoryPort } from "@domain/ports/pokemon.port";

export class GetPokemonsUseCase {
  constructor(
    private readonly repository: PokemonRepositoryPort,
  ) {}

  async execute(
    offset: number,
    limit: number,
  ): Promise<Pokemon[]> {
    return this.repository.getPokemons(
      offset,
      limit,
    );
  }
}