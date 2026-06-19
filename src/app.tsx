import { RouterProvider } from "react-router-dom";
import { QueryProvider } from "@presentation/providers/query-provider";
/* import { ToastProvider } from "@presentation/components/core/Toast"; */
import { router } from "@/presentation/routes/router";

export function App() {
  return (
      <QueryProvider>
        {/* <ToastProvider> */}
          <RouterProvider router={router} />
        {/* </ToastProvider> */}
      </QueryProvider>
  );
}
