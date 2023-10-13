import Header from "../../components/header/header.tsx";
import Footer from "../../components/footer/footer.tsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.tsx";

import {RATINGS} from "../../const.ts";
import {useAppDispatch, useAppSelector} from "../../components/hooks/hooks.ts";
import {useParams} from "react-router-dom";
import {getIsProductDataLoading, getProduct} from "../../components/store/cameras-data/cameras-data-selectors.ts";
import {useEffect} from "react";
import {fetchProductAction} from "../../components/store/cameras-data/cameras-data-thunk.ts";
import Spinner from "../../components/spinner/spinner.tsx";
import NotFoundPage from "../not-found-page/not-found-page.tsx";
import Reviews from "../../components/reviews/reviews.tsx";
import SimilarProducts from "../../components/product-similar/product-similar.tsx";
import RatingItem from "../../components/rating-item/rating-item.tsx";
import ProductTabs from "../../components/product-tabs/product-tabs.tsx";

export default function Product() {
  const {cameraId} = useParams();
  const dispatch = useAppDispatch();

  const currentProduct = useAppSelector(getProduct);
  const isProductLoading = useAppSelector(getIsProductDataLoading);

  useEffect(() => {
    if (cameraId) {
      dispatch(fetchProductAction(cameraId));
    }
  }, [cameraId, dispatch]);

  if (isProductLoading) {
    return <Spinner />;
  }

  if (!currentProduct) {
    return <NotFoundPage />;
  }

  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount} = currentProduct;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  return (
    <div className="wrapper">
     <Header/>
      <main>
        <div className="page-content">
         <Breadcrumbs/>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={sourceSrcSet}
                    />
                    <img
                      src={previewImg}
                      srcSet={imgSrcSet}
                      width={560}
                      height={480}
                      alt={name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product-card__rate">
                    {RATINGS.map((item) => <RatingItem key={item} item={item} rating={rating}/>)}
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>{reviewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>{price} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>
                    Добавить в корзину
                  </button>
                <ProductTabs camera={currentProduct}/>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
           <SimilarProducts camera={currentProduct}/>
          </div>
          <div className="page-content__section">
             <Reviews/>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
<Footer/>
    </div>
  )
}
