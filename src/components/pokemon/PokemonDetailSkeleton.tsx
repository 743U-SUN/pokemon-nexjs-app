// src/components/pokemon/PokemonDetailSkeleton.tsx

export const PokemonDetailSkeleton = () => {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
        {/* ヘッダー部分 */}
        <div className="p-6 bg-gray-100">
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
  
        {/* メインコンテンツ */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 左側：画像とタイプ情報 */}
            <div>
              <div className="relative aspect-square w-full max-w-sm mx-auto bg-gray-200 rounded-lg"></div>
              
              <div className="mt-6">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 bg-gray-300 rounded-full w-16"></div>
                  <div className="h-8 bg-gray-300 rounded-full w-16"></div>
                </div>
              </div>
            </div>
  
            {/* 右側：詳細情報 */}
            <div>
              {/* 基本情報 */}
              <div className="mb-6">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
  
              {/* 特性 */}
              <div className="mb-6">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 bg-gray-300 rounded-lg w-20"></div>
                  <div className="h-8 bg-gray-300 rounded-lg w-20"></div>
                </div>
              </div>
  
              {/* ステータス */}
              <div>
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="space-y-3">
                  {[...Array(6)].map((_, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div className="h-5 bg-gray-300 rounded w-16"></div>
                        <div className="h-5 bg-gray-300 rounded w-8"></div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gray-300 h-2.5 rounded-full"
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PokemonDetailSkeleton;