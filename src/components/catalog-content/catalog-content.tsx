import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import {
  getCategoryFilter,
  getLevelFilter,
  getTypeFilter,
  getMaxPrice,
  getMinPrice,
  getFilteredCatalog,
  getSelectedProduct,
  getSortBy,
  getSortOrder,
} from '../../store/cameras-data/cameras-data-selectors.ts';
import ProductCard from '../product-card/product-card.tsx';
import Pagination from '../pagination/pagination.tsx';
import CatalogSort from '../catalog-sort/catalog-sort.tsx';
import { AppRoute, CARDS_PER_PAGE, FILTER_PARAMS, QueryString } from '../../const.ts';
import PopupAddToBasket from '../popups/popup-add-to-basket/popup-add-to-basket.tsx';
import { redirectToRoute } from '../../store/action.ts';

export default function CatalogContent() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const cameras = useAppSelector(getFilteredCatalog);

  const selectedCamera = useAppSelector(getSelectedProduct);

  const currentSortType = useAppSelector(getSortBy);

  const currentSortOrder = useAppSelector(getSortOrder);

  const currentFilterCategory = useAppSelector(getCategoryFilter);

  const currentFilterType = useAppSelector(getTypeFilter);

  const currentFilterLevel = useAppSelector(getLevelFilter);

  const currentFilterMinPrice = useAppSelector(getMinPrice);

  const currentFilterMaxPrice = useAppSelector(getMaxPrice);

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
    params.getAll(FILTER_PARAMS.toString());

    return params;
  }, [location.search]);

  useEffect(() => {
    if (currentSortType && currentSortOrder) {
      currentParams.set(QueryString.Sort, currentSortType);
      currentParams.set(QueryString.Order, currentSortOrder);
    }
    if (currentFilterCategory) {
      currentParams.set(QueryString.Category, currentFilterCategory);
    } else {
      currentParams.delete(QueryString.Category);
    }
    if (currentFilterType && currentFilterType.length > 0) {
      currentParams.set(QueryString.Type, currentFilterType.toString());
    } else {
      currentParams.delete(QueryString.Type);
    }
    if (currentFilterLevel && currentFilterLevel.length > 0) {
      currentParams.set(QueryString.Level, currentFilterLevel.toString());
    } else {
      currentParams.delete(QueryString.Level);
    }
    if (currentFilterMinPrice) {
      currentParams.set(QueryString.MinPrice, currentFilterMinPrice.toString());
    }
    if (currentFilterMaxPrice) {
      currentParams.set(QueryString.MaxPrice, currentFilterMaxPrice.toString());
    }
    setSearchParams(currentParams);
  }, [
    setSearchParams,
    currentParams,
    currentSortType,
    currentSortOrder,
    currentFilterCategory,
    currentFilterMinPrice,
    currentFilterMaxPrice,
    currentFilterType,
    currentFilterLevel,
  ]);

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
