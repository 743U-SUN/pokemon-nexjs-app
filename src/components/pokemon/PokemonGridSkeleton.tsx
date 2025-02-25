// src/components/pokemon/PokemonGridSkeleton.tsx
import { PokemonCardSkeleton } from './PokemonCardSkeleton';

interface Props {
  count?: number;
  includeSearchBar?: boolean;
}

export const PokemonGridSkeleton = ({ count = 12, includeSearchBar = true }: Props) => {
  return (
    <>
      {includeSearchBar && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm animate-pulse">
          {/* 検索バー入力欄 */}
          <div className="mb-4">
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
          
          {/* タイプフィルタースケルトン */}
          <div className="mb-2">
            <div className="h-4 bg-gray-200 rounded w-36 mb-2"></div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-full w-16"></div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(count)].map((_, index) => (
          <PokemonCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
};

export default PokemonGridSkeleton;