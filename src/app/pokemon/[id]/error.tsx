// src/app/pokemon/[id]/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // エラーをログに記録する
    console.error('ポケモン詳細ページでエラーが発生しました:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">ポケモン情報の取得に失敗しました</h2>
        
        <p className="text-gray-700 mb-6">
          ポケモンの詳細情報を取得できませんでした。
          インターネット接続を確認するか、しばらく経ってからもう一度お試しください。
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            再読み込み
          </button>
          
          <Link 
            href="/page/1"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ポケモン一覧へ
          </Link>
        </div>

        {/* 開発環境でのみ表示するエラー詳細 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
            <p className="font-mono text-sm text-red-500 break-all">{error.message}</p>
            {error.digest && (
              <p className="font-mono text-xs text-gray-500 mt-2">エラーID: {error.digest}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}