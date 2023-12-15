import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import {
  getBasketProductsList,
  getCamerasIds,
  getDiscount,
  getIsPromoCodeError,
  getIsValidPromoCode,
  getPostOrderStatus,
  getPromoCode,
} from '../../store/basket-data/basket-data-selectors.ts';
import { calculateBasketSummary } from '../../utils.ts';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ModalName, Status } from '../../const.ts';
import { setBasketReset, setPromoCode } from '../../store/basket-data/basket-data-slice.ts';
import { postCouponAction, postOrderAction } from '../../store/basket-data/basket-data-thunk.ts';
import classNames from 'classnames';
import { setModal } from '../../store/cameras-data/cameras-data-slice.ts';
import PopupBasketSuccess from '../popups/popup-basket-success/popup-basket-success.tsx';

export default function BasketSummary() {
  const dispatch = useAppDispatch();

  const basketProductsList = useAppSelector(getBasketProductsList);
  const promoCode = useAppSelector(getPromoCode);
  const discountPercent = useAppSelector(getDiscount);
  const postOrderStatus = useAppSelector(getPostOrderStatus);
  const camerasIds = useAppSelector(getCamerasIds);
  const isValidPromoCode = useAppSelector(getIsValidPromoCode);
  const isPromoCodeError = useAppSelector(getIsPromoCodeError);

  const [promoText, setPromoText] = useState<string | null>(promoCode);

  const totalPrice = calculateBasketSummary(basketProductsList);
  const discount = Math.round((totalPrice * discountPercent) / 100);
  const priceWithDiscount = Math.round(totalPrice - discount);

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const newValue = evt.target.value.replace(/\s/g, '');
    setPromoText(newValue);
  };

  const handlePromoCodeEnter = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (promoText && promoText.length > 0) {
      dispatch(postCouponAction(promoText));
      dispatch(setPromoCode(promoText));
    }
  };

  const handleOrderSend = () => {
    dispatch(postOrderAction({ camerasIds: camerasIds, coupon: isValidPromoCode ? promoCode : null }));
  };

  useEffect(() => {
    if (postOrderStatus === Status.Success) {
      dispatch(setModal(ModalName.SuccessOrder));
      dispatch(setBasketReset());
      setPromoText(null);
    }
  }, [dispatch, postOrderStatus]);

  return (
    <div className='basket__summary'>
      <div className='basket__promo'>
        <p className='title title--h4'>Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className='basket-form'>
          <form action='#' onSubmit={handlePromoCodeEnter}>
            <div
              className={classNames(
                {
                  'is-invalid': promoText && isPromoCodeError,
                  'is-valid': (promoText && isValidPromoCode) || discount > 0,
                },
                'custom-input',
              )}
            >
              <label>
                <span className='custom-input__label'>Промокод</span>
                <input
                  type='text'
                  name='promo'
                  placeholder='Введите промокод'
                  onChange={handleFormChange}
                  value={promoText || ''}
                />
              </label>
              <p className='custom-input__error'>Промокод неверный</p>
              <p className='custom-input__success'>Промокод принят!</p>
            </div>
            <button className='btn' type='submit'>
              Применить
            </button>
          </form>
        </div>
      </div>
      <div className='basket__summary-order'>
        <p className='basket__summary-item'>
          <span className='basket__summary-text'>Всего:</span>
          <span className='basket__summary-value'>{totalPrice.toLocaleString()} ₽</span>
        </p>
        <p className='basket__summary-item'>
          <span className='basket__summary-text'>Скидка:</span>
          <span className={classNames({ 'basket__summary-value--bonus': discount > 0 }, 'basket__summary-value')}>
            {discount.toLocaleString()} ₽
          </span>
        </p>
        <p className='basket__summary-item'>
          <span className='basket__summary-text basket__summary-text--total'>К оплате:</span>
          <span className='basket__summary-value basket__summary-value--total'>
            {priceWithDiscount.toLocaleString()} ₽
          </span>
        </p>
        <button
          className='btn btn--purple'
          type='submit'
          onClick={handleOrderSend}
          disabled={!basketProductsList.length || postOrderStatus === Status.Loading}
        >
          Оформить заказ
        </button>
        <PopupBasketSuccess />
      </div>
    </div>
  );
}
