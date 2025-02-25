// src/utils/api.ts
import { PokemonListResponseType, PokemonListItemType, PokemonCardType, PokemonDetailType, PokemonTypeResponseType } from '@/types/pokemon';

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
export async function fetchPokemonList(page: number = 1, search: string = '', types: string[] = []): Promise<{
  pokemonList: PokemonCardType[];
  totalPages: number;
  totalCount: number;
}> {
  // タイプフィルタがある場合
  if (types.length > 0) {
    return fetchPokemonByTypes(types, page, search);
  }
  
  // 通常の一覧取得（検索あり/なし）
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
    
    let filteredResults = data.results;
    
    // 検索キーワードがある場合、名前でフィルタリング
    if (search) {
      const searchLower = search.toLowerCase();
      filteredResults = data.results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchLower)
      );
    }
    
    const pokemonList = await Promise.all(
      filteredResults.map(async (pokemon): Promise<PokemonCardType> => {
        const id = extractPokemonId(pokemon.url);
        return {
          id,
          name: pokemon.name,
          imageUrl: getPokemonImageUrl(id),
          types: await fetchPokemonTypes(id) // タイプ情報も取得
        };
      })
    );

    // 検索時は、実際に検索にヒットした数に基づいてページ数を計算
    const totalCount = search ? filteredResults.length : data.count;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return {
      pokemonList,
      totalPages,
      totalCount
    };
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
}

// ポケモンのタイプ情報を取得する関数
async function fetchPokemonTypes(id: number): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon type for id: ${id}`);
    }
    
    const data = await response.json();
    return data.types.map((type: any) => type.type.name);
  } catch (error) {
    console.error(`Error fetching types for Pokemon ${id}:`, error);
    return []; // エラー時は空配列を返す
  }
}

// タイプ別のポケモンを取得する関数
async function fetchPokemonByTypes(
  types: string[], 
  page: number = 1, 
  search: string = ''
): Promise<{
  pokemonList: PokemonCardType[];
  totalPages: number;
  totalCount: number;
}> {
  try {
    // 複数タイプの場合、それぞれのタイプごとのポケモンを取得
    const typePromises = types.map(async (type) => {
      const response = await fetch(`${BASE_URL}/type/${type}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon for type: ${type}`);
      }
      
      // loading確認用ディレイ
      await delay(1000);
      
      const data: PokemonTypeResponseType = await response.json();
      return data.pokemon.map((p) => ({
        name: p.pokemon.name,
        url: p.pokemon.url
      }));
    });
    
    // すべてのタイプAPIからの結果を取得
    const typeResults = await Promise.all(typePromises);
    
    // 複数タイプがある場合、共通するポケモンだけをフィルタリング
    let commonPokemons;
    if (typeResults.length > 1) {
      // 最初のタイプのポケモン名を集合として保持
      const firstTypeNames = new Set(typeResults[0].map((p) => p.name));
      
      // 2つ目以降のタイプについて、共通するポケモン名のみを残す
      commonPokemons = typeResults[1].filter((p) => firstTypeNames.has(p.name));
      
      // 3つ目以降のタイプがあれば、さらに絞り込む
      for (let i = 2; i < typeResults.length; i++) {
        const typeNames = new Set(typeResults[i].map((p) => p.name));
        commonPokemons = commonPokemons.filter((p) => typeNames.has(p.name));
      }
    } else {
      // 単一タイプの場合はそのまま使用
      commonPokemons = typeResults[0];
    }
    
    // 検索語でフィルタリング
    let filteredPokemons = commonPokemons;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPokemons = commonPokemons.filter((p) => 
        p.name.toLowerCase().includes(searchLower)
      );
    }
    
    // ページネーション処理
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedPokemons = filteredPokemons.slice(startIndex, endIndex);
    
    // 詳細情報取得
    const pokemonList = await Promise.all(
      paginatedPokemons.map(async (pokemon): Promise<PokemonCardType> => {
        const id = extractPokemonId(pokemon.url);
        return {
          id,
          name: pokemon.name,
          imageUrl: getPokemonImageUrl(id),
          types: types // APIでフィルタしているため、指定したタイプを設定
        };
      })
    );
    
    const totalCount = filteredPokemons.length;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    
    return {
      pokemonList,
      totalPages,
      totalCount
    };
  } catch (error) {
    console.error('Error fetching Pokemon by types:', error);
    throw error;
  }
}

// 特定のポケモンの詳細情報を取得する関数
export async function fetchPokemonDetail(id: number): Promise<PokemonDetailType> {
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