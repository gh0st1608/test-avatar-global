import { PokemonType } from "@/domain/entities/pokemon-type.entity";

interface Props {
  value: string;
  types: PokemonType[];
  onChange(type: string): void;
}

export function TypeFilter({ value, types, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        shadow-sm
        outline-none
        focus:border-violet-500
      "
    >
      <option value="">Todos</option>

      {types.map((type) => (
        <option
          key={type.name}
          value={type.name}
        >
          {type.name}
        </option>
      ))}
    </select>
  );
}
