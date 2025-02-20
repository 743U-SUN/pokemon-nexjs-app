import { PokemonCardType } from '@/types/pokemon';
import { PokemonCard } from './PokemonCard';

interface Props {
  pokemons: PokemonCardType[];
}

export const PokemonGrid = ({ pokemons }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonGrid;