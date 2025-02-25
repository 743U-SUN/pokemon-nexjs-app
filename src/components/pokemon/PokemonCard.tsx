// src/components/pokemon/PokemonCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { PokemonCardType } from '@/types/pokemon';
import { POKEMON_TYPES } from '@/constants/pokemon';

interface Props {
  pokemon: PokemonCardType;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { id, name, imageUrl, types } = pokemon;

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

  return (
    <Link href={`/pokemon/${id}`} className="block">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
        <div className="aspect-square relative w-full">
          <Image
            src={imageUrl}
            alt={`Picture of ${name}`}
            fill
            priority
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold capitalize text-gray-800 text-center mb-2">
            {name}
          </h2>
          <p className="text-sm text-gray-500 text-center mb-2">#{id}</p>
          
          {/* ポケモンのタイプを表示 */}
          {types && types.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {types.map((type, index) => (
                <span
                  key={index}
                  className={`${
                    typeColors[type] || 'bg-gray-400'
                  } text-white text-xs px-2 py-1 rounded-full capitalize`}
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;