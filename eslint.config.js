import js from "@eslint/js"; // Importa la configuración recomendada de ESLint para JavaScript, que incluye un conjunto de reglas básicas para mantener un código limpio y consistente.
import globals from "globals"; // Importa el paquete "globals" que proporciona una lista de variables globales predefinidas para diferentes entornos, como el navegador o Node.js. Esto ayuda a ESLint a reconocer estas variables y evitar falsos positivos al analizarlas.
import reactHooks from "eslint-plugin-react-hooks"; // Importa el plugin de ESLint para React Hooks, que proporciona reglas específicas para el uso correcto de los hooks en React.
import reactRefresh from "eslint-plugin-react-refresh"; // Importa el plugin de ESLint para React Refresh, que ayuda a detectar problemas relacionados con la actualización en caliente de React durante el desarrollo.
import tseslint from "typescript-eslint"; // Importa el plugin de ESLint para TypeScript, que proporciona reglas específicas para el análisis de código TypeScript, ayudando a mantener un código limpio y libre de errores comunes en TypeScript.
import { defineConfig, globalIgnores } from "eslint/config"; // Importa la función defineConfig y globalIgnores para configurar ESLint.
import prettier from "eslint-config-prettier"; // Desactiva reglas de ESLint que puedan entrar en conflicto con Prettier.

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended, // Configura ESLint para usar las reglas recomendadas de JavaScript, TypeScript y React Hooks, además de desactivar cualquier regla que pueda entrar en conflicto con Prettier.
      reactRefresh.configs.vite, // Configura ESLint para usar las reglas recomendadas de JavaScript, TypeScript, React Hooks y React Refresh, además de desactivar cualquier regla que pueda entrar en conflicto con Prettier.
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser, // Configura ESLint para reconocer las variables globales del entorno del navegador, lo que ayuda a evitar falsos positivos al analizar el código.
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
]);
