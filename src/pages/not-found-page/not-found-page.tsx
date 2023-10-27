import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFoundPage() {
  return (
    <div className='wrapper'>
      <h1>404 Page Not Found</h1>
      <Link to={AppRoute.Main} data-testid='back-home'>
        Вернуться на главную
      </Link>
    </div>
  );
}
