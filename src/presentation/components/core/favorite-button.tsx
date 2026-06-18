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
    >
      {isFavorite
        ? "❤️ Remove Favorite"
        : "🤍 Add Favorite"}
    </button>
  );
}