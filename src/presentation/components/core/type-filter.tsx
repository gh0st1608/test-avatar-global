interface Props {
  value: string;
  onChange(
    type: string,
  ): void;
}

export function TypeFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value,
        )
      }
    >
      <option value="">
        Todos
      </option>

      <option value="fire">
        Fire
      </option>

      <option value="water">
        Water
      </option>

      <option value="grass">
        Grass
      </option>
    </select>
  );
}