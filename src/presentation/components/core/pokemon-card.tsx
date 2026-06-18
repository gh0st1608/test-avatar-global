import { Pokemon } from "@domain/entities/pokemon.entity";

interface Props {
  pokemon: Pokemon;
  onClick(): void;
}

export function PokemonCard({
  pokemon,
  onClick,
}: Props) {
  return (
    <article
      onClick={onClick}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
      />

      <h3>
        {pokemon.name}
      </h3>

      <span>
        {pokemon.typesLabel}
      </span>
    </article>
  );
}