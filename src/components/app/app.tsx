import Catalog from "../../pages/catalog-page/catalog.tsx";
import Product from "../../pages/product-page/product.tsx";
import Basket from "../../pages/basket-page/basket.tsx";
import NotFoundPage from "../../pages/not-found-page/not-found-page.tsx";
import { AppRoute } from '../../const.ts';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from "../history-route/history-route.tsx";
import browserHistory from "../browser-history/browser-history.ts";

export default function App(): JSX.Element {

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main}
                 element={<Catalog/>}
          />
          <Route   path={`${AppRoute.Product}/:cameraId`}
                 element={<Product/>}
          />
          <Route path={AppRoute.Basket}
                 element={<Basket/>}
          />
          <Route path="*"
                 element={<NotFoundPage/>}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
