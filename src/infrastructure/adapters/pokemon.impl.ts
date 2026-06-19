import { Pokemon } from "@domain/entities/pokemon.entity";
import { PokemonRepositoryPort } from "@domain/ports/pokemon.port";
import { HttpClientPort } from "@domain/ports/http-client.port";
import { PokemonMapper } from "../mappers/pokemon.mapper";
import {
  PokemonByTypeResponse,
  PokemonDetailResponse,
  PokemonListResponse,
  PokemonTypeListResponse,
} from "../dto/pokemon.dto";
import { PokemonListItem } from "@/domain/entities/pokemon-list-item.entity";
import { env } from "../config/env";
import { PokemonType } from "@/domain/entities/pokemon-type.entity";

export class PokemonApiRepositoryImpl implements PokemonRepositoryPort {
  constructor(private readonly httpClient: HttpClientPort) {}

  async getPokemons(offset: number, limit: number): Promise<PokemonListItem[]> {
    try {
      const response = await this.httpClient.get<PokemonListResponse>(
        "/pokemon?offset=" + offset + "&limit=" + limit
      );

      const details = await Promise.all(
        response.results.map(({ url }) => {
          const path = url.replace(env.VITE_API_BASE_URL, "");

          return this.httpClient.get<PokemonDetailResponse>(path);
        })
      );

      return details.map((pokemon) =>
        PokemonListItem.hydrate({
          id: pokemon.id,
          name: pokemon.name,
          image:
            pokemon.sprites.front_default ??
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
          types: pokemon.types.map((type) =>
            PokemonType.hydrate({
              name: type.type.name,
            })
          ),
        })
      );
    } catch {
      return [];
    }
  }

  async getPokemonById(id: string): Promise<Pokemon | null> {
    try {
      const response = await this.httpClient.get<PokemonDetailResponse>(
        `/pokemon/${id}`
      );
      return PokemonMapper.toDomain(response);
    } catch {
      return null;
    }
  }

  async getPokemonsByType(type: string): Promise<PokemonListItem[]> {
    try {
      const response = await this.httpClient.get<PokemonByTypeResponse>(
        `/type/${type}`
      );

      const details = await Promise.all(
        response.pokemon.map(({ pokemon }) => {
          const path = pokemon.url.replace(env.VITE_API_BASE_URL, "");
          return this.httpClient.get<PokemonDetailResponse>(path);
        })
      );

      return details.map((pokemon) =>
        PokemonListItem.hydrate({
          id: pokemon.id,
          name: pokemon.name,
          image:
            pokemon.sprites.front_default ??
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
          types: pokemon.types.map((type) =>
            PokemonType.hydrate({
              name: type.type.name,
            })
          ),
        })
      );
    } catch {
      return [];
    }
  }

  async getPokemonTypes(): Promise<PokemonType[]> {
    try {
      const response =
        await this.httpClient.get<PokemonTypeListResponse>("/type");
      return response.results.map((type) =>
        PokemonType.hydrate({ name: type.name })
      );
    } catch {
      return [];
    }
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
