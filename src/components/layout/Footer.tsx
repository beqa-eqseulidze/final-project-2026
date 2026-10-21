/**
 * @file Footer.tsx
 * @description amindi.ge-ს იდენტური ქვედა ნაწილი (Footer Component).
 *
 * კომპონენტის შემადგენლობა:
 * 1. მარცხენა სექცია:
 *    - amindi.ge-ს ოფიციალური ლოგო (https://amindi.ge/static/img/header-logo.png)
 *
 * 2. ცენტრალური ნავიგაცია (Footer Navigation):
 *    - ზუსტად ის 5 ძირითადი ბმული, რაც ორიგინალ საიტზეა:
 *      1) ამინდის პროგნოზი
 *      2) ჯანმრთელობა (mkurnali.ge)
 *      3) რადიო (radiopalitra.ge)
 *      4) სასარგებლო ინფორმაცია (world-clock)
 *      5) რეკლამა (adline.ge)
 *    - ფერი: ნაგულისხმევად შავი (#000), Hover-ზე თეთრი (#fff), შრიფტი font1.
 *
 * 3. მარჯვენა სექცია (TOP.GE Counter):
 *    - TOP.GE-ს ოფიციალური რეიტინგის მთვლელის ბეიჯი რეალური სტატისტიკით.
 *    - გათვალისწინებულია სარეზერვო ვიზუალი (Fallback UI), თუ სურათი დროებით მიუწვდომელი იქნება.
 *
 * 4. რესპონსიულობა:
 *    - შიგთავსი შემოფარგლულია `.amindi-container`-ით, რომელსაც გვერდებზე აქვს დაცული დაშორებები.
 */

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full mt-auto select-none font-amindi1"
      style={{
        backgroundColor: 'rgba(25, 55, 92, 0.5)',
        padding: '10px 0',
      }}
    >
      {/* amindi.ge-ს რესპონსიული კონტეინერი */}
      <div className="amindi-container flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* მარცხენა მხარე: ლოგო */}
        <div className="shrink-0">
          <a href="/ka/" className="flex items-center" title="Amindi.ge">
            <img
              src="https://amindi.ge/static/img/header-logo.png"
              alt="amindi.ge"
              style={{ height: '40px' }}
            />
          </a>
        </div>

        {/* ცენტრალური მხარე: 5 ნავიგაციური ბმული */}
        <div className="flex-1 flex justify-center">
          <ul className="m-0 p-0 list-none flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px]">
            {/* 1. ამინდის პროგნოზი */}
            <li>
              <a
                href="/ka/"
                className="text-[#000] hover:text-white transition-colors no-underline"
              >
                ამინდის პროგნოზი
              </a>
            </li>

            {/* 2. ჯანმრთელობა */}
            <li>
              <a
                href="https://mkurnali.ge/"
                target="_blank"
                rel="noreferrer"
                className="text-[#000] hover:text-white transition-colors no-underline"
              >
                ჯანმრთელობა
              </a>
            </li>

            {/* 3. რადიო */}
            <li>
              <a
                href="http://radiopalitra.ge/"
                target="_blank"
                rel="noreferrer"
                className="text-[#000] hover:text-white transition-colors no-underline"
              >
                რადიო
              </a>
            </li>

            {/* 4. სასარგებლო ინფორმაცია */}
            <li>
              <a
                href="https://amindi.ge/ka/world-clock/"
                target="_blank"
                rel="noreferrer"
                className="text-[#000] hover:text-white transition-colors no-underline"
              >
                სასარგებლო ინფორმაცია
              </a>
            </li>

            {/* 5. რეკლამა */}
            <li>
              <a
                href="http://adline.ge/advertisements/internet?filter[id]=2&filter[start_age]=&filter[end_age]=&filter[sex]=&filter[interest]=&filter[regions]="
                target="_blank"
                rel="noreferrer"
                className="text-[#000] hover:text-white transition-colors no-underline"
              >
                რეკლამა
              </a>
            </li>
          </ul>
        </div>

        {/* მარჯვენა მხარე: TOP.GE რეიტინგის მთვლელი */}
        <div className="shrink-0 flex items-center justify-end">
          <a
            href="https://www.top.ge/index.php?h=24228#24228"
            target="_blank"
            rel="noreferrer"
            className="block"
            title="TOP.GE რეიტინგი"
          >
            <img
              src="//counter.top.ge/cgi-bin/count?ID:24228+JS:true"
              alt="TOP.GE"
              className="border-0"
              onError={(e) => {
                // სარეზერვო ვიზუალი, თუ რეალური სურათი დროებით ვერ ჩაიტვირთება
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* სარეზერვო ბლოკი */}
            <div
              style={{ display: 'none' }}
              className="w-[88px] h-[31px] bg-[#c5c5c5] text-black text-[9px] font-sans px-1 flex-col justify-between py-0.5 rounded-xs"
            >
              <div className="flex justify-between items-center text-[8px] leading-tight font-mono">
                <span>34183365</span>
              </div>
              <div className="flex justify-between items-center text-[8px] leading-tight font-mono">
                <span>46308</span>
              </div>
              <div className="flex justify-between items-center text-[8px] leading-tight font-bold">
                <span className="font-sans text-[9px]">TOP.GE</span>
                <span className="font-mono text-[8px]">19245</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};
