// src/app/global-error.tsx

'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // グローバルエラーをログに記録
    console.error('重大なアプリケーションエラーが発生しました:', error);
  }, [error]);

  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">アプリケーションエラー</h1>
            
            <p className="text-gray-700 mb-6">
              申し訳ありませんが、アプリケーションで予期せぬエラーが発生しました。
              この問題は記録されており、解決に取り組んでいます。
            </p>
            
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              アプリを再読み込み
            </button>

            {/* 開発環境でのみ表示するエラー詳細 */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
                <h3 className="font-bold text-red-600 mb-2">エラー詳細（開発環境のみ表示）:</h3>
                <p className="font-mono text-sm text-red-500 break-all">{error.message}</p>
                {error.stack && (
                  <pre className="mt-2 p-2 bg-gray-800 text-gray-200 rounded text-xs overflow-auto max-h-64">
                    {error.stack}
                  </pre>
                )}
                {error.digest && (
                  <p className="font-mono text-xs text-gray-500 mt-2">エラーID: {error.digest}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}