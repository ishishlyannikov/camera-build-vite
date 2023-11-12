import { Product } from '../../types/types.ts';

type SearchItemProps = {
  product: Product;
  onClick: (cameraId: number) => void;
};
export default function SearchItem({ product, onClick }: SearchItemProps) {
  const { name, id } = product;
  return (
    <li className='form-search__select-item' tabIndex={0} onClick={() => onClick(id)}>
      {name}
    </li>
  );
}
