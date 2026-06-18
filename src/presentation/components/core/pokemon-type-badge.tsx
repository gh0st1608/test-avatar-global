interface PokemonTypeBadgeProps {
  name: string;
}

export function PokemonTypeBadge({
  name,
}: PokemonTypeBadgeProps) {
  return (
    <span
      className="
        rounded-full
        border
        px-3
        py-1
        text-sm
      "
    >
      {name}
    </span>
  );
}