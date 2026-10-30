import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

//სურათები:
import img1 from './images/slider1.png';
import img2 from './images/slider2.png';
import img3 from './images/slider3.png';
import img4 from './images/slider4.png';

//ლოგოები:
import logo1 from './logo/logo1.png';
import logo2 from './logo/logo2.png';
import logo3 from './logo/logo3.png';
import logo4 from './logo/logo4.png';
import hotsaleLogo from './logo/hotsale.png'; 

//მონაცემები
const slides = [
  {
    id: 1,
    image: img1,
    logo: logo1,
    title: 'გოლდენ ტულიპ ბორჯომი • GOLDEN TULIP BORJOMI',
    desc: 'ბორჯომში ნომერი 2 სტუმარზე საუზმით ან საუზმის გარეშე და',
    oldPrice: '260 ₾',
    newPrice: '177 ₾'
  },
  {
    id: 2,
    image: img2,
    logo: logo2,
    title: 'ბუტიკ სასტუმრო ესკიზი • Esquisse...',
    desc: 'კახეთში ნომერი 2 ან 3 სტუმარზე საუზმით, მიდა და',
    oldPrice: '435 ₾',
    newPrice: '335 ₾'
  },
  {
    id: 3,
    image: img3,
    logo: logo3,
    title: 'სასტუმრო რიქსოსი',
    desc: 'თბილისში ნომერი 2 სტუმარზე საუზმით და სპა მომსახურებით',
    oldPrice: '550 ₾',
    newPrice: '420 ₾'
  },
  {
    id: 4,
    image: img4,
    logo: logo4,
    title: 'შერატონ მეტეხი პალასი',
    desc: 'თბილისში ნომერი 2 სტუმარზე საუზმით, ღვინით და ვახშმით',
    oldPrice: '600 ₾',
    newPrice: '480 ₾'
  }
];

export function Slider(){
  return(
    <div className="w-full h-[460px] relative bg-transparent flex flex-col">
      <div className="bg-[#00a8e8] text-white px-5 py-2.5 flex justify-between items-center shrink-0">
        <h3 className="font-bpg text-[20px]">შეიძინე დანაზოგით</h3>
        
        {/* HOTSALE LOGO */}
        <img src={hotsaleLogo} alt="" className="h-8 object-contain"/>
      </div>

      <div className="relative flex-1 p-4 bg-white/40">
        {/* ისრები */}
        <div className="absolute top-[16px] right-[16px] z-20 flex gap-1">
          <button className="custom-prev w-8 h-8 bg-gray-200 hover:bg-gray-300 text-[#00a8e8] flex items-center justify-center transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="custom-next w-8 h-8 bg-gray-200 hover:bg-gray-300 text-[#00a8e8] flex items-center justify-center transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <Swiper modules={[Navigation]} navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
          className="w-full h-full" loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 }
          }}>
          {slides.map((slide)=>(
            <SwiperSlide key={slide.id} className="h-full pb-2">
              <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                
                {/* სურათი */}
                <div className="relative h-[200px] w-full shrink-0">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover"/>

                  {/* ლოგო */}
                  <div className="absolute bottom-3 right-3 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
                    <img src={slide.logo} alt="" className="w-full h-full object-cover"/>
                  </div>
                </div>
                
                {/* ტექსტი */}
                <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <h4 className="text-[#00a8e8] font-bpg text-[17px] leading-tight mb-2 line-clamp-2">
                      {slide.title}
                    </h4>
                    <p className="text-gray-700 font-bpg text-[13px] leading-snug line-clamp-2">
                      {slide.desc}
                    </p>
                  </div>
                  
                  {/* ფასები - ძველი/ახალი */}
                  <div className="mt-3">
                    <span className="text-[#00a8e8] line-through text-[13px] mr-2 font-bpg">
                      {slide.oldPrice}
                    </span>
                    <div className="text-black font-bold text-[18px] font-bpg">
                      {slide.newPrice}
                    </div>
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