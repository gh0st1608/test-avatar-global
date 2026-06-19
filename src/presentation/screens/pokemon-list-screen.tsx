import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePokemons } from "@presentation/hooks/use-pokemons";
import { usePokemonTypes } from "@presentation/hooks/use-pokemon-types";
import { useFavoritePokemons } from "@presentation/hooks/use-favorites";
import { useDebounce } from "@presentation/hooks/use-debounce";

import { PokemonCard } from "@/presentation/components/core/pokemon-card";
import { SearchInput } from "@/presentation/components/core/search-input";
import { TypeFilter } from "@/presentation/components/core/type-filter";
import { Pagination } from "@/presentation/components/core/pagination";

import { EmptyState } from "@/presentation/components/empty-state";
import { ErrorState } from "@/presentation/components/error-state";
import { Loading } from "@/presentation/components/loading";

export function PokemonListScreen() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setPage(0);
  }, [type, debouncedSearch]);

  const {
    data: pokemons = [],
    isLoading,
    error,
  } = usePokemons(
    page,
    debouncedSearch,
    type,
  );

  const {
    data: pokemonTypes = [],
  } = usePokemonTypes();

  const {
    data: favorites = [],
  } = useFavoritePokemons();

  const favoriteIds = useMemo(
    () =>
      new Set(
        favorites.map(
          (favorite) =>
            favorite.pokemonId,
        ),
      ),
    [favorites],
  );

  const displayedPokemons =
    showFavorites
      ? pokemons.filter(
          (pokemon) =>
            favoriteIds.has(
              pokemon.id,
            ),
        )
      : pokemons;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (displayedPokemons.length === 0) {
    return (
      <EmptyState
        title={
          showFavorites
            ? "No tienes Pokémon favoritos"
            : "No se encontraron Pokémon"
        }
        description={
          showFavorites
            ? "Marca algunos Pokémon como favoritos para verlos aquí."
            : "Prueba con otro nombre o selecciona un tipo diferente."
        }
        actionLabel="Volver al catálogo"
        onAction={() => {
          setSearch("");
          setType("");
          setPage(0);
          setShowFavorites(false);
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Pokédex
        </h1>

        <p className="mt-2 text-slate-500">
          Explora y busca tus Pokémon favoritos
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={setSearch}
          />
        </div>

        <div className="w-full md:w-60">
          <TypeFilter
            value={type}
            types={pokemonTypes}
            onChange={setType}
          />
        </div>
      </div>

      <div className="mb-8 flex items-center">
        <button
          onClick={() =>
            setShowFavorites(
              (current) => !current,
            )
          }
          className={`
            rounded-xl
            px-4
            py-3
            font-medium
            transition-all
            ${
              showFavorites
                ? "bg-violet-600 text-white shadow-md"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }
          `}
        >
          {showFavorites
            ? "❤️ Mostrando favoritos"
            : "🤍 Mostrar favoritos"}
        </button>
      </div>

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {displayedPokemons.map(
          (pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() =>
                navigate(
                  `/pokemon/${pokemon.id}`,
                )
              }
            />
          ),
        )}
      </div>

      {!showFavorites && (
        <Pagination
          page={page}
          onPrevious={() =>
            setPage((current) =>
              Math.max(
                current - 1,
                0,
              ),
            )
          }
          onNext={() =>
            setPage(
              (current) =>
                current + 1,
            )
          }
        />
      )}
    </div>
  );
}