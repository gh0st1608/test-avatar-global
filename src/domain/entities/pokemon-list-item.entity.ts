import { PokemonType } from "./pokemon-type.entity";

export interface PokemonListItemProps {
  id: number;
  name: string;
  types: PokemonType[];
  image: string;
}

export class PokemonListItem {
  private constructor(
    private readonly props: PokemonListItemProps,
  ) {}

  static hydrate(
    props: PokemonListItemProps,
  ): PokemonListItem {
    return new PokemonListItem(
      props,
    );
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

  toPrimitives(): PokemonListItemProps {
    return this.props;
  }
}