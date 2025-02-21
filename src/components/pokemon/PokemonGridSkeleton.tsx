// src/components/pokemon/PokemonGridSkeleton.tsx
import { PokemonCardSkeleton } from './PokemonCardSkeleton';

interface Props {
  count?: number;
}

export const PokemonGridSkeleton = ({ count = 12 }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(count)].map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default PokemonGridSkeleton;