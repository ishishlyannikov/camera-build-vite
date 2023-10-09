import {Link} from "react-router-dom";
import {useMemo} from "react";

type PaginationProps = {
  totalPageCount: number;
  nextPage?: () => void;
  prevPage?: () => void;
  setPage: (page: number) => void;
  page: number;
}
export default function Pagination({totalPageCount, nextPage,prevPage,setPage,page}:PaginationProps) {

    const currentPageNumbers = useMemo(() => {
    const pagination = [...Array(totalPageCount).keys()];
    const previous = page - 1;
    const next = page + 2;
    return pagination.slice(previous, next);
  }, [page]);

   return (
    <ul className="pagination__list">
      <li className='pagination__item' style={{ visibility: `${page === 1 ? 'hidden' : 'visible'}` }}>
        <Link
            className="pagination__link pagination__link--text"
          to={`?page=${page - 1}`}
          onClick={prevPage}
        >
          Назад
        </Link>
      </li>
      {
        currentPageNumbers?.map((pageNumber) => (
          <li key={pageNumber + 1} className="pagination__item">
            <Link
              className={`pagination__link${page === pageNumber + 1 ? ' pagination__link--active' : ''}`}
              to={`?page_${pageNumber + 1}`}
              onClick={() => setPage(pageNumber + 1)}
            >{pageNumber + 1}
            </Link>
          </li>
        ))
      }
      <li className="pagination__item" style={{ visibility: `${page === totalPageCount ? 'hidden' : 'visible'}` }}>
        <Link
          className="pagination__link pagination__link--text"
          to={`?page_${page + 1}`}
          onClick={nextPage}
        >Далее
        </Link>
      </li>
    </ul>
  );
}

