/**
 * @file CurrencyConverter.tsx
 * @description amindi.ge-ს იდენტური "კონვერტორი" (.converter) მარჯვენა სვეტში.
 * მოიცავს 3 კონვერტორს ზუსტად amindi.ge-ს convertor.js-ის მიხედვით:
 * 1. ტემპერატურა: C° <-> F°
 * 2. მანძილი: კილომეტრი <-> მილი
 * 3. ვალუტა: USD (https://amindi.ge/static/img/usd.png) <-> GEL (https://amindi.ge/static/img/geo.png)
 */

import React, { useState } from 'react';
import { useAppSelector } from '../../store';

const SwapArrowsSvg = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 963.1 963"
    style={{ fill: '#ffffff', marginTop: '7px' }}
    className=" inline-block"
  >
    <g>
      <path d="M0,636.65c0,29.2,21,54.8,50.8,59.3c3.1,0.5,6.1,0.7,9.2,0.7c33.1,0,60-26.9,60-60v-432h402c33.1,0,60-26.9,60-60 s-26.9-60-60-60H60c-33.1,0-60,26.9-60,60V636.65z" />
      <path d="M903.1,758.35h-402c-33.1,0-60,26.9-60,60s26.9,60,60,60h462c33.1,0,60-26.9,60-60v-492c0-29.2-21-54.8-50.8-59.3 c-38.4-5.8-69.2,23.9-69.2,59.3v432H903.1z" />
      <path d="M629.5,246.35l112.9-95.2c26-22,25.9-62.1-0.2-84l-112.9-94.3c-19.3-16.1-48-16.4-67.7-0.8c-26.6,21.1-27.7,61.6-2.3,84.1 l63.7,56.5l-63.5,57.1c-25,22.5-24,62.4,1.9,83.8C581.2,269.85,610.3,262.45,629.5,246.35z" />
      <path d="M333.8,716.65l-112.9,95.2c-26,22-25.9,62.1,0.2,84l112.9,94.3c19.3,16.1,48,16.4,67.7,0.8c26.6-21.1,27.7-61.6,2.3-84.1 l-63.7-56.5l63.5-57.1c25-22.5,24-62.4-1.9-83.8C382.1,693.15,353,700.55,333.8,716.65z" />
    </g>
  </svg>
);

