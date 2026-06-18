interface LoadingProps {
  message?: string;
}

export function Loading({
  message = "Loading...",
}: LoadingProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-4
        py-10
      "
    >
      <div
        className="
          h-8
          w-8
          animate-spin
          rounded-full
          border-4
          border-gray-300
          border-t-black
        "
      />

      <p>{message}</p>
    </div>
  );
}