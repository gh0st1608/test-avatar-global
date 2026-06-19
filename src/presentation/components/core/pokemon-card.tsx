import { PokemonListItem } from "@/domain/entities/pokemon-list-item.entity";
import { PokemonTypeBadge } from "./pokemon-type-badge";

interface Props {
  pokemon: PokemonListItem;
  onClick(): void;
}

export function PokemonCard({ pokemon, onClick }: Props) {
  return (
    <article
      onClick={onClick}
      className="
        cursor-pointer
        rounded-2xl
        bg-white
        p-5
        shadow-sm
        border
        border-slate-200
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex justify-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="
            h-32
            w-32
            object-contain
          "
        />
      </div>

      <div
        className="
                  flex
                  gap-2
                  flex-wrap
                "
      >
        {pokemon.types.map((type) => (
          <PokemonTypeBadge key={type.name} name={type.name} />
        ))}
      </div>

      <div className="mt-4 text-center">
        <h3
          className="
            text-lg
            font-bold
            capitalize
            text-slate-800
          "
        >
          {pokemon.name}
        </h3>
      </div>
    </article>
  );
}
