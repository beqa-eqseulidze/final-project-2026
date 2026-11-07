import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SliderProps } from '../services/types';
import hotsaleLogo from '../assets/logo/hotsale.png';
import 'swiper/css';
import 'swiper/css/navigation';

export function Slider({ slides }: SliderProps) {
  return (
    <div className="w-full h-[400px] sm:h-[460px] relative bg-transparent flex flex-col rounded-[4px] overflow-hidden shadow-md">
      {/* სათაური */}
      <div className="bg-[#00a8e8] text-white px-3 sm:px-5 py-2 sm:py-2.5 flex justify-between items-center shrink-0">
        <h3 className="font-sanet font-bold text-[14px] sm:text-[16px]">შეიძინე დანაზოგით</h3>
        <img src={hotsaleLogo} alt="Hotsale" className="h-6 sm:h-8 object-contain" />
      </div>

      {/* სლაიდერი */}
      <div className="relative flex-1 p-2.5 sm:p-4 bg-white/40">
        <div className="absolute top-[12px] sm:top-[16px] right-[12px] sm:right-[16px] z-20 flex gap-1">
          <button className="custom-prev w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 text-[#00a8e8] flex items-center justify-center transition-colors cursor-pointer rounded-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="custom-next w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 text-[#00a8e8] flex items-center justify-center transition-colors cursor-pointer rounded-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <Swiper modules={[Navigation]} navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
          className="w-full h-full" loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 }
          }}>

          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="h-full pb-2">
              <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <div className="relative h-[160px] sm:h-[200px] w-full shrink-0">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
                    <img src={slide.logo} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <h4 className="text-[#00a8e8] font-bold font-bpg text-[13px] sm:text-[15px] leading-tight mb-1.5 sm:mb-2 line-clamp-2">{slide.title}</h4>
                    <p className="text-gray-700 font-bpg text-[12px] sm:text-[13px] leading-snug line-clamp-2">{slide.desc}</p>
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <span className="text-[#00a8e8] line-through text-[12px] sm:text-[13px] mr-2 font-bpg">{slide.oldPrice}</span>
                    <div className="text-black font-bold text-[16px] sm:text-[18px] font-bpg">{slide.newPrice}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}