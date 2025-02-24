// src/components/pokemon/PokemonDetail.tsx
import Image from 'next/image';
import Link from 'next/link';
import { PokemonDetail as PokemonDetailType } from '@/types/pokemon';

interface Props {
  pokemon: PokemonDetailType;
}

export const PokemonDetail = ({ pokemon }: Props) => {
  const { id, name, imageUrl, height, weight, types, abilities, stats } = pokemon;

  // タイプごとの背景色マップ
  const typeColors: { [key: string]: string } = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };

  // ステータスの最大値（表示用）
  const maxStatValue = 255;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold capitalize text-gray-800">
            {name} <span className="text-gray-500">#{id}</span>
          </h1>
          <Link 
            href="/page/1" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            一覧に戻る
          </Link>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左側：画像とタイプ情報 */}
          <div>
            <div className="relative aspect-square w-full max-w-sm mx-auto bg-gray-50 rounded-lg">
              <Image
                src={imageUrl}
                alt={`Picture of ${name}`}
                fill
                priority
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">タイプ</h2>
              <div className="flex flex-wrap gap-2">
                {types.map((type, index) => (
                  <span
                    key={index}
                    className={`${
                      typeColors[type.name] || 'bg-gray-400'
                    } text-white px-3 py-1 rounded-full capitalize`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 右側：詳細情報 */}
          <div>
            {/* 基本情報 */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">基本情報</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">高さ</p>
                  <p className="font-medium">{height} m</p>
                </div>
                <div>
                  <p className="text-gray-600">重さ</p>
                  <p className="font-medium">{weight} kg</p>
                </div>
              </div>
            </div>

            {/* 特性 */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">特性</h2>
              <div className="flex flex-wrap gap-2">
                {abilities.map((ability, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded-lg capitalize"
                  >
                    {ability.name}
                  </span>
                ))}
              </div>
            </div>

            {/* ステータス */}
            <div>
              <h2 className="text-xl font-semibold mb-2">ステータス</h2>
              <div className="space-y-3">
                {stats.map((stat, index) => {
                  // ステータス名を日本語に変換
                  const statNameMap: { [key: string]: string } = {
                    'hp': 'HP',
                    'attack': '攻撃',
                    'defense': '防御',
                    'special-attack': '特攻',
                    'special-defense': '特防',
                    'speed': '素早さ'
                  };

                  const percentage = (stat.baseStat / maxStatValue) * 100;
                  
                  // ステータス値に応じた色
                  let barColor = 'bg-red-500';
                  if (stat.baseStat > 49) barColor = 'bg-yellow-500';
                  if (stat.baseStat > 79) barColor = 'bg-green-500';

                  return (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{statNameMap[stat.name] || stat.name}</span>
                        <span>{stat.baseStat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`${barColor} h-2.5 rounded-full`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;