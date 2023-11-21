import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import {
  getSelectedProduct,
  getSortBy,
  getSortedCatalog,
  getSortOrder,
} from '../../store/cameras-data/cameras-data-selectors.ts';
import ProductCard from '../product-card/product-card.tsx';
import Pagination from '../pagination/pagination.tsx';
import CatalogSort from '../catalog-sort/catalog-sort.tsx';
import { AppRoute, CARDS_PER_PAGE, QueryString } from '../../const.ts';
import PopupAddToBasket from '../popups/popup-add-to-basket/popup-add-to-basket.tsx';
import { redirectToRoute } from '../../store/action.ts';

export default function CatalogContent() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const cameras = useAppSelector(getSortedCatalog);

  const selectedCamera = useAppSelector(getSelectedProduct);

  const currentSortType = useAppSelector(getSortBy);

  const currentSortOrder = useAppSelector(getSortOrder);

  const pageCount = Math.ceil(cameras.length / CARDS_PER_PAGE);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get('page'));

  const [currentPage, setCurrentPage] = useState<number>(pageNumber || 1);

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

  const currentParams = useMemo(() => {
    const params = new URLSearchParams(location.search);

    if (currentSortType && currentSortOrder) {
      params.get(QueryString.Sort);
      params.get(QueryString.Order);
    }
    return params;
  }, [currentSortOrder, currentSortType, location.search]);

  useEffect(() => {
    if (currentSortType && currentSortOrder) {
      currentParams.set(QueryString.Sort, currentSortType);
      currentParams.set(QueryString.Order, currentSortOrder);
    }
    setSearchParams(currentParams);
  }, [setSearchParams, currentParams, currentSortType, currentSortOrder]);

  useEffect(() => {
    if (pageNumber > pageCount || isNaN(pageNumber)) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }, [dispatch, pageCount, pageNumber]);

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