export const CurrencyConverter: React.FC = () => {
  const { currencies } = useAppSelector((state) => state.currency);
  const usdRate = currencies.find((c) => c.code === 'USD')?.rateToday || 2.6902;

  const [isOpen, setIsOpen] = useState(true);

  // 1. ტემპერატურის კონვერტორი (C° <-> F°)
  const [tempSwapped, setTempSwapped] = useState(false);
  const [tempLeft, setTempLeft] = useState('0');
  const [tempRight, setTempRight] = useState('32');

  const handleTempChange = (val: string) => {
    setTempLeft(val);
    const num = parseFloat(val);
    if (isNaN(num)) {
      setTempRight('');
      return;
    }
    if (!tempSwapped) {
      // C -> F
      setTempRight(Math.round((num * 9) / 5 + 32).toString());
    } else {
      // F -> C
      setTempRight(Math.round(((num - 32) * 5) / 9).toString());
    }
  };

  const swapTemp = () => {
    const nextSwapped = !tempSwapped;
    setTempSwapped(nextSwapped);
    const num = parseFloat(tempLeft) || 0;
    if (!nextSwapped) {
      setTempRight(Math.round((num * 9) / 5 + 32).toString());
    } else {
      setTempRight(Math.round(((num - 32) * 5) / 9).toString());
    }
  };

  // 2. მანძილის კონვერტორი (კილომეტრი <-> მილი)
  const [disSwapped, setDisSwapped] = useState(false);
  const [disLeft, setDisLeft] = useState('1');
  const [disRight, setDisRight] = useState('0.62');

  const handleDisChange = (val: string) => {
    setDisLeft(val);
    const num = parseFloat(val);
    if (isNaN(num)) {
      setDisRight('');
      return;
    }
    if (!disSwapped) {
      // km -> ml
      setDisRight((num * 0.62137).toFixed(2));
    } else {
      // ml -> km
      setDisRight((num / 0.62137).toFixed(2));
    }
  };

  const swapDis = () => {
    const nextSwapped = !disSwapped;
    setDisSwapped(nextSwapped);
    const num = parseFloat(disLeft) || 0;
    if (!nextSwapped) {
      setDisRight((num * 0.62137).toFixed(2));
    } else {
      setDisRight((num / 0.62137).toFixed(2));
    }
  };

  // 3. ვალუტის კონვერტორი (USD <-> GEL)
  const [ccySwapped, setCcySwapped] = useState(false);
  const [ccyLeft, setCcyLeft] = useState('1');
  const [ccyRight, setCcyRight] = useState(usdRate.toFixed(4));

  const handleCcyChange = (val: string) => {
    setCcyLeft(val);
    const num = parseFloat(val);
    if (isNaN(num)) {
      setCcyRight('');
      return;
    }
    if (!ccySwapped) {
      // USD -> GEL
      setCcyRight((num * usdRate).toFixed(2));
    } else {
      // GEL -> USD
      setCcyRight((num / usdRate).toFixed(2));
    }
  };

  const swapCcy = () => {
    const nextSwapped = !ccySwapped;
    setCcySwapped(nextSwapped);
    const num = parseFloat(ccyLeft) || 0;
    if (!nextSwapped) {
      setCcyRight((num * usdRate).toFixed(2));
    } else {
      setCcyRight((num / usdRate).toFixed(2));
    }
  };

  return (
    <div className="converter mt-[8px]">
      <button
        type="button"
        id="show-converter"
        onClick={() => setIsOpen((p) => !p)}
        className="w-full h-[42px] bg-[#15aadc] hover:bg-[#1298c5] border border-[#15aadc] rounded-[5px] text-white text-[13px] cursor-pointer transition-colors"
      >
        კონვერტორი
      </button>

      {isOpen && (
        <div className="items">
          {/* 1. C° <-> F° */}
          <div className="item h-[75px] bg-[#eeeeee] mt-[8px] rounded-[5px] text-center flex items-start justify-between px-2">
            <div className="left inline-block w-[40%]">
              <span className="title block text-[#898989] text-[13px] py-[4px]">
                {!tempSwapped ? 'C°' : 'F°'}
              </span>
              <input
                type="text"
                value={tempLeft}
                onChange={(e) => handleTempChange(e.target.value)}
                className="w-[95px] h-[30px] border border-[#898989] rounded-[3px] text-center bg-white text-[#363636] text-[14px]"
              />
            </div>

            <div
              id="convert-temp"
              onClick={swapTemp}
              className="convert inline-block w-[30px] h-[30px] rounded-[30px] bg-[#15aadc] hover:bg-[#1298c5] mt-[28px] cursor-pointer shrink-0"
              title="შეცვლა"
            >
              <SwapArrowsSvg />
            </div>

            <div className="right inline-block w-[40%]">
              <span className="title block text-[#898989] text-[13px] py-[4px]">
                {!tempSwapped ? 'F°' : 'C°'}
              </span>
              <input
                type="text"
                value={tempRight}
                readOnly
                className="w-[95px] h-[30px] border border-[#898989] rounded-[3px] text-center bg-white text-[#363636] text-[14px]"
              />
            </div>
          </div>

          {/* 2. კილომეტრი <-> მილი */}
          <div className="item h-[75px] bg-[#eeeeee] mt-[8px] rounded-[5px] text-center flex items-start justify-between px-2">
            <div className="left inline-block w-[40%]">
              <span className="title block text-[#898989] text-[13px] py-[4px]">
                {!disSwapped ? 'კილომეტრი' : 'მილი'}
              </span>
              <input
                type="text"
                value={disLeft}
                onChange={(e) => handleDisChange(e.target.value)}
                className="w-[95px] h-[30px] border border-[#898989] rounded-[3px] text-center bg-white text-[#363636] text-[14px]"
              />
            </div>

            <div
              id="convert-dis"
              onClick={swapDis}
              className="convert inline-block w-[30px] h-[30px] rounded-[30px] bg-[#15aadc] hover:bg-[#1298c5] mt-[28px] cursor-pointer shrink-0"
              title="შეცვლა"
            >
              <SwapArrowsSvg />
            </div>

            <div className="right inline-block w-[40%]">
              <span className="title block text-[#898989] text-[13px] py-[4px]">
                {!disSwapped ? 'მილი' : 'კილომეტრი'}
              </span>
              <input
                type="text"
                value={disRight}
                readOnly
                className="w-[95px] h-[30px] border border-[#898989] rounded-[3px] text-center bg-white text-[#363636] text-[14px]"
              />
            </div>
          </div>

          {/* 3. USD <-> GEL */}
          <div className="item h-[75px] bg-[#eeeeee] mt-[8px] rounded-[5px] text-center flex items-start justify-between px-2">
            <div className="left inline-block w-[40%]">
              <span className="title block text-[#898989] text-[13px] py-[4px]">
                {!ccySwapped ? (
                  <>
                    <img
                      src="https://amindi.ge/static/img/usd.png"
                      alt="USD"
                      className="inline-block mr-[3px] -mt-[3px]"
                    />
                    USD
                  </>
                ) : (
                  <>
                    <img
                      src="https://amindi.ge/static/img/geo.png"
                      alt="GEL"
                      className="inline-block mr-[3px] -mt-[3px]"
                    />
                    GEL
                  </>
                )}
              </span>
              <input
                type="text"
                value={ccyLeft}
                onChange={(e) => handleCcyChange(e.target.value)}
                className="w-[95px] h-[30px] border border-[#898989] rounded-[3px] text-center bg-white text-[#363636] text-[14px]"
              />
            </div>

            <div
              id="convert-ccy"
              onClick={swapCcy}
              className="convert inline-block w-[30px] h-[30px] rounded-[30px] bg-[#15aadc] hover:bg-[#1298c5] mt-[28px] cursor-pointer shrink-0"
              title="შეცვლა"
            >
              <SwapArrowsSvg />
            </div>

            <div className="right inline-block w-[40%]">
              <span className="title block text-[#898989] text-[13px] py-[4px]">
                {!ccySwapped ? (
                  <>
                    <img
                      src="https://amindi.ge/static/img/geo.png"
                      alt="GEL"
                      className="inline-block mr-[3px] -mt-[3px]"
                    />
                    GEL
                  </>
                ) : (
                  <>
                    <img
                      src="https://amindi.ge/static/img/usd.png"
                      alt="USD"
                      className="inline-block mr-[3px] -mt-[3px]"
                    />
                    USD
                  </>
                )}
              </span>
              <input
                type="text"
                value={ccyRight}
                readOnly
                className="w-[95px] h-[30px] border border-[#898989] rounded-[3px] text-center bg-white text-[#363636] text-[14px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
