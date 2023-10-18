import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs.tsx';
import { RATINGS } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks.ts';
import { Link, useParams } from 'react-router-dom';
import {
  getIsModalOpened,
  getIsProductDataLoading,
  getProduct,
  getSelectedProduct,
} from '../../components/store/cameras-data/cameras-data-selectors.ts';
import { useEffect } from 'react';
import { fetchProductAction } from '../../components/store/cameras-data/cameras-data-thunk.ts';
import Spinner from '../../components/spinner/spinner.tsx';
import NotFoundPage from '../not-found-page/not-found-page.tsx';
import Reviews from '../../components/reviews/reviews.tsx';
import RatingItem from '../../components/rating-item/rating-item.tsx';
import ProductTabs from '../../components/product-tabs/product-tabs.tsx';
import SimilarCards from '../../components/similar-cards/similar-cards.tsx';
import {
  getIsSimilarDataLoading,
  getSimilarProducts,
} from '../../components/store/product-data/product-data-selectors.ts';
import {
  fetchReviewsAction,
  fetchSimilarProductsAction,
} from '../../components/store/product-data/product-data-thunk.ts';
import PopupAddToBasket from '../../components/popups/popup-add-to-basket/popup-add-to-basket.tsx';
import { setModalAddStatus, setSelectedProduct } from '../../components/store/cameras-data/cameras-data-slice.ts';

export default function Product() {
  const { cameraId } = useParams();
  const dispatch = useAppDispatch();

  const currentProduct = useAppSelector(getProduct);
  const isProductLoading = useAppSelector(getIsProductDataLoading);

  const similarProducts = useAppSelector(getSimilarProducts);
  const isSimilarProductsLoading = useAppSelector(getIsSimilarDataLoading);

  const openPopup = useAppSelector(getIsModalOpened);
  const selectedCamera = useAppSelector(getSelectedProduct);

  useEffect(() => {
    if (cameraId) {
      dispatch(fetchProductAction(cameraId));
      dispatch(fetchSimilarProductsAction(cameraId));
      dispatch(fetchReviewsAction(cameraId));
    }
  }, [cameraId, dispatch]);

  if (isProductLoading || isSimilarProductsLoading) {
    return <Spinner />;
  }

  if (!currentProduct) {
    return <NotFoundPage />;
  }

  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount } =
    currentProduct;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  const handleButtonClick = () => {
    dispatch(setSelectedProduct(currentProduct));
    dispatch(setModalAddStatus(true));
  };

  return (
    <div className='wrapper'>
      <Header />
      <main>
        <div className='page-content'>
          <Breadcrumbs isCatalog={false} />
          <div className='page-content__section'>
            <section className='product'>
              <div className='container'>
                <div className='product__img'>
                  <picture>
                    <source type='image/webp' srcSet={sourceSrcSet} />
                    <img src={previewImg} srcSet={imgSrcSet} width={560} height={480} alt={name} />
                  </picture>
                </div>
                <div className='product__content'>
                  <h1 className='title title--h3'>{name}</h1>
                  <div className='rate product-card__rate'>
                    {RATINGS.map((item) => (
                      <RatingItem key={item} item={item} rating={rating} />
                    ))}
                    <p className='visually-hidden'>Рейтинг: {rating}</p>
                    <p className='rate__count'>
                      <span className='visually-hidden'>Всего оценок:</span>
                      {reviewCount}
                    </p>
                  </div>
                  <p className='product__price'>
                    <span className='visually-hidden'>Цена:</span>
                    {price.toLocaleString()} ₽
                  </p>
                  <button className='btn btn--purple' type='button' onClick={handleButtonClick}>
                    <svg width={24} height={16} aria-hidden='true'>
                      <use xlinkHref='#icon-add-basket' />
                    </svg>
                    Добавить в корзину
                  </button>
                  <ProductTabs camera={currentProduct} />
                </div>
              </div>
            </section>
          </div>
          <div className='page-content__section'>
            {similarProducts.length > 0 && <SimilarCards cameras={similarProducts} />}
          </div>
          {selectedCamera && <PopupAddToBasket camera={selectedCamera} isOpened={openPopup} />}
          <div className='page-content__section'>
            <Reviews />
          </div>
        </div>
      </main>
      <Link className='up-btn' to='#header' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg width={12} height={18} aria-hidden='true'>
          <use xlinkHref='#icon-arrow2' />
        </svg>
      </Link>
      <Footer />
    </div>
  );
}
