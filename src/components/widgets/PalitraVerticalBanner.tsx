/**
 * @file PalitraVerticalBanner.tsx
 * @description მარჯვენა სვეტის სარეკლამო ბანერის ბლოკი (300x250 ფორმატი amindi.ge-ს მარჯვენა სვეტში, კონვერტორის ზემოთ).
 */

import React from 'react';

export const PalitraVerticalBanner: React.FC = () => {
  return (
    <div className="w-full rounded-[5px] overflow-hidden bg-gradient-to-b from-[#19375c] to-[#0f2540] text-white text-center p-4 shadow-sm border border-[#15aadc]/30">
      <a
        href="https://palitranews.ge/"
        target="_blank"
        rel="noreferrer"
        className="block no-underline text-white"
      >
        <div className="inline-block bg-[#cc0000] text-white px-4 py-1.5 rounded-[3px] font-black tracking-tight uppercase mb-2.5">
          <div className="text-[15px] font-extrabold leading-none">PALITRA</div>
          <div className="text-[10px] tracking-widest text-red-100 leading-tight">NEWS</div>
        </div>

        <h4 className="text-[13px] font-bold text-[#f9bf3b] mb-1">
          ახალი ამბების ტელევიზია
        </h4>
        <p className="text-[11px] text-white/90 m-0">
          თავისუფალი საზოგადოებისთვის
        </p>
      </a>
    </div>
  );
};
