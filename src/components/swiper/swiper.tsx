import { useAppSelector } from '../hooks/hooks.ts';
import { getPromo } from '../store/promo-data/promo-data-selectors.ts';
import Banner from '../banner/banner.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import './swiper.css';

export default function SwiperForBanner() {
  const promoList = useAppSelector(getPromo);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className='mySwiper'
    >
      {promoList.map((item) => (
        <SwiperSlide key={item.id}>
          <Banner promoProduct={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
