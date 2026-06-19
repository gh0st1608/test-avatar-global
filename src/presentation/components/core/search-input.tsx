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
        onChange(e.target.value)
      }
      className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-blue-50
        px-4
        py-3
        shadow-sm
        outline-none
        transition
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-100
      "
    />
  );
}