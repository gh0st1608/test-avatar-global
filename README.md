# Frontend Avatar Global - Pokédex

Aplicación web desarrollada con React, TypeScript y Vite que implementa una arquitectura Hexagonal (Ports & Adapters) para garantizar desacoplamiento, mantenibilidad, escalabilidad y testabilidad.

La aplicación consume la PokéAPI para permitir la exploración, búsqueda, filtrado y gestión de Pokémon favoritos.

---

# Tabla de Contenido

- [Características](#características)
- [Arquitectura](#arquitectura)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Flujo de Datos](#flujo-de-datos)
- [Inyección de Dependencias](#inyección-de-dependencias)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Testing](#testing)
- [Escalabilidad](#escalabilidad)
- [Principios de Diseño](#principios-de-diseño)

---

# Características

## Funcionales

- Listado paginado de Pokémon.
- Búsqueda por nombre.
- Filtrado por tipo.
- Visualización de detalle.
- Gestión de favoritos.
- Persistencia local de favoritos.

## Técnicas

- Arquitectura Hexagonal.
- Clean Architecture.
- Dependency Injection.
- React Query.
- Repository Pattern.
- Use Cases.
- Storage Adapters.
- TypeScript Strict Mode.
- Testing Ready.

---

# Arquitectura

El proyecto sigue el patrón **Hexagonal Architecture (Ports & Adapters)**.

```text
                        ┌────────────────────┐
                        │    Presentation    │
                        │ React Components   │
                        │ Hooks / Screens    │
                        └──────────┬─────────┘
                                   │
                                   ▼
                        ┌────────────────────┐
                        │    Application     │
                        │     Use Cases      │
                        └──────────┬─────────┘
                                   │
                                   ▼
                        ┌────────────────────┐
                        │       Domain       │
                        │ Entities & Ports   │
                        └──────────┬─────────┘
                                   │
                                   ▼
                        ┌────────────────────┐
                        │   Infrastructure   │
                        │ APIs / Storage     │
                        └────────────────────┘
```

## Objetivos

- Separar reglas de negocio del framework.
- Reducir acoplamiento.
- Facilitar testing.
- Permitir reemplazar infraestructura sin afectar negocio.
- Mejorar mantenibilidad a largo plazo.

---

# Stack Tecnológico

## Frontend

- React 19
- TypeScript
- Vite
- React Router DOM

## State Management

- TanStack Query

## Styling

- Tailwind CSS v4

## Validation

- Zod

## Testing

- Jest
- React Testing Library

## Storage

- Browser LocalStorage

---

# Estructura del Proyecto

```text
src
│
├── application
│   ├── dto
│   └── usecases
│
├── bootstrap
│   └── container.ts
│
├── domain
│   ├── entities
│   ├── ports
│   └── errors
│
├── infrastructure
│   ├── api
│   ├── repositories
│   └── storage
│
├── presentation
│   ├── components
│   ├── hooks
│   ├── providers
│   ├── routes
│   └── screens
│
└── main.tsx
```

---

# Capas

## Domain

Contiene el núcleo del negocio.

No depende de:

- React
- Vite
- HTTP
- LocalStorage
- Frameworks externos

### Entities

```typescript
Pokemon
PokemonType
FavoritePokemon
```

### Ports

Los puertos definen contratos que deben ser implementados por la infraestructura.

Ejemplo:

```typescript
export interface PokemonRepositoryPort {
  getPokemons(page: number): Promise<Pokemon[]>;
  getPokemonById(id: string): Promise<Pokemon>;
}
```

---

## Application

Contiene los casos de uso.

Representa las acciones que la aplicación puede ejecutar.

### Casos de Uso

```text
GetPokemonsUseCase
GetPokemonByIdUseCase
GetPokemonByNameUseCase
GetPokemonTypesUseCase
GetPokemonsByTypeUseCase

GetFavoritePokemonsUseCase
ToggleFavoritePokemonUseCase
IsFavoritePokemonUseCase
```

Ejemplo:

```typescript
await getPokemonByIdUseCase.execute(id);
```

---

## Infrastructure

Implementa los contratos definidos en Domain.

### API Repository

```typescript
PokemonApiRepositoryImpl
```

Responsable de:

- Consumir PokéAPI.
- Mapear respuestas externas.
- Adaptar DTOs al dominio.

### Storage Repository

```typescript
FavoritePokemonRepositoryImpl
```

Responsable de:

- Persistir favoritos.
- Gestionar LocalStorage.

### HTTP Client

```typescript
FetchHttpClient
```

Encapsula:

```typescript
fetch()
```

para desacoplar la implementación HTTP.

---

## Presentation

Contiene toda la lógica visual.

### Screens

Representan páginas completas.

```text
PokemonListScreen
PokemonDetailScreen
```

### Components

Representan piezas reutilizables de UI.

```text
PokemonCard
SearchInput
Pagination
FavoriteButton
TypeFilter
```

### Hooks

Encapsulan interacción con React Query y Use Cases.

```typescript
usePokemons()
usePokemon()
usePokemonTypes()
useFavorites()
```

---

# Flujo de Datos

Ejemplo: Obtener Pokémon

```text
Screen
  │
  ▼
Hook
  │
  ▼
Use Case
  │
  ▼
Repository Port
  │
  ▼
Repository Implementation
  │
  ▼
HTTP Client
  │
  ▼
PokéAPI
```

Ejemplo real:

```text
PokemonListScreen
    │
    ▼
usePokemons()
    │
    ▼
GetPokemonsUseCase
    │
    ▼
PokemonRepositoryPort
    │
    ▼
PokemonApiRepositoryImpl
    │
    ▼
FetchHttpClient
```

---

# Inyección de Dependencias

Todas las dependencias son registradas en:

```text
src/bootstrap/container.ts
```

Ejemplo:

```typescript
const pokemonRepository =
  new PokemonApiRepositoryImpl(httpClient);

const getPokemonsUseCase =
  new GetPokemonsUseCase(pokemonRepository);
```

Beneficios:

- Bajo acoplamiento.
- Fácil testing.
- Sustitución sencilla de implementaciones.

---

# Gestión de Estado

La aplicación utiliza:

```bash
@tanstack/react-query
```

para gestionar estado remoto.

Beneficios:

- Cache automática.
- Revalidación.
- Loading states.
- Error handling.
- Query invalidation.
- Optimización de peticiones.

Ejemplo:

```typescript
const { data } = useQuery({
  queryKey: ["pokemons", page],
  queryFn: () =>
    container.getPokemons.execute(page),
});
```

---

# Persistencia Local

Los Pokémon favoritos son almacenados en:

```text
LocalStorage
```

mediante un adaptador específico.

```text
FavoritePokemonRepositoryImpl
```

Esto permite reemplazar fácilmente el mecanismo de almacenamiento por:

- IndexedDB
- SQLite
- Firebase
- Backend API

sin modificar el dominio.

---

# Instalación

## Clonar repositorio

```bash
git clone <repository-url>
```

```bash
cd frontend-avatar-global
```

## Instalar dependencias

```bash
pnpm install
```

## Ejecutar entorno local

```bash
pnpm dev
```

Aplicación disponible en:

```text
http://localhost:5173
```

---

# Variables de Entorno

Crear archivo:

```bash
.env
```

Ejemplo:

```env
VITE_API_URL=https://pokeapi.co/api/v2
```

---

# Scripts

## Desarrollo

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Preview

```bash
pnpm preview
```

## Lint

```bash
pnpm lint
```

## Tests

```bash
pnpm test
```

## Coverage

```bash
pnpm test --coverage
```

---

# Testing

La arquitectura permite realizar pruebas unitarias de forma aislada.

## Casos de Uso

```typescript
GetPokemonsUseCase
GetPokemonByIdUseCase
ToggleFavoritePokemonUseCase
```

utilizando mocks de:

```typescript
PokemonRepositoryPort
FavoritePokemonRepositoryPort
```

sin depender de:

- React
- API real
- LocalStorage

---

# Escalabilidad

La arquitectura actual permite incorporar fácilmente:

## Nuevos módulos

```text
Abilities
Moves
Regions
Battles
Trainers
```

## Nuevos proveedores de datos

```text
REST
GraphQL
Firebase
Supabase
```

## Nuevos mecanismos de almacenamiento

```text
IndexedDB
SQLite
Remote Storage
```

sin modificar Presentation ni Domain.

---

# Principios de Diseño

## SOLID

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

## Clean Code

- Naming consistente.
- Separación de responsabilidades.
- Dependencias explícitas.
- Alta cohesión.
- Bajo acoplamiento.

## Arquitectura

- Hexagonal Architecture
- Repository Pattern
- Dependency Injection
- Use Case Pattern
- Adapter Pattern

---

# Consideraciones

Este proyecto fue diseñado para demostrar buenas prácticas modernas de desarrollo Frontend aplicando conceptos comúnmente utilizados en aplicaciones empresariales de gran escala.

La arquitectura favorece:

- Mantenibilidad.
- Testabilidad.
- Escalabilidad.
- Evolución continua del producto.
- Independencia tecnológica.

---

# Autor

Desarrollado como ejercicio técnico aplicando Arquitectura Hexagonal, Clean Architecture y principios SOLID sobre React + TypeScript.
