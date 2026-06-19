import { FetchHttpClient } from "@infrastructure/api/fetch-http-client";
import { BrowserStorageAdapter } from "@infrastructure/adapters/browser-storage.impl";
import { GetPokemonsUseCase } from "@/application/usecases/pokemon/get-list.usecase";
import { PokemonApiRepositoryImpl } from "@/infrastructure/adapters/pokemon.impl";
import { GetPokemonByIdUseCase } from "@/application/usecases/pokemon/get-by-id.usecase";
import { GetFavoritePokemonsUseCase } from "@/application/usecases/favorite/get-favorite.usecase";
import { FavoritePokemonRepositoryImpl } from "@/infrastructure/adapters/favorite-pokemon.impl";
import { IsFavoritePokemonUseCase } from "@/application/usecases/favorite/is-favorite.usecase";
import { ToggleFavoritePokemonUseCase } from "@/application/usecases/favorite/toogle-favorite.usecase";
import { GetPokemonTypesUseCase } from "@/application/usecases/pokemon/get-list-types.usecase";
import { GetPokemonsByTypeUseCase } from "@/application/usecases/pokemon/get-pokemon-type.usecase";

const httpClient = new FetchHttpClient();

const storage = new BrowserStorageAdapter();

const pokemonRepository = new PokemonApiRepositoryImpl(httpClient);

const favoriteRepository = new FavoritePokemonRepositoryImpl(storage);

export const container = {
  getPokemons: new GetPokemonsUseCase(pokemonRepository),

  getPokemonById: new GetPokemonByIdUseCase(pokemonRepository),

  searchPokemon: new GetPokemonsUseCase(pokemonRepository),

  getPokemonTypes: new GetPokemonTypesUseCase(pokemonRepository),

  getPokemonsByType: new GetPokemonsByTypeUseCase(pokemonRepository),

  getFavoritePokemons: new GetFavoritePokemonsUseCase(favoriteRepository),

  isFavoritePokemon: new IsFavoritePokemonUseCase(favoriteRepository),

  toggleFavoritePokemon: new ToggleFavoritePokemonUseCase(favoriteRepository),
};
