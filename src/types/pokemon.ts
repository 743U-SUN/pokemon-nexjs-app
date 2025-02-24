// src/types/pokemon.ts

export interface PokemonListResponseType {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonCardType {
  id: number;
  name: string;
  imageUrl: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  types: {
    name: string;
    url: string;
  }[];
  abilities: {
    name: string;
    url: string;
  }[];
  stats: {
    name: string;
    baseStat: number;
  }[];
}