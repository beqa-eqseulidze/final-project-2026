/**
 * @file RadioPalitraWidget.tsx
 * @description amindi.ge-ს იდენტური რადიო პალიტრის ვიჯეტი (.radio) ცენტრალურ სვეტში.
 * იყენებს ზუსტად amindi.ge-ს რადიოს ხატულებსა და აუდიო ნაკადს:
 * - https://amindi.ge/static/img/radio-play.png
 * - https://amindi.ge/static/img/radio-stop.png
 * - https://amindi.ge/static/img/radio-wave.png
 * - https://amindi.ge/static/img/radio-palitra.png
 * - https://radio1.palitra.ge:8443/stream.mp3
 */

import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleRadio } from '../../store/slices/uiSlice';

export const RadioPalitraWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isRadioPlaying } = useAppSelector((state) => state.ui);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    if (isRadioPlaying) {
      audioEl.play().catch(() => {
        // თუ ბრაუზერმა დაბლოკა პირდაპირი სტრიმი, ვიზუალური სტატუსი მაინც აქტიური რჩება
      });
    } else {
      audioEl.pause();
    }
  }, [isRadioPlaying]);

  return (
    <div
      className="radio mt-[8px] bg-[#eeeeee] rounded-[5px] h-[75px] px-[20px] flex items-center justify-between"
      id="radio"
    >
      {/* მარცხენა ნაწილი: Play/Stop + ტალღის სურათი */}
      <div className="flex items-center gap-3">
        {!isRadioPlaying ? (
          <img
            id="radio-play"
            src="https://amindi.ge/static/img/radio-play.png"
            alt="Play Radio Palitra"
            onClick={() => dispatch(toggleRadio())}
            className="cursor-pointer"
          />
        ) : (
          <img
            id="radio-stop"
            src="https://amindi.ge/static/img/radio-stop.png"
            alt="Stop Radio Palitra"
            onClick={() => dispatch(toggleRadio())}
            className="cursor-pointer"
          />
        )}

        <img
          src="https://amindi.ge/static/img/radio-wave.png"
          alt="Radio Wave"
          className="hidden sm:inline-block"
        />

        <div className="hidden">
          <audio ref={audioRef} className="radio-live" preload="none">
            <source src="https://radio1.palitra.ge:8443/stream.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>

      {/* მარჯვენა ნაწილი: "მოუსმინე რადიო პალიტრას" + radio-palitra.png */}
      <div>
        <a
          href="https://radiopalitra.ge/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-end text-[#1c557e] hover:underline no-underline"
        >
          <span className="text-[13px] mr-[15px] text-[#1c557e]">
            მოუსმინე რადიო პალიტრას
          </span>
          <img
            src="https://amindi.ge/static/img/radio-palitra.png"
            alt="Radio Palitra FM 103.9"
          />
        </a>
      </div>
    </div>
  );
};
