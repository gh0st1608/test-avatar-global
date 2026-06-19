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
        bg-slate-100
        px-4
        py-2
        text-sm
        font-medium
        text-slate-700
      "
    >
      {name}
    </span>
  );
}