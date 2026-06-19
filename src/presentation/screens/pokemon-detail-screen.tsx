import { useParams } from "react-router-dom";

import { Loading } from "@/presentation/components/loading";
import { ErrorState } from "@/presentation/components/error-state";
import { EmptyState } from "@/presentation/components/empty-state";

import { FavoriteButton } from "@/presentation/components/core/favorite-button";
import { PokemonTypeBadge } from "@/presentation/components/core/pokemon-type-badge";

import { useFavoritePokemons } from "@/presentation/hooks/use-favorites";

import { useToggleFavoritePokemon } from "@/presentation/hooks/use-toogle-favorite";

import { usePokemon } from "@/presentation/hooks/use-pokemon";

export function PokemonDetailScreen() {
  const { id } = useParams<{
    id: string;
  }>();

  if (!id) {
    return <ErrorState title="Invalid Pokémon id" />;
  }

  const { data: pokemon, isLoading, error } = usePokemon(id);

  const { data: favorites = [] } = useFavoritePokemons();

  const toggleFavoriteMutation = useToggleFavoritePokemon();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState title="Unable to load Pokémon" />;
  }

  if (!pokemon) {
    return <EmptyState title="Pokémon not found" />;
  }

  const isFavorite = favorites.some(
    (favorite) => favorite.pokemonId === pokemon.id
  );

  return (
    <main
      className="
        mx-auto
        max-w-4xl
        p-6
      "
    >
      <section
        className="
    rounded-3xl
    bg-white
    p-8
    shadow-lg
    border
    border-slate-200
    flex
    flex-col
    gap-6
  "
      >
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="
    mx-auto
    h-72
    object-contain
  "
        />

        <div>
          <h1
            className="
              text-4xl
              font-bold
            "
          >
            {pokemon.name}
          </h1>
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

        <div
          className="
            grid
            grid-cols-2
            gap-4
          "
        >
          <div>
            <strong>Height</strong>

            <p>{pokemon.formattedHeight}</p>
          </div>

          <div>
            <strong>Weight</strong>

            <p>{pokemon.formattedWeight}</p>
          </div>
        </div>

        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => toggleFavoriteMutation.mutate(pokemon.id)}
        />
      </section>
    </main>
  );
}
