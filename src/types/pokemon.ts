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