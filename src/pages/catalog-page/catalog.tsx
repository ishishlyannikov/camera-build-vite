import Header from "../../components/header/header.tsx";
import Footer from "../../components/footer/footer.tsx";
import CatalogFilter from "../../components/catalog-filter/catalog-filter.tsx";
import CatalogSort from "../../components/catalog-sort/catalog-sort.tsx";
import CatalogCards from "../../components/catalog-cards/catalog-cards.tsx";
import PaginationList from "../../components/pagination/pagination-list.tsx";
import {useAppDispatch, useAppSelector} from "../../components/hooks/hooks.ts";
import {fetchCamerasAction} from "../../components/store/cameras-data/cameras-data-thunk.ts";
import {useEffect} from "react";
import {isCamerasDataStatusLoading} from "../../components/store/cameras-data/cameras-data-selectors.ts";
import Spinner from "../../components/spinner/spinner.tsx";
import SwiperForBanner from "../../components/swiper/swiper.tsx";
import {isPromoLoading} from "../../components/store/promo-data/promo-data-selectors.ts";
import {fetchPromoAction} from "../../components/store/promo-data/promo-data-thunk.ts";

export default function Catalog () {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  const isLoading = useAppSelector(isCamerasDataStatusLoading);
  const isPromoDataLoading = useAppSelector(isPromoLoading)

  if (isLoading || isPromoDataLoading) {
    return <Spinner />;
  }

  return (
    <div className="wrapper">
     <Header/>
      <main>
     <SwiperForBanner/>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="../../../index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
              </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                <CatalogFilter/>
                </div>
                <div className="catalog__content">
                 <CatalogSort/>
                  <CatalogCards/>
                  <div className="pagination">
                   <PaginationList/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
     <Footer/>
    </div>
  );

}
