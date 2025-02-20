// src/components/pokemon/Pagenation.tsx

import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: Props) => {
  // 表示するページ番号の範囲を計算
  const getPageNumbers = () => {
    const delta = 2; // 現在のページの前後に表示するページ数
    const range: number[] = []; // 空の配列を初期化してnumber型の配列が入る。
    const rangeWithDots: (number | string)[] = []; // 空の配列を初期化数値または文字列の型を指定。...のため
    let l: number;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  return (
    <nav className="flex justify-center items-center space-x-2 my-8">
      {/* 前へボタン */}
      {currentPage === 1 ? (
        <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
          前へ
        </span>
      ) : (
        <Link
          href={`/page/${currentPage - 1}`}
          className="px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
        >
          前へ
        </Link>
      )}

      {/* ページ番号 */}
      {getPageNumbers().map((pageNum, index) => (
        pageNum === '...' ? (
          <span key={index} className="px-3 py-2">...</span>
        ) : (
          <Link
            key={index}
            href={`/page/${pageNum}`}
            className={`px-3 py-2 rounded-lg ${
              pageNum === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </Link>
        )
      ))}

      {/* 次へボタン */}
      {currentPage === totalPages ? (
        <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
          次へ
        </span>
      ) : (
        <Link
          href={`/page/${currentPage + 1}`}
          className="px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
        >
          次へ
        </Link>
      )}
    </nav>
  );
};

export default Pagination;