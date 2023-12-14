import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import BasketItem from '../../components/basket-item/basket-item.tsx';
import BasketSummary from '../../components/basket-summary/basket-summary.tsx';
import { useAppSelector } from '../../components/hooks/hooks.ts';
import { getBasketProductsList } from '../../store/basket-data/basket-data-selectors.ts';
import { useState } from 'react';
import { BasketProduct } from '../../types/types.ts';
import PopupRemoveItem from '../../components/popups/popup-remove-item/popup-remove-item.tsx';

export default function Basket() {
  const basketProductsList = useAppSelector(getBasketProductsList);
  const [currentProduct, setCurrentProduct] = useState<BasketProduct>({} as BasketProduct);

  return (
    <div className='wrapper'>
      <Header />
      <main>
        <div className='page-content'>
          <div className='breadcrumbs'>
            <div className='container'>
              <ul className='breadcrumbs__list'>
                <li className='breadcrumbs__item'>
                  <a className='breadcrumbs__link' href='../../../index.html'>
                    Главная
                    <svg width={5} height={8} aria-hidden='true'>
                      <use xlinkHref='#icon-arrow-mini' />
                    </svg>
                  </a>
                </li>
                <li className='breadcrumbs__item'>
                  <Link className='breadcrumbs__link' to={AppRoute.Main}>
                    Каталог
                    <svg width={5} height={8} aria-hidden='true'>
                      <use xlinkHref='#icon-arrow-mini' />
                    </svg>
                  </Link>
                </li>
                <li className='breadcrumbs__item'>
                  <span className='breadcrumbs__link breadcrumbs__link--active'>Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className='basket'>
            <div className='container'>
              <h1 className='title title--h2'>Корзина</h1>
              <ul className='basket__list'>
                {basketProductsList.map((item) => (
                  <BasketItem key={item.id} camera={item} onCameraClick={setCurrentProduct} />
                ))}
              </ul>
              <BasketSummary />
            </div>
            <PopupRemoveItem camera={currentProduct} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
