import newsAdVideo from '../../assets/ads/PALITRA-NEWS.mp4';

export function PalitraNewsAd(){
  return(
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <video src={newsAdVideo} autoPlay loop muted playsInline
        className="w-full h-full object-contain scale-[1.02]"/>
    </div>
  );
}