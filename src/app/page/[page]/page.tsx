// src/app/page/[page]/page.tsx
import { fetchPokemonList } from '@/utils/api';
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { Pagination } from '@/components/pokemon/Pagination';
import { SearchBarWrapper } from '@/components/pokemon/SearchBarWrapper';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    page: string;
  };
  searchParams: {
    search?: string;
    types?: string;
  };
}

export default async function PokemonPage({ params, searchParams }: Props) {
  const { page } = params;
  const currentPage = Number(page);
  
  // URLからの検索パラメータを取得
  const searchQuery = searchParams.search || '';
  const typeFilters = searchParams.types ? searchParams.types.split(',') : [];

  // バリデーション
  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  try {
    const { pokemonList, totalPages, totalCount } = await fetchPokemonList(
      currentPage,
      searchQuery,
      typeFilters
    );

    // 存在しないページや、検索結果が0件でページが1より大きい場合は404
    if (currentPage > totalPages && !(totalCount === 0 && currentPage === 1)) {
      notFound();
    }

    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">ポケモン一覧</h1>
        
        {/* 検索バーコンポーネント */}
        <SearchBarWrapper 
          initialSearch={searchQuery}
          initialTypes={typeFilters}
        />
        
        {/* 検索結果の表示 */}
        {totalCount > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                {searchQuery || typeFilters.length > 0 ? (
                  `検索結果: ${totalCount}件のポケモンが見つかりました`
                ) : (
                  `全 ${totalCount}匹のポケモン`
                )}
              </p>
            </div>
            <PokemonGrid pokemons={pokemonList} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-600 mb-2">検索結果が見つかりませんでした</p>
            <p className="text-gray-500">検索条件を変更して再度お試しください</p>
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error('Error in page component:', error);  // ログは残す
    throw error; // エラーを再スローして、Next.jsのエラーハンドリングを使用
  }
}