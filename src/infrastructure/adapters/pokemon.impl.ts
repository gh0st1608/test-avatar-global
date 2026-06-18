import { Pokemon } from "@domain/entities/pokemon.entity";
import { PokemonRepositoryPort } from "@domain/ports/pokemon.port";
import { HttpClientPort } from "@domain/ports/http-client.port";
import { CreatePokemonInput } from "@/application/dto/create-pokemon.input";
import { UpdatePokemonInput } from "@/application/dto/update-pokemon.input";
import { PokemonType } from "@/domain/entities/pokemon-type.entity";

interface PokemonApiResponse {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  height: number;
  weight: number;
}

interface ListPokemonsResponse {
  items: PokemonApiResponse[];
  count: number;
  nextPage: number | null;
  statusCode: number;
  message: string;
}

interface SinglePokemonResponse {
  pokemon: PokemonApiResponse;
  statusCode: number;
  message: string;
}

interface CreatePokemonResponse {
  pokemon: { pokemonId: string };
  statusCode: number;
  message: string;
}

export class PokemonApiRepositoryImpl implements PokemonRepositoryPort {
  constructor(private readonly httpClient: HttpClientPort) {}

  async getPokemons(offset: number, limit: number): Promise<Pokemon[]> {
    const response =
      await this.httpClient.get<ListPokemonsResponse>("/pokemons");
    return response.items.map((s) => Pokemon.hydrate(s));
  }

  async getPokemonById(id: string): Promise<Pokemon | null> {
    try {
      const response = await this.httpClient.get<SinglePokemonResponse>(
        `/pokemons/${id}`
      );
      return Pokemon.hydrate(response.pokemon);
    } catch {
      return null;
    }
  }

  async getPokemonByName(name: string): Promise<Pokemon | null> {
    try {
      const response = await this.httpClient.get<SinglePokemonResponse>(
        `/pokemons/name/${name}`
      );
      return Pokemon.hydrate(response.pokemon);
    } catch {
      return null;
    }
  }

  async getPokemonsByType(type: string): Promise<Pokemon[]> {
    const response = await this.httpClient.get<ListPokemonsResponse>(
      `/pokemons/type/${type}`
    );
    return response.items.map((s) => Pokemon.hydrate(s));
  }

  /* async create(input: CreatePokemonInput): Promise<Pokemon> {
    const createResponse = await this.httpClient.post<CreatePokemonResponse>(
      "/pokemons",
      input
    );
    const pokmeonId = createResponse.pokemon.pokemonId;
    const getResponse = await this.httpClient.get<SinglePokemonResponse>(
      `/pokemons/${pokmeonId}`
    );
    return Pokemon.hydrate(getResponse.pokemon);
  }

  async update(id: string, input: UpdatePokemonInput): Promise<Pokemon> {
    const response = await this.httpClient.patch<SinglePokemonResponse>(
      `/pokemons/${id}`,
      input
    );
    return Pokemon.hydrate(response.pokemon);
  }

  async delete(id: string): Promise<void> {
    await this.httpClient.delete<unknown>(`/pokemons/${id}`);
  } */
}
