interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle(): void;
}

export function FavoriteButton({
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="
        rounded-xl
        px-5
        py-3
        font-semibold
        text-white
        transition
        hover:opacity-90
        bg-blue-500
      "
    >
      {isFavorite
        ? "❤️ Remove Favorite"
        : "🤍 Add Favorite"}
    </button>
  );
}