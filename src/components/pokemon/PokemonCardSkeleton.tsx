// src/components/pokemon/PokemonCardSkeleton.tsx
export const PokemonCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
      {/* スケルトンの画像部分 */}
      <div className="aspect-square relative w-full bg-gray-200 animate-pulse" />
      
      {/* スケルトンのテキスト部分 */}
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mx-auto mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mx-auto mb-2" />
        
        {/* タイプ用のスケルトン */}
        <div className="flex justify-center gap-1 mt-3">
          <div className="h-5 bg-gray-200 rounded-full animate-pulse w-16" />
          <div className="h-5 bg-gray-200 rounded-full animate-pulse w-16" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCardSkeleton;