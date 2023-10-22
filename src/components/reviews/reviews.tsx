import { useAppSelector } from '../hooks/hooks.ts';
import { Review } from '../../types/types.ts';
import ReviewItem from '../review-item/review-item.tsx';
import { getReviews } from '../store/reviews-data/reviews-data-selectors.ts';
import { useState } from 'react';
import { compare } from '../../utils.ts';
import PopupAddReview from '../popups/popup-add-review/popup-add-review.tsx';
import { useModal } from '../hooks/useModal.ts';

export default function Reviews() {
  const { isOpenedModal, openModal, closeModal } = useModal();

  const reviews = useAppSelector(getReviews);

  const [newestReview, setNewestReview] = useState(3);

  function sortReviewByDate(reviews: Review[]): Review[] {
    return reviews.slice().sort(compare).slice(0, newestReview);
  }

  const handleReviewsCountButtonClick = () => {
    setNewestReview((prev) => prev + 3);
  };

  return (
    <div className='page-content__section'>
      <section className='review-block'>
        <div className='container'>
          <div className='page-content__headed'>
            <h2 className='title title--h3'>Отзывы</h2>
            <button className='btn' type='button' onClick={openModal}>
              Оставить свой отзыв
            </button>
            <PopupAddReview isOpened={isOpenedModal} closeModal={closeModal} />
          </div>
          <ul className='review-block__list'>
            {!!reviews.length ? (
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
