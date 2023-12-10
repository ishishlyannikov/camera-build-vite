import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import SearchForm from '../search-form/search-form.tsx';
import { useAppSelector } from '../hooks/hooks.ts';
import { getBasketProductsList } from '../../store/basket-data/basket-data-selectors.ts';

export default function Header() {
  const basketProductsCount = useAppSelector(getBasketProductsList).length;

  return (
    <header className='header' id='header'>
      <div className='container'>
        <div className='container'>
          <a className='header__logo' href='/' aria-label='Переход на главную'>
            <svg width='100' height='36' aria-hidden='true'>
              <use xlinkHref='#icon-logo' />
            </svg>
          </a>
          <nav className='main-nav header__main-nav'>
            <ul className='main-nav__list'>
              <li className='main-nav__item'>
                <a className='main-nav__link' href='/'>
                  Каталог
                </a>
              </li>
              <li className='main-nav__item'>
                <a className='main-nav__link' href='#'>
                  Гарантии
                </a>
              </li>
              <li className='main-nav__item'>
                <a className='main-nav__link' href='#'>
                  Доставка
                </a>
              </li>
              <li className='main-nav__item'>
                <a className='main-nav__link' href='#'>
                  О компании
                </a>
              </li>
            </ul>
          </nav>
          <SearchForm />
          <Link className='header__basket-link' to={AppRoute.Basket} data-testid='header-basket'>
            <svg width={16} height={16} aria-hidden='true'>
              <use xlinkHref='#icon-basket' />
            </svg>
            {!!basketProductsCount && <span className='header__basket-count'>{basketProductsCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
