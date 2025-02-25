// src/app/page/[page]/loading.tsx
import { PokemonGridSkeleton } from '@/components/pokemon/PokemonGridSkeleton';

export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ポケモン一覧</h1>
      <PokemonGridSkeleton includeSearchBar={true} />
    </main>
  );
}