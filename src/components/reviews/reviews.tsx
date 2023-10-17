import { useAppSelector } from '../hooks/hooks.ts';
import { Review } from '../../types/types.ts';
import ReviewItem from '../review-item/review-item.tsx';
import { getReviews } from '../store/product-data/product-data-selectors.ts';
import { useState } from 'react';
import { compare } from '../../utils.ts';

export default function Reviews() {
  const reviews = useAppSelector(getReviews);

  const [newestReview, setNewestReview] = useState(3);

  function sortReviewByDate(reviews: Review[]): Review[] {
    return reviews.slice().sort(compare).slice(0, newestReview);
  }

  const handleReviewsCountButtonClick = () => {
    setNewestReview((prev) => prev + 3);
  };

  return (
    <section className='review-block'>
      <div className='container'>
        <div className='page-content__headed'>
          <h2 className='title title--h3'>Отзывы</h2>
          <button className='btn' type='button'>
            Оставить свой отзыв
          </button>
        </div>
        <ul className='review-block__list'>
          {sortReviewByDate(reviews).map((item) => (
            <li className='reviews__item' key={item.id}>
              <ReviewItem userReview={item} />
            </li>
          ))}
        </ul>
        <div className='review-block__buttons'>
          {newestReview < reviews.length && (
            <button className='btn btn--purple' type='button' onClick={handleReviewsCountButtonClick}>
              Показать больше отзывов
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
