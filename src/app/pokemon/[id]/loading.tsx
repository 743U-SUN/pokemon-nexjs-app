// src/app/pokemon/[id]/loading.tsx
import { PokemonDetailSkeleton } from '@/components/pokemon/PokemonDetailSkeleton';

export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <PokemonDetailSkeleton />
    </main>
  );
}