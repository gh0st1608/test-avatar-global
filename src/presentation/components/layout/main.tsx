import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-violet-50
        via-purple-50
        to-slate-100
      "
    >
      <header
        className="
          sticky
          top-0
          z-10
          border-b
          border-violet-100
          bg-white/80
          backdrop-blur
        "
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1
            className="
              text-2xl
              font-bold
              text-violet-700
            "
          >
            Proyecto Pokémon - Avatar Global
          </h1>
        </div>
      </header>

      <main
        className="
          mx-auto
          max-w-7xl
          p-6
        "
      >
        <Outlet />
      </main>
    </div>
  );
}