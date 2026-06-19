import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemons } from "@presentation/hooks/use-pokemons";
import { useDebounce } from "@presentation/hooks/use-debounce";
import { PokemonCard } from "@/presentation/components/core/pokemon-card";
import { SearchInput } from "@/presentation/components/core/search-input";
import { EmptyState } from "@presentation/components/empty-state";
import { ErrorState } from "@presentation/components/error-state";
import { Loading } from "@presentation/components/loading";
import { TypeFilter } from "../components/core/type-filter";
import { usePokemonTypes } from "../hooks/use-pokemon-types";
import { Pagination } from "../components/core/pagination";

export function PokemonListScreen() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setPage(0);
  }, [type, debouncedSearch]);

  const {
    data: pokemons,
    isLoading,
    error,
  } = usePokemons(page, debouncedSearch, type);

  const { data: pokemonTypes = [] } = usePokemonTypes();

  if (isLoading) return <Loading />;

  if (error) return <ErrorState />;

  if (!pokemons || pokemons.length === 0) {
  return (
    <EmptyState
      title="No se encontraron Pokémon"
      description="Prueba con otro nombre o selecciona un tipo diferente."
      actionLabel="Volver al catálogo"
      onAction={() => {
        setSearch("");
        setType("");
        setPage(0);
      }}
    />
  );
}

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Pokédex</h1>

        <p className="mt-2 text-slate-500">
          Explora y busca tus Pokémon favoritos
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div className="w-full md:w-60">
          <TypeFilter value={type} types={pokemonTypes} onChange={setType} />
        </div>
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
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => navigate(`/pokemon/${pokemon.id}`)}
          />
        ))}
      </div>
      <Pagination
        page={page}
        onPrevious={() => setPage((page : number) => Math.max(page - 1, 0))}
        onNext={() => setPage((current) => current + 1)}
      />
    </div>
  );
}
