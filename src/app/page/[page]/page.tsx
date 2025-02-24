// src/app/page/[page]/page.tsx
import { fetchPokemonList } from '@/utils/api';
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { Pagination } from '@/components/pokemon/Pagination';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    page: string;
  }>;
}

export default async function PokemonPage({ params }: Props) {
  // paramsをawaitして値を取得
  const { page } = await params;
  const currentPage = Number(page);

  // バリデーション
  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  try {
    const { pokemonList, totalPages } = await fetchPokemonList(currentPage);

    // 存在しないページの場合は404
    if (currentPage > totalPages) {
      notFound();
    }

    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">ポケモン一覧</h1>
        <PokemonGrid pokemons={pokemonList} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>
    );
  } catch (error) {
    console.error('Error in page component:', error);  // ログは残す
    throw error; // エラーを再スローして、Next.jsのエラーハンドリングを使用
  }
}