import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks.ts';
import { getCamerasList, getSelectedProduct } from '../../store/cameras-data/cameras-data-selectors.ts';
import ProductCard from '../product-card/product-card.tsx';
import Pagination from '../pagination/pagination.tsx';
import CatalogSort from '../catalog-sort/catalog-sort.tsx';
import { CARDS_PER_PAGE } from '../../const.ts';
import PopupAddToBasket from '../popups/popup-add-to-basket/popup-add-to-basket.tsx';

export default function CatalogContent() {
  const cameras = useAppSelector(getCamerasList);

  const selectedCamera = useAppSelector(getSelectedProduct);

  const pageCount = Math.ceil(cameras.length / CARDS_PER_PAGE);

  const [searchParams] = useSearchParams();

  const pageNumber = searchParams.get('page');

  const [currentPage, setCurrentPage] = useState<number>(pageNumber ? +pageNumber : 1);

  const firstPageIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const lastPageIndex = firstPageIndex + CARDS_PER_PAGE;

  const renderedCards = cameras.slice(firstPageIndex, lastPageIndex);

  const handleNextPageClick = () => {
    const next = currentPage + 1;
    const total = cameras ? pageCount : currentPage;
    setCurrentPage(next <= total ? next : currentPage);
  };

  const handlePrevPageClick = () => {
    const prev = currentPage - 1;
    setCurrentPage(prev > 0 ? prev : currentPage);
  };

  return (
    <div className='catalog__content' data-testid='catalog-content'>
      <CatalogSort />
      <div className='cards catalog__cards'>
        {renderedCards.map((camera) => (
          <ProductCard key={camera.id} camera={camera} />
        ))}
      </div>
      <div className='pagination'>
        {pageCount > 1 && (
          <Pagination
            page={currentPage}
            totalPageCount={pageCount}
            setPage={setCurrentPage}
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
          />
        )}
      </div>
      {selectedCamera && <PopupAddToBasket camera={selectedCamera} />}
    </div>
  );
}
