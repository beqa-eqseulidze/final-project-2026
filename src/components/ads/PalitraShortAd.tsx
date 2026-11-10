import shortAdVideo from '../../assets/ads/Palitra-SHORT.mp4';

export function PalitraShortAd(){
  return(
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <video src={shortAdVideo} autoPlay loop muted  playsInline
        className="w-full h-full object-cover scale-[1]" />
    </div>
  );
}