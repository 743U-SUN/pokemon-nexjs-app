// src/app/page/[page]/page.tsx
import { fetchPokemonList } from '@/utils/api';
// api.tsからfetchPokemonList関数をインポート
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
// PokemonGridコンポーネントから、PokemonGrid関数をインポート
import { Pagination } from '@/components/pokemon/Pagination';
// Paginationコンポーネントから、Pagination関数をインポート
import { SearchBarWrapper } from '@/components/pokemon/SearchBarWrapper';
// SearchBarWrapperコンポーネントから、SearchBarWrapper関数をインポート
import { notFound } from 'next/navigation';
// NextJSの機能から、notFound関数をインポート

// Propの型定義
interface Props {
  params: Promise<{
    page: string;
  }>; // paramsとsearchParamsは非同期処理となるのでPromise付きで型定義。
  searchParams: {
    search?: string;
    types?: string;
  };
}

export default async function PokemonPage({ params, searchParams }: Props) {
  const { page } = await params;
  // 分割代入。 const page = await params.page
  // paramsはNextJSの予約語。動的ルートパラメータ[page]というディレクトリ名に対応している。
  const currentPage = Number(page);
  // currentPage定数に、paramsから渡ってきたものをNumber型に変換して格納。
  searchParams = await searchParams;
  // searchParamsが渡ってくるのをawaitで待つ。非同期処理なので。

  // URLからの検索パラメータを取得
  const searchQuery = searchParams.search || '';
  // 定数searchQueryにsearchParamsのsearchの部分をいれる。 もしくはからの文字列を入れる。
  const typeFilters = searchParams.types ? searchParams.types.split(',') : [];
  // 定数 typeFiltersにsearchParamsのtypeがあれば分割して配列を入れ、なければ空の配列を入れる。

  // バリデーション
  if (isNaN(currentPage) || currentPage < 1) {
    // もしcurrentPageがNumber型ではないもしくは、1より小さい数であれば
    notFound();
    // notFound関数を返す。（notFoundはNextJSの機能でimportしてある。）
  }

  try {
    const { pokemonList, totalPages, totalCount } = await fetchPokemonList(
      // fetchPokemonListに以下の引数を渡して実行し、
      // 結果を待ってからPokemonList,totalPages,totalCountに値をいれる。
      currentPage,
      searchQuery,
      typeFilters
    );

    if (currentPage > totalPages && !(totalCount === 0 && currentPage === 1)) {
       // 存在しないページや、検索結果が0件でページが1より大きい場合は
      notFound();
      // notFound関数を実行する。
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