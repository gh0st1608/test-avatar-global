import { FavoritePokemon } from "@domain/entities/favorite-pokemon.entity";

import { FavoritePokemonRepositoryPort } from "@domain/ports/favorite-pokemon.port";

import { StoragePort } from "@domain/ports/storage.port";

interface FavoritePokemonStorage {
  pokemonId: number;
  createdAt: string;
}

const STORAGE_KEY =
  "pokemon-favorites";

export class FavoritePokemonRepositoryImpl
  implements FavoritePokemonRepositoryPort
{
  constructor(
    private readonly storage: StoragePort,
  ) {}

  getAll(): FavoritePokemon[] {
    const favorites =
      this.storage.get<
        FavoritePokemonStorage[]
      >(STORAGE_KEY) ?? [];

    return favorites.map(
      (favorite) =>
        FavoritePokemon.hydrate(
          favorite,
        ),
    );
  }

  add(
    favorite: FavoritePokemon,
  ): void {
    const favorites =
      this.storage.get<
        FavoritePokemonStorage[]
      >(STORAGE_KEY) ?? [];

    favorites.push(
      favorite.toPrimitives(),
    );

    this.storage.set(
      STORAGE_KEY,
      favorites,
    );
  }

  remove(
    pokemonId: number,
  ): void {
    const favorites =
      this.storage.get<
        FavoritePokemonStorage[]
      >(STORAGE_KEY) ?? [];

    const filtered =
      favorites.filter(
        (favorite) =>
          favorite.pokemonId !==
          pokemonId,
      );

    this.storage.set(
      STORAGE_KEY,
      filtered,
    );
  }

  exists(
    pokemonId: number,
  ): boolean {
    const favorites =
      this.storage.get<
        FavoritePokemonStorage[]
      >(STORAGE_KEY) ?? [];

    return favorites.some(
      (favorite) =>
        favorite.pokemonId ===
        pokemonId,
    );
  }
}