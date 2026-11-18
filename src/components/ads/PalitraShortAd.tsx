import shortAdVideo from '../../assets/ads/Palitra-SHORT.mp4';
import { LazyAutoplayVideo } from './LazyAutoplayVideo';

export function PalitraShortAd() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <LazyAutoplayVideo
        src={shortAdVideo}
        className="w-full h-full object-cover scale-[1]"
      />
    </div>
  );
}