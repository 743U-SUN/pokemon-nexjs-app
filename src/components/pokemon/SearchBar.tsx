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

  // 検索条件が変更されたときに検索を実行
  useEffect(() => {
    // 初期値と異なる場合のみ検索を実行（URLパラメータと一致している場合は不要）
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
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
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

      <div>
        <p className="text-sm text-gray-600 mb-2">タイプで絞り込み:</p>
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
      
      {/* 選択中のフィルタ表示 */}
      {selectedTypes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-2">選択中のタイプ:</p>
          <div className="flex flex-wrap gap-1">
            {selectedTypes.map(typeId => {
              const typeInfo = POKEMON_TYPES.find(t => t.id === typeId);
              return (
                <span
                  key={typeId}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeInfo?.color || 'bg-gray-400'} text-white`}
                >
                  {typeInfo?.name || typeId}
                  <button
                    onClick={() => handleTypeClick(typeId)}
                    className="ml-1 rounded-full w-4 h-4 flex items-center justify-center bg-white bg-opacity-30 hover:bg-opacity-40"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;