import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';
import { postReviewAction } from '../../store/reviews-data/reviews-data-thunk.ts';
import { getPostReviewStatus } from '../../store/reviews-data/reviews-data-selectors.ts';
import { CommentsLength, ModalName, Status } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import { PostReview } from '../../types/types.ts';
import { setCloseModal, setModal } from '../../store/cameras-data/cameras-data-slice.ts';
import { getModalName } from '../../store/cameras-data/cameras-data-selectors.ts';

type RateStarProps = {
  value: number;
  title: string;
  register: UseFormRegister<PostReview>;
};

type FormInput = {
  formName: 'cameraId' | 'review' | 'rating' | 'userName' | 'advantage' | 'disadvantage';
  title: string;
  placeholder: string;
  errorText: string;
  register: UseFormRegister<PostReview>;
  errors: FieldErrors<PostReview>;
};

const rates = [
  { title: 'Отлично', value: 5 },
  { title: 'Хорошо', value: 4 },
  { title: 'Нормально', value: 3 },
  { title: 'Плохо', value: 2 },
  { title: 'Ужасно', value: 1 },
];

const RateStar = ({ title, value, register }: RateStarProps) => (
  <>
    <input
      className='visually-hidden'
      id={`star-${value}`}
      type='radio'
      value={value}
      {...register('rating', { required: 'Нужно оценить товар' })}
    />
    <label className='rate__label' title={title} htmlFor={`star-${value}`} />
  </>
);

const FormInput = ({ formName, title, placeholder, errorText, register, errors }: FormInput) => (
  <div className={classNames({ 'is-invalid': errors[formName] }, 'custom-input form-review__item')}>
    <label>
      <span className={classNames('custom-input__label')}>
        {title}
        <svg width={9} height={9} aria-hidden='true'>
          <use xlinkHref='#icon-snowflake' />
        </svg>
      </span>
      <input
        type='text'
        placeholder={placeholder}
        {...register(formName, {
          required: errorText,

          minLength: {
            value: CommentsLength.Min,
            message: `Минимум ${CommentsLength.Min} символа`,
          },
          maxLength: {
            value: CommentsLength.Max,
            message: `Максимум ${CommentsLength.Max} символов`,
          },
        })}
      />
      {errors[formName] && <span className='custom-input__error'>{errors[formName]?.message}</span>}
    </label>
  </div>
);

const FormTextArea = ({ formName, title, placeholder, errorText, register, errors }: FormInput) => (
  <div className={classNames({ 'is-invalid': errors.review }, 'custom-textarea form-review__item')}>
    <label>
      <span className={classNames('custom-textarea__label')}>
        {title}
        <svg width={9} height={9} aria-hidden='true'>
          <use xlinkHref='#icon-snowflake' />
        </svg>
      </span>

      <textarea
        placeholder={placeholder}
        {...register(formName, {
          required: errorText,

          minLength: {
            value: CommentsLength.Min,
            message: `Минимум ${CommentsLength.Min} символа`,
          },
          maxLength: {
            value: CommentsLength.Max,
            message: `Максимум ${CommentsLength.Max} символов`,
          },
        })}
      />
      <span className='custom-input__error'>{errors[formName]?.message}</span>
    </label>
  </div>
);

export default function ReviewForm() {
  const { cameraId: id } = useParams();
  const dispatch = useAppDispatch();

  const status = useAppSelector(getPostReviewStatus);
  const modalName = useAppSelector(getModalName);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<PostReview>({
    defaultValues: {},
  });

  const rating = watch('rating');

  const onSubmit = (data: PostReview) => {
    const submitData = {
      ...data,
      cameraId: Number(id),
      rating: Number(data.rating),
    };
    dispatch(postReviewAction(submitData));
  };

  useEffect(() => {
    if (modalName !== ModalName.Reviews) {
      reset();
    }
  }, [modalName, reset]);

  useEffect(() => {
    if (status === Status.Success) {
      dispatch(setModal(ModalName.SuccessForm));
    }

    if (status === Status.Error) {
      dispatch(setCloseModal);
    }
  }, [dispatch, status]);

  return (
    <div className='form-review'>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form method='post' onSubmit={handleSubmit(onSubmit)}>
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
                {rates.map(({ title, value }) => (
                  <RateStar key={title} title={title} value={value} register={register} />
                ))}
              </div>
              <div className='rate__progress'>
                <span className='rate__stars'>{rating || 0}</span> <span>/</span>{' '}
                <span className='rate__all-stars'>5</span>
              </div>
            </div>
            {errors.rating && <p className='rate__message'>{errors.rating.message}</p>}
          </fieldset>

          <FormInput
            formName='userName'
            title='Ваше имя'
            placeholder='Введите ваше имя'
            errorText='Введите ваше имя'
            register={register}
            errors={errors}
          />

          <FormInput
            formName='advantage'
            title='Достоинства'
            placeholder='Основные преимущества товара'
            errorText='Нужно указать достоинства'
            register={register}
            errors={errors}
          />

          <FormInput
            formName='disadvantage'
            title='Недостатки'
            placeholder='Главные недостатки товара'
            errorText='Нужно указать недостатки'
            register={register}
            errors={errors}
          />

          <FormTextArea
            formName='review'
            title='Комментарий'
            placeholder='Поделитесь своим опытом покупки'
            errorText='Нужно добавить комментарий'
            register={register}
            errors={errors}
          />
        </div>
        <button className='btn btn--purple form-review__btn' type='submit'>
          Отправить отзыв
        </button>
      </form>
    </div>
  );
}
