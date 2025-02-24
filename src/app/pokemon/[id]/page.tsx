// src/app/pokemon/[id]/page.tsx
import { fetchPokemonDetail } from '@/utils/api';
import { PokemonDetail } from '@/components/pokemon/PokemonDetail';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PokemonDetailPage({ params }: Props) {
  const { id } = await params;
  const pokemonId = Number(id);

  // バリデーション
  if (isNaN(pokemonId) || pokemonId < 1) {
    notFound();
  }

  try {
    const pokemon = await fetchPokemonDetail(pokemonId);
    
    return (
      <main className="container mx-auto p-4">
        <PokemonDetail pokemon={pokemon} />
      </main>
    );
  } catch (error) {
    console.error('Error in detail page component:', error);
    throw error; // エラーを再スローして上位のエラーハンドラに渡す
  }
}