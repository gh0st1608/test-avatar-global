import { PokemonType } from "@/domain/entities/pokemon-type.entity";
import { PokemonRepositoryPort } from "@domain/ports/pokemon.port";

export class GetPokemonTypesUseCase {
  constructor(
    private readonly repository: PokemonRepositoryPort,
  ) {}

  async execute(): Promise<PokemonType[]> {
    return this.repository.getPokemonTypes();
  }
}