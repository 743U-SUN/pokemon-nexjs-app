// src/app/page/[page]/error.tsx

'use client'; // エラーコンポーネントはクライアントコンポーネントである必要がある

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // エラーをログに記録する（実際の環境では適切なエラーロギングサービスを使用）
    console.error('ページエラーが発生しました:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">エラーが発生しました</h2>
        
        <p className="text-gray-700 mb-6">
          ポケモンデータの読み込み中に問題が発生しました。
          ネットワーク接続を確認してください。
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            再試行
          </button>
          
          <Link 
            href="/page/1"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            一覧に戻る
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