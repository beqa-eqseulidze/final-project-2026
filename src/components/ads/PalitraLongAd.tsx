import longAdVideo from '../../assets/ads/Palitra-LONG.mp4';
import { LazyAutoplayVideo } from './LazyAutoplayVideo';

export function PalitraLongAd() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-[#102238]/20">
      <LazyAutoplayVideo
        src={longAdVideo}
        ariaLabel="რეკლამა: რადიო პალიტრა"
        className="w-full h-full object-contain scale-[1.02]"
      />
    </div>
  );
}