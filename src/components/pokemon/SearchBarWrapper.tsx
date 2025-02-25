// src/components/pokemon/SearchBarWrapper.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from './SearchBar';

interface SearchBarWrapperPropsType {
  initialSearch: string;
  initialTypes: string[];
}

export const SearchBarWrapper = ({ 
  initialSearch, 
  initialTypes 
}: SearchBarWrapperPropsType) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (search: string, types: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // 検索パラメータの更新
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }

    if (types.length > 0) {
      params.set('types', types.join(','));
    } else {
      params.delete('types');
    }

    // ページは1に戻す（検索条件が変わったため）
    router.push(`/page/1?${params.toString()}`);
  };

  return (
    <SearchBar
      onSearch={handleSearch}
      initialSearch={initialSearch}
      initialTypes={initialTypes}
    />
  );
};

export default SearchBarWrapper;