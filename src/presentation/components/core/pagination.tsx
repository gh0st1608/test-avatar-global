interface Props {
  page: number;
  onPrevious(): void;
  onNext(): void;
}

export function Pagination({ page, onPrevious, onNext }: Props) {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        disabled={page === 0}
        onClick={onPrevious}
        className="
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-2
          shadow-sm
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        ← Anterior
      </button>

      <span className="font-medium text-slate-600">Página {page + 1}</span>

      <button
        onClick={onNext}
        className="
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-2
          shadow-sm
        "
      >
        Siguiente →
      </button>
    </div>
  );
}
