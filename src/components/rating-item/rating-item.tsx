type RatingItemProps = {
  item: number;
  rating: number;
};

export default function RatingItem({ item, rating }: RatingItemProps) {
  return (
    <svg width='17' height='16' aria-hidden='true'>
      <use xlinkHref={item <= rating ? '#icon-full-star' : '#icon-star'} data-testid='rating-star'></use>
    </svg>
  );
}
