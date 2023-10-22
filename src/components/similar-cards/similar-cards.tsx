import { Product } from '../../types/types.ts';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import ProductCard from '../product-card/product-card.tsx';

type SimilarCardsProps = {
  cameras: Product[];
  openModal: VoidFunction;
};

export default function SimilarCards({ cameras, openModal }: SimilarCardsProps) {
  if (!cameras.length) return null;

  return (
    <div className='page-content__section'>
      <section className='product-similar'>
        <div className='container'>
          <h2 className='title title--h3'>Похожие товары</h2>
          <div className='product-similar__slider'>
            <Swiper
              className='product-similar__slider-list'
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={35}
              modules={[Navigation]}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next',
              }}
            >
              {cameras.map((item) => (
                <SwiperSlide key={item.id}>
                  <ProductCard camera={item} openModal={openModal} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              style={{ pointerEvents: 'auto' }}
              className='slider-controls slider-controls--prev'
              type='button'
              aria-label='Предыдущий слайд'
              disabled
            >
              <svg width='7' height='12' aria-hidden='true'>
                <use xlinkHref='#icon-arrow'></use>
              </svg>
            </button>
            <button
              style={{ pointerEvents: 'auto' }}
              className='slider-controls slider-controls--next'
              type='button'
              aria-label='Следующий слайд'
            >
              <svg width='7' height='12' aria-hidden='true'>
                <use xlinkHref='#icon-arrow'></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
