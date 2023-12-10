import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import Reviews from '../../components/reviews/reviews.tsx';
import NotFoundPage from '../not-found-page/not-found-page.tsx';
import PopupAddToBasket from '../../components/popups/popup-add-to-basket/popup-add-to-basket.tsx';
import RatingItem from '../../components/rating-item/rating-item.tsx';
import ProductTabs from '../../components/product-tabs/product-tabs.tsx';
import SimilarCards from '../../components/similar-cards/similar-cards.tsx';
import { ModalName } from '../../const.ts';
import {
  getIsProductDataLoading,
  getProduct,
  getSelectedProduct,
} from '../../store/cameras-data/cameras-data-selectors.ts';
import {
  getIsSimilarDataLoading,
  getSimilarProducts,
} from '../../store/similar-product-data/similar-product-data-selectors.ts';
import { useAppDispatch, useAppSelector } from '../../components/hooks/hooks.ts';
import { fetchProductAction } from '../../store/cameras-data/cameras-data-thunk.ts';
import { fetchReviewsAction } from '../../store/reviews-data/reviews-data-thunk.ts';
import { fetchSimilarProductsAction } from '../../store/similar-product-data/similar-product-data-thunk.ts';
import { setModal, setSelectedProduct } from '../../store/cameras-data/cameras-data-slice.ts';
import { getIsReviewsDataLoading } from '../../store/reviews-data/reviews-data-selectors.ts';
import PopupAddItemSuccess from '../../components/popups/popup-add-item-success/popup-add-item-success.tsx';

export default function Product() {
  const { cameraId } = useParams();
  const dispatch = useAppDispatch();

  const currentProduct = useAppSelector(getProduct);
  const isProductLoading = useAppSelector(getIsProductDataLoading);
  const similarProducts = useAppSelector(getSimilarProducts);
  const isSimilarProductsLoading = useAppSelector(getIsSimilarDataLoading);
  const selectedCamera = useAppSelector(getSelectedProduct);
  const isReviewsLoading = useAppSelector(getIsReviewsDataLoading);

  useEffect(() => {
    if (cameraId) {
      dispatch(fetchProductAction(cameraId));
      dispatch(fetchSimilarProductsAction(cameraId));
      dispatch(fetchReviewsAction(cameraId));
    }
  }, [cameraId, dispatch]);

  if (isProductLoading || isSimilarProductsLoading || isReviewsLoading) {
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
    dispatch(setModal(ModalName.AddToBasket));
  };

  return (
    <div className='wrapper'>
      <Header />
      <main data-testid='product-page'>
        <div className='page-content'>
          <Breadcrumbs />
          <div className='page-content__section' data-testid='camera-item'>
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
                    <RatingItem rating={rating} />
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
                <PopupAddItemSuccess />
              </div>
            </section>
          </div>
          <SimilarCards cameras={similarProducts} />
          {selectedCamera && <PopupAddToBasket camera={selectedCamera} />}
          <Reviews />
        </div>
      </main>
      <Link
        className='up-btn'
        to='#header'
        data-testid='scroll'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg width={12} height={18} aria-hidden='true'>
          <use xlinkHref='#icon-arrow2'></use>
        </svg>
      </Link>
      <Footer />
    </div>
  );
}
