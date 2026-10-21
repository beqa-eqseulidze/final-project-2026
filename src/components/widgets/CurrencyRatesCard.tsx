/**
 * @file CurrencyRatesCard.tsx
 * @description amindi.ge-ს იდენტური "ოფიციალური კურსი" ბლოკი (.currency) მარცხენა სვეტში.
 * მოიცავს:
 * - სათაურს "ოფიციალური კურსი" (17px)
 * - ცხრილს (17 ოქტ, 20 ოქტ, SVG ისრები)
 * - 1 USD, 1 EUR, 100 RUB სტრიქონებს
 * - "ყველა ვალუტა" ღილაკს (#15aadc) და CRUD მართვას
 */

import React from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  openAddCurrencyModal,
  openEditCurrencyModal,
  setAllCurrenciesModalOpen,
} from '../../store/slices/uiSlice';

export const CurrencyRatesCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currencies } = useAppSelector((state) => state.currency);

  // amindi.ge-ს მარცხენა სვეტში გამოაქვს პირველი 3 ვალუტა (1 USD, 1 EUR, 100 RUB)
  const topCurrencies = currencies.slice(0, 3);

  return (
    <div
      className="currency text-center text-white mt-[8px] py-[8px] relative group"
      style={{ backgroundColor: 'rgba(25, 55, 92, 0.5)' }}
    >
      {/* CRUD დამატების ღილაკი მაუსის მიტანისას */}
      <button
        type="button"
        onClick={() => dispatch(openAddCurrencyModal())}
        className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 text-[10px] text-white bg-white/15 hover:bg-white/25 px-1.5 py-0.5 rounded flex items-center gap-0.5 cursor-pointer border-0"
        title="ვალუტის დამატება (Formik/Yup CRUD)"
      >
        <Plus className="w-3 h-3" />
        <span>CRUD</span>
      </button>

      <span className="title block text-[17px] text-white mb-1">ოფიციალური კურსი</span>

      <table className="w-full text-[12px] text-white border-collapse mb-0">
        <thead>
          <tr>
            <td className="p-[6px]" />
            <td className="p-[6px]">17 ოქტ</td>
            <td className="p-[6px]">20 ოქტ</td>
            <td className="p-[6px]">
              <span className="inline-flex items-center justify-center">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14px"
                  height="14px"
                  viewBox="0 0 292.362 292.361"
                  style={{ fill: '#fff' }}
                >
                  <g>
                    <path d="M286.935,197.287L159.028,69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233,1.807-12.85,5.424L5.424,197.287 C1.807,200.904,0,205.186,0,210.134s1.807,9.233,5.424,12.847c3.621,3.617,7.902,5.425,12.85,5.425h255.813 c4.949,0,9.233-1.808,12.848-5.425c3.613-3.613,5.427-7.898,5.427-12.847S290.548,200.904,286.935,197.287z" />
                  </g>
                </svg>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14px"
                  height="14px"
                  viewBox="0 0 292.362 292.362"
                  style={{ marginLeft: '-4px', fill: '#fff' }}
                >
                  <g>
                    <path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428 s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z" />
                  </g>
                </svg>
              </span>
            </td>
          </tr>
        </thead>
        <tbody>
          {topCurrencies.map((c) => {
            const diff = (c.rateYesterday - c.rateToday).toFixed(4);
            return (
              <tr
                key={c.id}
                onClick={() => dispatch(openEditCurrencyModal(c.id))}
                className="hover:bg-white/10 cursor-pointer transition-colors"
                title="დააჭირეთ რედაქტირებისთვის (Formik/Yup CRUD)"
              >
                <th scope="row" className="p-[6px] font-bold text-center">
                  {c.multiplier} {c.code}
                </th>
                <td className="p-[6px]">{c.rateYesterday.toFixed(4)}</td>
                <td className="p-[6px]">{c.rateToday.toFixed(4)}</td>
                <td className="p-[6px]">{diff}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() => dispatch(setAllCurrenciesModalOpen(true))}
        className="mt-[8px] h-[33px] px-4 bg-[#15aadc] hover:bg-[#1298c5] text-white text-[13px] rounded-[4px] border border-[#15aadc] transition-colors inline-flex items-center justify-center cursor-pointer"
      >
        ყველა ვალუტა
      </button>
    </div>
  );
};
