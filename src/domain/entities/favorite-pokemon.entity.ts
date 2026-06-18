export interface FavoritePokemonProps {
  pokemonId: number;
  createdAt: string;
}

export class FavoritePokemon {
  private constructor(
    private readonly props: FavoritePokemonProps,
  ) {}

  static create(
    pokemonId: number,
  ): FavoritePokemon {
    return new FavoritePokemon({
      pokemonId,
      createdAt:
        new Date().toISOString(),
    });
  }

  static hydrate(
    props: FavoritePokemonProps,
  ): FavoritePokemon {
    return new FavoritePokemon(props);
  }

  get pokemonId(): number {
    return this.props.pokemonId;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  equals(
    favorite: FavoritePokemon,
  ): boolean {
    return (
      this.pokemonId ===
      favorite.pokemonId
    );
  }

  toPrimitives(): FavoritePokemonProps {
    return {
      pokemonId: this.pokemonId,
      createdAt: this.createdAt,
    };
  }
}