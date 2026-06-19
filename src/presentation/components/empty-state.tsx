interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?(): void;
}

export function EmptyState({
  title = "No se encontraron Pokémon",
  description = "Prueba con otro nombre o selecciona un tipo diferente.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex justify-center py-16">
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-violet-100
          bg-white
          p-8
          text-center
          shadow-sm
        "
      >
        <div
          className="
            mx-auto
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-violet-100
            text-4xl
          "
        >
          🔍
        </div>

        <h2
          className="
            text-2xl
            font-bold
            text-slate-800
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-3
            text-slate-500
          "
        >
          {description}
        </p>

        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="
              mt-6
              rounded-xl
              bg-violet-600
              px-5
              py-3
              font-medium
              text-white
              transition
              hover:bg-violet-700
            "
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}