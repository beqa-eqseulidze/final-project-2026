import newsAdVideo from '../../assets/ads/PALITRA-NEWS.mp4';
import { ViewportVideo } from './ViewportVideo';

export function PalitraNewsAd(){
  return <ViewportVideo src={newsAdVideo} className="w-full h-full object-contain scale-[1.02]" />;
}
