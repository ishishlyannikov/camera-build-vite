import Catalog from "../../pages/catalog-page/catalog.tsx";
import Product from "../../pages/product-page/product.tsx";
import Basket from "../../pages/basket-page/basket.tsx";
import { AppRoute } from '../../const.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}
                 element={<Catalog/>}
          />
          <Route path={AppRoute.Product}
                 element={<Product/>}
          />
          <Route path={AppRoute.Basket}
                 element={<Basket/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
