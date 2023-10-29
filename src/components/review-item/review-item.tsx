import { Review } from '../../types/types.ts';
import RatingItem from '../rating-item/rating-item.tsx';

type ReviewProps = {
  userReview: Review;
};

export default function ReviewItem({ userReview }: ReviewProps) {
  const { createAt, userName, advantage, disadvantage, review, rating } = userReview;
  const date = new Date(createAt);
  const formatter = new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'long',
  });

  return (
    <li className='review-card'>
      <div className='review-card__head'>
        <p className='title title--h4'>{userName}</p>
        <time className='review-card__data' dateTime='2022-04-13'>
          {formatter.format(date)}
        </time>
      </div>
      <div className='rate review-card__rate'>
        <RatingItem rating={rating} />
        <p className='visually-hidden'>Оценка: {rating}</p>
      </div>
      <ul className='review-card__list'>
        <li className='item-list'>
          <span className='item-list__title'>Достоинства:</span>
          <p className='item-list__text'>{advantage}</p>
        </li>
        <li className='item-list'>
          <span className='item-list__title'>Недостатки:</span>
          <p className='item-list__text'>{disadvantage}</p>
        </li>
        <li className='item-list'>
          <span className='item-list__title'>Комментарий:</span>
          <p className='item-list__text'>{review}</p>
        </li>
      </ul>
    </li>
  );
}
