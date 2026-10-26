/**
 * @file BackgroundSky.tsx
 * @description amindi.ge-ს დინამიური ფონის კომპონენტი (Dynamic Background Sky Component).
 *
 * დანიშნულება და მუშაობის პრინციპი:
 * 1. ავტომატური საათობრივი დეტექცია:
 *    - კომპონენტი იყენებს JavaScript-ის `Date().getHours()`-ს მომხმარებლის ლოკალური დროის დასადგენად.
 *    - `useEffect` ჰუკით დაყენებულია 1-წუთიანი ინტერვალი (60,000ms), რათა დრო რეალურ რეჟიმში განახლდეს.
 *
 * 2. დღე-ღამის ცვლა (Day/Night Switching):
 *    - დილა/შუადღე (07:00-დან 19:00-მდე): აქტიურდება დღის მზიანი ცის ფონი (`sun2.jpg`).
 *    - საღამო/ღამე (19:00-დან 07:00-მდე): აქტიურდება ღამის მოღრუბლული ცის ფონი (`clouds_night2.jpg`).
 *
 * 3. CSS სტილიზაცია:
 *    - `background-attachment: fixed` — ფონი რჩება უძრავი სქროლვის დროს (Parallax ეფექტით).
 *    - `background-size: cover` — ფონი სრულად ავსებს ეკრანის ნებისმიერ რეზოლუციას.
 *    - `min-height: 100vh` — უზრუნველყოფს, რომ მთლიანი ეკრანის სიმაღლე ყოველთვის დაფარული იყოს.
 */

import React, { useState, useEffect } from 'react';

/** კომპონენტის Props ინტერფეისი */
interface BackgroundSkyProps {
  /** შიგთავსი, რომელიც მოთავსდება ფონის ზემოთ (ჰედერი, მთავარი ნაწილი, ფუტერი) */
  children: React.ReactNode;
}

export const BackgroundSky: React.FC<BackgroundSkyProps> = ({ children }) => {
  // მიმდინარე ლოკალური საათის შენახვა (0-დან 23-მდე)
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());

  // ტაიმერი საათის ყოველ წუთში გადასამოწმებლად
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);

    // კომპონენტის Unmount-ის დროს ტაიმერის გასუფთავება მეხსიერების გაჟონვის თავიდან ასაცილებლად
    return () => clearInterval(timer);
  }, []);

  // ლოგიკა: თუ საათი 7-ზე ნაკლებია ან 19-ის ტოლია/მეტია, ითვლება ღამედ
  const isNightTime = currentHour < 7 || currentHour >= 19;

  // amindi.ge-ს ორიგინალი ფონის სურათის შერჩევა
  const bgImage = isNightTime
    ? 'https://amindi.ge/static/img/bg/clouds_night2.jpg'
    : 'https://amindi.ge/static/img/sun2.jpg';

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      {/* გადმოცემული შიდა კომპონენტების დარენდერება */}
      {children}
    </div>
  );
};
