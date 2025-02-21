// src/components/pokemon/PokemonCardSkeleton.tsx
export const PokemonCardSkeleton = () => {
    return (
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
        {/* スケルトンの画像部分 */}
        <div className="aspect-square relative w-full bg-gray-200 animate-pulse" />
        {/* スケルトンのテキスト部分 */}
        <div className="p-4 text-center">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
        </div>
      </div>
    );
  };
  
  export default PokemonCardSkeleton;