import longAdVideo from '../../assets/ads/Palitra-LONG.mp4';
import { LazyAutoplayVideo } from './LazyAutoplayVideo';

export function PalitraLongAd(){
  return(
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <LazyAutoplayVideo src={longAdVideo} className="w-full h-full object-contain scale-[1.02]" />
    </div>
  );
}