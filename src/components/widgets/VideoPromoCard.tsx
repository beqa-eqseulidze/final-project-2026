/**
 * @file VideoPromoCard.tsx
 * @description amindi.ge-ს იდენტური ვიდეო ბლოკი (.video-container) ცენტრალურ სვეტში.
 * იყენებს ზუსტად amindi.ge-ზე ჩაშენებულ დრონის ვიდეოს:
 * https://video.ambebi.ge/files-6/2021/03-19//droni-2-291539.mp4
 */

import React from 'react';

export const VideoPromoCard: React.FC = () => {
  return (
    <div className="video-container w-full mt-2 rounded-[5px] overflow-hidden bg-black">
      <video
        width="100%"
        height="100%"
        controls
        autoPlay
        muted
        loop
        playsInline
        className="w-full block"
      >
        <source
          src="https://video.ambebi.ge/files-6/2021/03-19//droni-2-291539.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
