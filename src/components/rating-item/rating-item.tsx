import { RATINGS } from '../../const';

type RatingItemProps = {
  rating: number;
};

export default function RatingItem({ rating }: RatingItemProps): JSX.Element {
  return (
    <>
      {RATINGS.map((item) => {
        const href = item <= rating ? '#icon-full-star' : '#icon-star';
        return (
          <svg width='17' height='16' aria-hidden='true' key={item} data-testid='rating-star'>
            <use xlinkHref={href}></use>
          </svg>
        );
      })}
    </>
  );
}
