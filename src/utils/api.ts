// src/utils/api.ts
import { PokemonListResponseType, PokemonCardType } from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';
const ITEMS_PER_PAGE = 12;

// URLからポケモンのIDを抽出する関数
const extractPokemonId = (url: string): number => {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};

// ポケモンの画像URLを生成する関数
const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

// ポケモン一覧を取得する関数
export async function fetchPokemonList(page: number = 1): Promise<{
  pokemonList: PokemonCardType[];
  totalPages: number;
}> {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon list');
    }

    // PokemonListResponseTypeはTypeScriptの型（types/pokemon.ts参照）
    const data: PokemonListResponseType = await response.json();
    
    const pokemonList = data.results.map((pokemon): PokemonCardType => {
      const id = extractPokemonId(pokemon.url);
      return {
        id,
        name: pokemon.name,
        imageUrl: getPokemonImageUrl(id)
      };
    });

    const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);

    return {
      pokemonList,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
}