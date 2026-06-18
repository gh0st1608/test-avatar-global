export interface PokemonTypeProps {
  name: string;
}

export class PokemonType {
  private constructor(
    private readonly props: PokemonTypeProps,
  ) {}

  static hydrate(
    props: PokemonTypeProps,
  ): PokemonType {
    return new PokemonType(props);
  }

  get name(): string {
    return this.props.name;
  }

  equals(type: PokemonType): boolean {
    return (
      this.name.toLowerCase() ===
      type.name.toLowerCase()
    );
  }

  toPrimitives(): PokemonTypeProps {
    return {
      name: this.name,
    };
  }
}