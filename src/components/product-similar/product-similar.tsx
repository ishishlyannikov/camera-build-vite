import {Product} from "../../types/types.ts";
import {AppRoute, RATINGS} from "../../const.ts";
import RatingItem from "../rating-item/rating-item.tsx";
import {useState} from "react";
import PopupAddToBasket from "../popups/popup-add-to-basket/popup-add-to-basket.tsx";
import {Link} from "react-router-dom";

type SimilarProductsProps = {
  camera: Product;
}

export default function SimilarProduct({camera}:SimilarProductsProps) {

  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount, id} = camera;
  const sourceSrcSet = `/${previewImgWebp}, /${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  const [openPopup, setOpenPopup] = useState(false)

  const handlePopupClose = () => {
    setOpenPopup(false);
  };

    return (
        <section className="product-similar">
            <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <div className="product-similar__slider">
                    <div className="product-similar__slider-list">
                        <div className="product-card is-active">
                            <div className="product-card__img">
                              <picture>
                                <source type="image/webp" srcSet={sourceSrcSet}/>
                                <img src={previewImg} srcSet={imgSrcSet} width="280" height="240" alt={name} />
                              </picture>
                            </div>
                            <div className="product-card__info">
                              <div className="rate product-card__rate">
                                {RATINGS.map((item) => <RatingItem key={item} item={item} rating={rating}/>)}
                                <p className="visually-hidden">{`Рейтинг: ${rating}`}</p>
                                    <p className="rate__count">
                                        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
                                    </p>
                                </div>
                                <p className="product-card__title">{name}</p>
                                <p className="product-card__price">
                                    <span className="visually-hidden">Цена:</span>{price} ₽
                                </p>
                            </div>
                          <div className="product-card__buttons">
                            <button className="btn btn--purple product-card__btn" type="button" onClick={()=> setOpenPopup(true)}>
                              Купить
                            </button>
                            {openPopup ? <PopupAddToBasket camera={camera} isOpened={openPopup} onModalClose={handlePopupClose}/> : null}
                            <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
                              Подробнее
                            </Link>
                            </div>
                        </div>

                    <button
                        className="slider-controls slider-controls--prev"
                        type="button"
                        aria-label="Предыдущий слайд"
                        disabled
                    >
                        <svg width={7} height={12} aria-hidden="true">
                            <use xlinkHref="#icon-arrow" />
                        </svg>
                    </button>
                    <button
                        className="slider-controls slider-controls--next"
                        type="button"
                        aria-label="Следующий слайд"
                    >
                        <svg width={7} height={12} aria-hidden="true">
                            <use xlinkHref="#icon-arrow" />
                        </svg>
                    </button>
                </div>
            </div>
           </div>
        </section>
    )
}

//     return (
//         <section className="product-similar">
//             <div className="container">
//                 <h2 className="title title--h3">Похожие товары</h2>
//                 <div className="product-similar__slider">
//                     <div className="product-similar__slider-list">
//                       {similarProducts.map((product) => <ProductCard key={product.id} camera={product}/>)}
//                     </div>
//                 </div>
//                                   <button
//                                       className="slider-controls slider-controls--prev"
//                                       type="button"
//                                       aria-label="Предыдущий слайд"
//                                       disabled
//                                   >
//                                       <svg width={7} height={12} aria-hidden="true">
//                                           <use xlinkHref="#icon-arrow" />
//                                       </svg>
//                                   </button>
//                                   <button
//                                       className="slider-controls slider-controls--next"
//                                       type="button"
//                                       aria-label="Следующий слайд"
//                                   >
//                                       <svg width={7} height={12} aria-hidden="true">
//                                           <use xlinkHref="#icon-arrow" />
//                                       </svg>
//                                   </button>
//                               </div>
//                       </section>
// );
// }
