import Header from "../../components/header/header.tsx";
import Footer from "../../components/footer/footer.tsx";
import CatalogFilter from "../../components/catalog-filter/catalog-filter.tsx";
import CatalogContent from "../../components/catalog-content/catalog-content.tsx";
import {useAppDispatch, useAppSelector} from "../../components/hooks/hooks.ts";
import {fetchCamerasAction} from "../../components/store/cameras-data/cameras-data-thunk.ts";
import {useEffect} from "react";
import {getIsCamerasDataStatusLoading} from "../../components/store/cameras-data/cameras-data-selectors.ts";
import Spinner from "../../components/spinner/spinner.tsx";
import SwiperForBanner from "../../components/swiper/swiper.tsx";
import {isPromoLoading} from "../../components/store/promo-data/promo-data-selectors.ts";
import {fetchPromoAction} from "../../components/store/promo-data/promo-data-thunk.ts";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.tsx";

export default function Catalog () {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoAction());
  }, [dispatch]);

  const isLoading = useAppSelector(getIsCamerasDataStatusLoading);
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
          <Breadcrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                <CatalogFilter/>
                </div>
                  <CatalogContent/>
              </div>
            </div>
          </section>
        </div>
      </main>
     <Footer/>
    </div>
  );
}
