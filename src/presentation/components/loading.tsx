interface LoadingProps {
  message?: string;
}

export function Loading({
  message = "Cargando Pokémon...",
}: LoadingProps) {
  return (
    <div className="flex justify-center py-16">
      <div
        className="
          flex
          w-full
          max-w-sm
          flex-col
          items-center
          rounded-3xl
          border
          border-violet-100
          bg-white
          p-8
          shadow-sm
        "
      >
        <div className="relative">
          <div
            className="
              h-16
              w-16
              animate-spin
              rounded-full
              border-4
              border-violet-100
              border-t-violet-600
            "
          />

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-xl
            "
          >
            ⚡
          </div>
        </div>

        <h3
          className="
            mt-6
            text-lg
            font-semibold
            text-slate-800
          "
        >
          {message}
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Estamos obteniendo la información.
        </p>
      </div>
    </div>
  );
}