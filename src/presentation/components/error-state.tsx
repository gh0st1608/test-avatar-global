interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?(): void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
  onRetry,
}: ErrorStateProps) {
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

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="
            rounded
            border
            px-4
            py-2
          "
        >
          Retry
        </button>
      )}
    </div>
  );
}