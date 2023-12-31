import { Product } from '../../types/types.ts';
import React, { useEffect, useRef } from 'react';
import { KeyboardKey } from '../../const.ts';

type SearchItemProps = {
  product: Product;
  onClick: (cameraId: number) => void;
  isCurrent: boolean;
};
export default function SearchItem({ product, onClick, isCurrent }: SearchItemProps) {
  const productRef = useRef<HTMLLIElement>(null);
  const { name, id } = product;

  useEffect(() => {
    if (isCurrent) {
      productRef.current?.focus();
    }
  }, [isCurrent]);
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === KeyboardKey.Enter) {
      event.preventDefault();
      onClick(id);
    }
  };

  return (
    <li
      className='form-search__select-item'
      tabIndex={isCurrent ? -1 : 0}
      ref={productRef}
      onClick={() => onClick(id)}
      onKeyDown={handleKeyDown}
      data-testid='search-item'
    >
      {name}
    </li>
  );
}
