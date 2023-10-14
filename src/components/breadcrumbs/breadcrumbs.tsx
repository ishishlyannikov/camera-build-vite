import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../hooks/hooks.ts';
import { getProduct } from '../store/cameras-data/cameras-data-selectors.ts';

type BreadcrumbsProps = {
  isCatalog: boolean;
};
export default function Breadcrumbs({ isCatalog }: BreadcrumbsProps) {
  const currentProduct = useAppSelector(getProduct);
  const name = currentProduct?.name;

  return (
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
            {!isCatalog && <span className='breadcrumbs__link breadcrumbs__link--active'>{name}</span>}
          </li>
        </ul>
      </div>
    </div>
  );
}
