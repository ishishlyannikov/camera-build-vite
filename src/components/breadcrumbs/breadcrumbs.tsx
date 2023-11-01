import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../hooks/hooks.ts';
import { getProduct } from '../../store/cameras-data/cameras-data-selectors.ts';

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const currentProduct = useAppSelector(getProduct);
  const catalogPath = pathname === AppRoute.Main;

  return (
    <div className='breadcrumbs'>
      <div className='container'>
        <ul className='breadcrumbs__list'>
          <li className='breadcrumbs__item'>
            <a className='breadcrumbs__link' href='/'>
              Главная
              <svg width={5} height={8} aria-hidden='true'>
                <use xlinkHref='#icon-arrow-mini' />
              </svg>
            </a>
          </li>
          <li className='breadcrumbs__item'>
            <Link
              className={`breadcrumbs__link breadcrumbs__link${catalogPath ? '--active' : ''}`}
              to={AppRoute.Main}
              data-testid='main-page'
            >
              Каталог
              {!catalogPath && (
                <svg width={5} height={8} aria-hidden='true'>
                  <use xlinkHref='#icon-arrow-mini' />
                </svg>
              )}
            </Link>
          </li>
          {pathname.includes(AppRoute.Product) && (
            <li className='breadcrumbs__item'>
              <span className='breadcrumbs__link breadcrumbs__link--active'>{currentProduct?.name}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
