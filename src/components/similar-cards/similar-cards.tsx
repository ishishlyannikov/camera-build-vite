import SimilarProduct from '../similar-product/similar-product.tsx';
import { Product } from '../../types/types.ts';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';

type SimilarCardsProps = {
  cameras: Product[];
};

export default function SimilarCards({ cameras }: SimilarCardsProps) {
  return (
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
                <SimilarProduct camera={item} style={{ width: '100%' }} />
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
  );
}
