export interface PokemonListItemResponse {
  name: string;
  url: string;
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
  count: number;
  nextPage: number | null;
  statusCode: number;
  message: string;
}

export interface PokemonByTypeResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

export interface PokemonTypeListItemResponse {
  name: string;
  url: string;
}

export interface PokemonTypeListResponse {
  results: PokemonTypeListItemResponse[];
  count: number;
  nextPage: number | null;
}

export interface PokemonByTypeResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}