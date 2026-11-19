import newsAdVideo from '../../assets/ads/PALITRA-NEWS.mp4';
import { LazyAutoplayVideo } from './LazyAutoplayVideo';

export function PalitraNewsAd() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-[#102238]/20">
      <LazyAutoplayVideo
        src={newsAdVideo}
        ariaLabel="რეკლამა: პალიტრა ნიუსი - ახალი ამბების ტელევიზია"
        className="w-full h-full object-contain scale-[1.02]"
      />
    </div>
  );
}