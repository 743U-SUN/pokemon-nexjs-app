// src/components/pokemon/SearchBar.tsx
import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { POKEMON_TYPES } from '@/constants/pokemon';

interface SearchBarPropsType {
  onSearch: (search: string, types: string[]) => void;
  initialSearch: string;
  initialTypes: string[];
}

export const SearchBar = ({ onSearch, initialSearch, initialTypes }: SearchBarPropsType) => {
  const [searchText, setSearchText] = useState(initialSearch);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    // 初期値と異なる場合のみ検索を実行
    if (searchText !== initialSearch || JSON.stringify(selectedTypes) !== JSON.stringify(initialTypes)) {
      onSearch(debouncedSearchText, selectedTypes);
    }
  }, [debouncedSearchText, selectedTypes, initialSearch, initialTypes, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTypeClick = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleClear = () => {
    setSearchText('');
    setSelectedTypes([]);
  };

  return (
    <div className="mb-6">
      <div className="mb-4 relative">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="ポケモンを検索..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {(searchText || selectedTypes.length > 0) && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            クリア
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {POKEMON_TYPES.map(type => (
          <button
            key={type.id}
            onClick={() => handleTypeClick(type.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${selectedTypes.includes(type.id)
                ? `${type.color} text-white`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;