import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>{'Camera Shop - Not found'}</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}>Вернуться на главную</Link>
    </>
  );
}
