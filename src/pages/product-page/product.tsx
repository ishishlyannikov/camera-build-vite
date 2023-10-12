import Header from "../../components/header/header.tsx";
import Footer from "../../components/footer/footer.tsx";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.tsx";
import {useAppDispatch, useAppSelector} from "../../components/hooks/hooks.ts";
import {useParams} from "react-router-dom";
import {getIsProductDataLoading, getProduct} from "../../components/store/cameras-data/cameras-data-selectors.ts";
import {useEffect} from "react";
import {fetchProductAction} from "../../components/store/cameras-data/cameras-data-thunk.ts";
import Spinner from "../../components/spinner/spinner.tsx";
import NotFoundPage from "../not-found-page/not-found-page.tsx";
import Reviews from "../../components/reviews/reviews.tsx";
import SimilarProducts from "../../components/product-similar/product-similar.tsx";


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

  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount, vendorCode, type, level, category, description} = currentProduct;
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
                  <div className="rate product__rate">
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
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
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className="tabs__control" type="button">
                        Характеристики
                      </button>
                      <button className="tabs__control is-active" type="button">
                        Описание
                      </button>
                    </div>
                    <div className="tabs__content">
                      <div className="tabs__element">
                        <ul className="product__tabs-list">
                          <li className="item-list">
                            <span className="item-list__title">Артикул:</span>{" "}
                            <p className="item-list__text"> {vendorCode}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list">
                            <span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs__element is-active">
                        <div className="product__tabs-text">
                          <p>
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
           <SimilarProducts/>
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
