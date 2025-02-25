// src/types/pokemon.ts
// 命名規則 -> Typeで終わること。

export interface PokemonListResponseType {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemType[];
}

export interface PokemonListItemType {
  name: string;
  url: string;
}

export interface PokemonCardType {
  id: number;
  name: string;
  imageUrl: string;
  types: string[]; // タイプ情報を追加
}

export interface PokemonDetailType {
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

// タイプ関連の型を追加
export interface PokemonTypeResponseType {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}