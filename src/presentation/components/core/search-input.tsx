interface Props {
  value: string;
  onChange(
    value: string,
  ): void;
}

export function SearchInput({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      placeholder="Buscar Pokémon..."
      onChange={(e) =>
        onChange(
          e.target.value,
        )
      }
    />
  );
}