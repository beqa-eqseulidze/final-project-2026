/**
 * @file AllHourlyModal.tsx
 * @description "იხილეთ სრულად" მოდალური ფანჯარა საათობრივი პროგნოზისთვის (https://amindi.ge/ka/hourly/tbilisi/?d=5 იდენტური).
 * იყენებს amindi.ge-ს საათობრივ ხატულებს: https://amindi.ge/static/img/weather_{iconCode}.png
 */

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setHourlyModalOpen } from '../../store/slices/uiSlice';
import { formatTempValue, getMediumIconUrl } from '../../utils/weatherUtils';
import { Modal } from '../common/Modal';

export const AllHourlyModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isHourlyModalOpen, unit } = useAppSelector((state) => state.ui);
  const { cities, selectedCityId } = useAppSelector((state) => state.weather);

  const city = cities.find((c) => c.id === selectedCityId) || cities[0];

  if (!city) return null;

  return (
    <Modal
      isOpen={isHourlyModalOpen}
      onClose={() => dispatch(setHourlyModalOpen(false))}
      title={`${city.nameKa} - ამინდი საათების მიხედვით`}
      subtitle="სრული 24-საათიანი პროგნოზი (amindi.ge)"
      maxWidth="lg"
    >
      <div className="weather-hourly bg-[#eeeeee] rounded-[5px] p-3">
        <span className="block text-center text-[#363636] text-[16px] pb-2">
          ამინდი საათების მიხედვით
        </span>

        <div className="space-y-1 max-h-[65vh] overflow-y-auto pr-1">
          {city.hourly.map((h) => {
            const hourFormatted = h.hour.includes(':')
              ? h.hour
              : `${h.hour.replace(' საათი', '').padStart(2, '0')}:00`;
            return (
              <div
                key={h.id}
                className="flex items-center justify-between bg-white rounded-[4px] px-4 py-1.5 text-[#363636] text-[14px]"
              >
                <div className="w-2/12 text-center font-medium">{hourFormatted}</div>
                <div className="w-2/12 flex justify-center">
                  <img
                    src={getMediumIconUrl(h.condition, h.iconCode)}
                    alt={h.conditionLabel}
                    className="w-[46px] h-auto"
                  />
                </div>
                <div className="w-2/12 text-center font-amindi1 text-[18px]">
                  {formatTempValue(h.temp, unit)}
                </div>
                <div className="w-6/12 text-left text-[13px] text-[#363636]">
                  {h.conditionLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
