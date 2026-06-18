interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No data found",
  description = "Try adjusting your search criteria.",
}: EmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        gap-4
        py-10
        text-center
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        {title}
      </h2>

      <p>{description}</p>
    </div>
  );
}