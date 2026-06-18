import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemons } from "@presentation/hooks/use-pokemons";
import { PokemonCard } from "@/presentation/components/core/pokemon-card";
import { SearchInput } from "@/presentation/components/core/search-input";
import { EmptyState } from "@presentation/components/empty-state";
import { ErrorState } from "@presentation/components/error-state";
import { Loading } from "@presentation/components/loading";

export function PokemonListScreen() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, error } = usePokemons(page);

  if (isLoading) return <Loading />;

  if (error) return <ErrorState />;

  if (!data || data.length === 0) return <EmptyState />;

  return (
    <>
      <SearchInput value={search} onChange={setSearch} />

      <div>
        {data.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => navigate(`/pokemon/${pokemon.id}`)}
          />
        ))}
      </div>
    </>
  );
}

function useDebounce(search: string) {
  throw new Error("Function not implemented.");
}
