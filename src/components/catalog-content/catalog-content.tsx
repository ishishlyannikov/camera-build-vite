import {useAppSelector} from "../hooks/hooks.ts";
import {getCamerasList} from "../store/cameras-data/cameras-data-selectors.ts";
import ProductCard from "../product-card/product-card.tsx";
import Pagination from "../pagination/pagination.tsx";
import {useState,useMemo,useCallback} from "react";
import CatalogSort from "../catalog-sort/catalog-sort.tsx";
import {CARDS_PER_PAGE} from "../../const.ts";

export default function CatalogContent() {
  const cameras = useAppSelector(getCamerasList);
  const pageCount = Math.ceil(cameras.length / CARDS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const renderedCards = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const lastPageIndex = firstPageIndex + CARDS_PER_PAGE;
    return cameras.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const handleNextPageClick = useCallback(() => {
    const current = currentPage;
    const next = current + 1;
    const total = cameras ? pageCount : current;
    setCurrentPage(next <= total ? next : current);
  }, [currentPage, cameras]);

  const handlePrevPageClick = useCallback(() => {
    const current = currentPage;
    const prev = current - 1;
    setCurrentPage(prev > 0 ? prev : current);
  }, [currentPage]);

  return (
      <div className="catalog__content">
        <CatalogSort/>
        <div className="cards catalog__cards">
          {renderedCards.map((camera) =>
            <ProductCard key={camera.id} camera={camera}/>
          )}
          </div>
          <div className="pagination">
            {pageCount > 1 &&
            <Pagination page={currentPage} totalPageCount={pageCount} setPage={setCurrentPage} nextPage={handleNextPageClick} prevPage={handlePrevPageClick}/>
            }
          </div>
      </div>
    );
}
