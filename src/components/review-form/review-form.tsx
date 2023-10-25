import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { postReviewAction } from '../store/reviews-data/reviews-data-thunk.ts';
import { getPostReviewStatus } from '../store/reviews-data/reviews-data-selectors.ts';
import { MAX_COMMENTS_LENGTH, MIN_COMMENTS_LENGTH, ModalName, Status } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import { PostReview } from '../../types/types.ts';
import { setModal } from '../store/cameras-data/cameras-data-slice.ts';
import { getModalName } from '../store/cameras-data/cameras-data-selectors.ts';

type RateStar = {
  value: number;
  title: string;
};

type FormInput = {
  formName: 'cameraId' | 'review' | 'rating' | 'userName' | 'advantage' | 'disadvantage';
  title: string;
  placeholder: string;
  errorText: string;
  isTextArea?: boolean;
};

export default function ReviewForm() {
  const { cameraId: id } = useParams();
  const dispatch = useAppDispatch();

  const reviewStatus = useAppSelector(getPostReviewStatus) === Status.Loading;
  const modalName = useAppSelector(getModalName);

  const {
    formState: { errors, isSubmitSuccessful },
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<PostReview>({
    defaultValues: {},
    mode: 'onSubmit',
  });

  const rating = watch('rating');

  const handleFormSubmit = (data: PostReview) => {
    (async () => {
      const submitData = {
        ...data,
        cameraId: +id!!,
        rating: +data.rating,
      };
      dispatch(postReviewAction(submitData));
    })();
  };

  useEffect(() => {
    if (modalName !== ModalName.Reviews) {
      reset();
    }
  }, [modalName]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      dispatch(setModal(ModalName.SuccessForm));
    }
  }, [isSubmitSuccessful]);

  const RateStar = ({ value, title }: RateStar) => (
    <>
      <input
        className='visually-hidden'
        id={`star-${value}`}
        type='radio'
        value={value}
        {...register('rating', { required: true })}
      />
      <label className='rate__label' htmlFor={`star-${value}`} title={title} />
    </>
  );

  const FormInput = ({ formName, title, placeholder, errorText, isTextArea }: FormInput) => (
    <div
      className={classNames(
        { 'is-invalid': errors[formName] },
        `custom-${isTextArea ? 'textarea' : 'input'} form-review__item`,
      )}
    >
      <label>
        <span className={classNames(`custom-${isTextArea ? 'textarea' : 'input'}__label`)}>
          {title}
          <svg width={9} height={9} aria-hidden='true'>
            <use xlinkHref='#icon-snowflake' />
          </svg>
        </span>
        {!isTextArea ? (
          <>
            <input
              type='text'
              placeholder={placeholder}
              {...register(formName, { required: true })}
              data-autofocus=''
            />
            {errors[formName] && <p className='custom-input__error'>{errorText}</p>}
          </>
        ) : (
          <>
            <textarea
              placeholder={placeholder}
              {...register(formName, {
                required: true,

                minLength: {
                  value: MIN_COMMENTS_LENGTH,
                  message: `Минимум ${MIN_COMMENTS_LENGTH} символа`,
                },
                maxLength: {
                  value: MAX_COMMENTS_LENGTH,
                  message: `Максимум ${MAX_COMMENTS_LENGTH} символа`,
                },
              })}
            />
            {errors[formName] && <div className='custom-textarea__error'>{errors[formName]?.message || errorText}</div>}
          </>
        )}
      </label>
    </div>
  );

  return (
    <div className='form-review'>
      <form method='post' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='form-review__rate'>
          <fieldset className={classNames({ 'is-invalid': errors.rating }, 'rate form-review__item')}>
            <legend className='rate__caption'>
              Рейтинг
              <svg width={9} height={9} aria-hidden='true'>
                <use xlinkHref='#icon-snowflake' />
              </svg>
            </legend>
            <div className='rate__bar'>
              <div className='rate__group'>
                <RateStar value={5} title='Отлично' />
                <RateStar value={4} title='Хорошо' />
                <RateStar value={3} title='Нормально' />
                <RateStar value={2} title='Плохо' />
                <RateStar value={1} title='Ужасно' />
              </div>
              <div className='rate__progress'>
                <span className='rate__stars'>{rating || 0}</span> <span>/</span>{' '}
                <span className='rate__all-stars'>5</span>
              </div>
            </div>
            {errors.rating && <p className='rate__message'>Нужно оценить товар</p>}
          </fieldset>

          <FormInput formName='userName' title='Ваше имя' placeholder='Введите ваше имя' errorText='Введите ваше имя' />

          <FormInput
            formName='advantage'
            title='Достоинства'
            placeholder='Основные преимущества товара'
            errorText='Нужно указать достоинства'
          />

          <FormInput
            formName='disadvantage'
            title='Недостатки'
            placeholder='Главные недостатки товара'
            errorText='Нужно добавить комментарий'
          />

          <FormInput
            formName='review'
            title='Комментарий'
            placeholder='Поделитесь своим опытом покупки'
            errorText='Нужно указать недостатки'
            isTextArea
          />
        </div>
        <button className='btn btn--purple form-review__btn' type='submit' disabled={reviewStatus}>
          Отправить отзыв
        </button>
      </form>
    </div>
  );
}
