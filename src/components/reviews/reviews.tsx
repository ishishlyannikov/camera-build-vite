import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import { Review } from '../../types/types.ts';
import ReviewItem from '../review-item/review-item.tsx';
import { getReviews } from '../../store/reviews-data/reviews-data-selectors.ts';
import { useState } from 'react';
import { compare } from '../../utils.ts';
import PopupAddReview from '../popups/popup-add-review/popup-add-review.tsx';
import PopupReviewSuccess from '../popups/popup-review-success/popup-review-success.tsx';
import { setModal } from '../../store/cameras-data/cameras-data-slice.ts';
import { MAX_REVIEWS_COUNT, ModalName } from '../../const.ts';
import { resetFormStatus } from '../../store/reviews-data/reviews-data-slice.ts';

export default function Reviews() {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(getReviews);

  const [newestReview, setNewestReview] = useState(3);

  function sortReviewByDate(data: Review[]) {
    return data.slice().sort(compare).slice(0, newestReview);
  }

  const handleReviewsCountButtonClick = () => {
    setNewestReview((prev) => prev + MAX_REVIEWS_COUNT);
  };

  const handleOpenReviewModal = () => {
    dispatch(resetFormStatus());
    dispatch(setModal(ModalName.Reviews));
  };

  return (
    <div className='page-content__section'>
      <section className='review-block'>
        <div className='container'>
          <div className='page-content__headed'>
            <h2 className='title title--h3'>Отзывы</h2>
            <button className='btn' type='button' onClick={handleOpenReviewModal}>
              Оставить свой отзыв
            </button>
            <PopupAddReview />
            <PopupReviewSuccess />
          </div>
          <ul className='review-block__list'>
            {reviews.length ? (
              sortReviewByDate(reviews).map((item) => <ReviewItem key={item.id} userReview={item} />)
            ) : (
              <li className='review-card'>Ваш отзыв будет первым</li>
            )}
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
    </div>
  );
}
