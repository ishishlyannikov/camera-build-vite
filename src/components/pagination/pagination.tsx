import { Link } from 'react-router-dom';
import { MAX_PAGES_COUNT } from '../../const.ts';

type PaginationProps = {
  totalPageCount: number;
  onNextPageClick?: VoidFunction;
  onPrevPageClick?: VoidFunction;
  setPage: (page: number) => void;
  page: number;
};
export default function Pagination({
  totalPageCount,
  onNextPageClick,
  onPrevPageClick,
  setPage,
  page,
}: PaginationProps) {
  const pagination = [...Array(totalPageCount).keys()];

  const perPageNumber = Math.ceil(page / MAX_PAGES_COUNT);
  const lastPageIndex = perPageNumber * MAX_PAGES_COUNT;
  const firstPageIndex = lastPageIndex - MAX_PAGES_COUNT;

  const currentPageNumbers = pagination.slice(firstPageIndex, lastPageIndex);

  return (
    <ul className='pagination__list'>
      <li
        className='pagination__item'
        style={{ visibility: `${page === 1 || totalPageCount <= 3 ? 'hidden' : 'visible'}` }}
      >
        <Link className='pagination__link pagination__link--text' to={`?page=${page - 1}`} onClick={onPrevPageClick}>
          Назад
        </Link>
      </li>
      {currentPageNumbers?.map((pageNumber) => (
        <li key={pageNumber + 1} className='pagination__item'>
          <Link
            className={`pagination__link${page === pageNumber + 1 ? ' pagination__link--active' : ''}`}
            to={`?page=${pageNumber + 1}`}
            onClick={() => setPage(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Link>
        </li>
      ))}
      <li className='pagination__item' style={{ visibility: `${page === totalPageCount ? 'hidden' : 'visible'}` }}>
        <Link className='pagination__link pagination__link--text' to={`?page=${page + 1}`} onClick={onNextPageClick}>
          Далее
        </Link>
      </li>
    </ul>
  );
}
