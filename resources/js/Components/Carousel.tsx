import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

interface CarouselProps {
  images: { id: number; url: string }[];
}

export default function Carousel({ images }: CarouselProps) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={true}
      slidesPerView={1}
      spaceBetween={8}
      className="w-full h-48 mb-2"
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <img
            src={image.url}
            className="w-full h-full object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
