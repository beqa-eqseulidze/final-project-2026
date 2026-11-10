import longAdVideo from '../../assets/ads/Palitra-LONG.mp4';

export function PalitraLongAd(){
  return(
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <video src={longAdVideo} autoPlay loop muted playsInline
        className="w-full h-full object-contain scale-[1.02]" />
    </div>
  );
}