// src/components/pokemon/PokemonCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { PokemonCardType } from '@/types/pokemon';

interface Props {
  pokemon: PokemonCardType;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { id, name, imageUrl } = pokemon;

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
        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold capitalize text-gray-800">
            {name}
          </h2>
          <p className="text-sm text-gray-500">#{id}</p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;