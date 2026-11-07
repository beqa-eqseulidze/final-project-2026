import { SlideData } from './types';

// სურათების იმპორტი
import img1 from '../assets/images/slider1.png';
import img2 from '../assets/images/slider2.png';
import img3 from '../assets/images/slider3.png';
import img4 from '../assets/images/slider4.png';

import logo1 from '../assets/logo/logo1.png';
import logo2 from '../assets/logo/logo2.png';
import logo3 from '../assets/logo/logo3.png';
import logo4 from '../assets/logo/logo4.png';

// მასივი, რომელსაც App.tsx-ში გადავცემთ
export const sliderData: SlideData[] = [
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