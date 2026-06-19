import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "@/presentation/components/loading";
import { ErrorState } from "@/presentation/components/error-state";
import { EmptyState } from "@/presentation/components/empty-state";

import { FavoriteButton } from "@/presentation/components/core/favorite-button";
import { PokemonTypeBadge } from "@/presentation/components/core/pokemon-type-badge";

import { useFavoritePokemons } from "@/presentation/hooks/use-favorites";
import { useToggleFavoritePokemon } from "@/presentation/hooks/use-toogle-favorite";
import { usePokemon } from "@/presentation/hooks/use-pokemon";

export function PokemonDetailScreen() {
  const navigate = useNavigate();

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
    return (
      <EmptyState
        title="Pokémon no encontrado"
        description="El Pokémon solicitado no existe."
        actionLabel="Volver al catálogo"
        onAction={() => navigate("/")}
      />
    );
  }

  const favoriteIds = new Set(favorites.map((favorite) => favorite.pokemonId));

  const isFavorite = favoriteIds.has(pokemon.id);

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate(pokemon.id);
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      <section
        className="
          flex
          flex-col
          gap-6
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-lg
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
          <h1 className="text-4xl font-bold">{pokemon.name}</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <PokemonTypeBadge key={type.name} name={type.name} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
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
          onToggle={handleToggleFavorite}
        />
      </section>
    </main>
  );
}
