import longAdVideo from '../../assets/ads/Palitra-LONG.mp4';

export function PalitraLongAd(){
  return(
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <video 
        src={longAdVideo} 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="none" // 🆕 SEO/Accessibility: ვიდეო არ იტვირთოს წინასწარ
        aria-label="რეკლამა: რადიო პალიტრა" // 🆕 SEO/Accessibility: აუდიო აღწერა
        className="w-full h-full object-contain scale-[1.02]" 
      />
    </div>
  );
}