import longAdVideo from '../../assets/ads/Palitra-LONG.mp4';
import { ViewportVideo } from './ViewportVideo';

export function PalitraLongAd(){
  return <ViewportVideo src={longAdVideo} className="w-full h-full object-contain scale-[1.02]" />;
}
