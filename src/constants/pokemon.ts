// src/constants/pokemon.ts

export const POKEMON_TYPES = [
    { id: 'normal', name: 'ノーマル', color: 'bg-gray-400' },
    { id: 'fire', name: 'ほのお', color: 'bg-red-500' },
    { id: 'water', name: 'みず', color: 'bg-blue-500' },
    { id: 'electric', name: 'でんき', color: 'bg-yellow-400' },
    { id: 'grass', name: 'くさ', color: 'bg-green-500' },
    { id: 'ice', name: 'こおり', color: 'bg-blue-200' },
    { id: 'fighting', name: 'かくとう', color: 'bg-red-700' },
    { id: 'poison', name: 'どく', color: 'bg-purple-500' },
    { id: 'ground', name: 'じめん', color: 'bg-yellow-600' },
    { id: 'flying', name: 'ひこう', color: 'bg-indigo-300' },
    { id: 'psychic', name: 'エスパー', color: 'bg-pink-500' },
    { id: 'bug', name: 'むし', color: 'bg-green-400' },
    { id: 'rock', name: 'いわ', color: 'bg-yellow-700' },
    { id: 'ghost', name: 'ゴースト', color: 'bg-purple-700' },
    { id: 'dragon', name: 'ドラゴン', color: 'bg-indigo-600' },
    { id: 'dark', name: 'あく', color: 'bg-gray-700' },
    { id: 'steel', name: 'はがね', color: 'bg-gray-500' },
    { id: 'fairy', name: 'フェアリー', color: 'bg-pink-300' }
  ] as const;
  
  // 型の定義
  export type PokemonTypeId = typeof POKEMON_TYPES[number]['id'];