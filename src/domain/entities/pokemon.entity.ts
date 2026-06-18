import { PokemonType } from "./pokemon-type.entity";

export interface PokemonProps {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  height: number;
  weight: number;
}

export class Pokemon {
  private constructor(
    private readonly props: PokemonProps,
  ) {}

  static hydrate(
    props: PokemonProps,
  ): Pokemon {
    return new Pokemon(props);
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get image(): string {
    return this.props.image;
  }

  get types(): PokemonType[] {
    return this.props.types;
  }

  get height(): number {
    return this.props.height;
  }

  get weight(): number {
    return this.props.weight;
  }

  get formattedHeight(): string {
    return `${this.height / 10} m`;
  }

  get formattedWeight(): string {
    return `${this.weight / 10} kg`;
  }

  hasType(type: string): boolean {
    return this.types.some(
      (pokemonType) =>
        pokemonType.name === type,
    );
  }

  get typesLabel(): string {
    return this.types
      .map((type) => type.name)
      .join(", ");
  }

  toPrimitives(): PokemonProps {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      types: this.types,
      height: this.height,
      weight: this.weight,
    };
  }
}