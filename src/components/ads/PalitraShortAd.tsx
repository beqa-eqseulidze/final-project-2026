import shortAdVideo from '../../assets/ads/Palitra-SHORT.mp4';
import { ViewportVideo } from './ViewportVideo';

export function PalitraShortAd(){
  return <ViewportVideo src={shortAdVideo} className="w-full h-full object-cover scale-[1]" />;
}
