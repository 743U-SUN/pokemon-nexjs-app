import Image from 'next/image';
import { PokemonCardType } from '@/types/pokemon';

interface Props {
  pokemon: PokemonCardType;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { name, imageUrl } = pokemon;

  return (
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
      </div>
    </div>
  );
};

export default PokemonCard;