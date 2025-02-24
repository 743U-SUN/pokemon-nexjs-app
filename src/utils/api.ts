// src/utils/api.ts
import { PokemonListResponseType, PokemonCardType, PokemonDetail } from '@/types/pokemon';

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

// loading確認用ディレイ（後で消す。）
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
    // loading確認用ディレイ（後で消す。）
    await delay(3000); // 3秒の遅延

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

// 特定のポケモンの詳細情報を取得する関数

export async function fetchPokemonDetail(id: number): Promise<PokemonDetail> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon detail');
    }

    // loading確認用ディレイ（後で消す。）
    await delay(2000); // 2秒の遅延

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      imageUrl: getPokemonImageUrl(data.id),
      height: data.height / 10, // メートル単位に変換（APIでは10cm単位）
      weight: data.weight / 10, // キログラム単位に変換（APIでは100g単位）
      types: data.types.map((type: any) => ({
        name: type.type.name,
        url: type.type.url,
      })),
      abilities: data.abilities.map((ability: any) => ({
        name: ability.ability.name,
        url: ability.ability.url,
      })),
      stats: data.stats.map((stat: any) => ({
        name: stat.stat.name,
        baseStat: stat.base_stat,
      })),
    };
  } catch (error) {
    console.error('Error fetching Pokemon detail:', error);
    throw error;
  }
}