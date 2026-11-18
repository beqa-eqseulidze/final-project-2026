import shortAdVideo from '../../assets/ads/Palitra-SHORT.mp4';

export function PalitraShortAd(){
  return(
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
<<<<<<< HEAD
      <video src={shortAdVideo} autoPlay loop muted playsInline
        preload="none" // SEO/Accessibility
        aria-label="რეკლამა: პალიტრა" // 🆕 SEO/Accessibility
        className="w-full h-full object-cover scale-[1]" />
=======
      <video 
        src={shortAdVideo} 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="none" // 🆕 SEO/Accessibility
        aria-label="რეკლამა: პალიტრა" // 🆕 SEO/Accessibility
        className="w-full h-full object-cover scale-[1]" 
      />
>>>>>>> 66abb441ee2a6c6839fc53f353de52fd5cf75aee
    </div>
  );
}