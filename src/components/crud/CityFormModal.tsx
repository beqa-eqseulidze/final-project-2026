/**
 * @file CityFormModal.tsx
 * @description ქალაქის დამატებისა და რედაქტირების მოდალური ფორმა.
 * აგებულია Formik-ისა და Yup-ის გამოყენებით (CRUD არქიტექტურა).
 * 
 * ვალიდაციის წესები (Yup):
 * - nameKa, nameEn: სავალდებულო, მინიმუმ 2 სიმბოლო
 * - currentTemp: -50-დან +60-მდე
 * - tempMin, tempMax: tempMax უნდა იყოს >= tempMin-ზე
 * - condition: ამინდის ტიპი ('sunny', 'cloudy' და ა.შ.)
 * - windSpeed, windDirection, pressure, humidity: ატმოსფერული ვალიდაცია
 * 
 * მოქმედება:
 * - Submit-ისას ქმნის ახალ ქალაქს (addCity) ან აახლებს არსებულს (updateCity)
 * - წაშლის ღილაკით შლის ქალაქს ბაზიდან (deleteCity)
 */

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Save, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeCityModal } from '../../store/slices/uiSlice';
import { addCity, deleteCity, updateCity } from '../../store/slices/weatherSlice';
import { CityWeather, WeatherCondition } from '../../types/weather.types';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

// Yup ვალიდაციის სქემა ქართული შეცდომების ტექსტებით
const CitySchema = Yup.object().shape({
  nameKa: Yup.string()
    .min(2, 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს')
    .max(50, 'სახელი ძალიან გრძელია')
    .required('ქალაქის ქართული სახელი სავალდებულოა'),
  nameEn: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('ქალაქის ინგლისური სახელი სავალდებულოა'),
  region: Yup.string().optional(),
  currentTemp: Yup.number()
    .min(-50, 'ტემპერატურა არ შეიძლება იყოს -50-ზე ნაკლები')
    .max(60, 'ტემპერატურა არ შეიძლება იყოს 60-ზე მეტი')
    .required('ტემპერატურა სავალდებულოა'),
  tempMin: Yup.number()
    .required('მინიმალური ტემპერატურა სავალდებულოა'),
  tempMax: Yup.number()
    .required('მაქსიმალური ტემპერატურა სავალდებულოა')
    .test('is-greater-or-equal', 'მაქსიმალური უნდა იყოს მინიმალურზე მეტი ან ტოლი', function (val) {
      const { tempMin } = this.parent;
      return typeof val === 'number' && typeof tempMin === 'number' ? val >= tempMin : true;
    }),
  condition: Yup.mixed<WeatherCondition>()
    .oneOf(['sunny', 'partly-cloudy', 'cloudy', 'rainy', 'thunderstorm', 'snowy', 'windy'])
    .required('ამინდის პირობა სავალდებულოა'),
  conditionLabel: Yup.string()
    .required('აღწერილობა სავალდებულოა'),
  windSpeed: Yup.number()
    .min(0, 'ქარის სიჩქარე უნდა იყოს 0 ან მეტი')
    .required('ქარის სიჩქარე სავალდებულოა'),
  windDirection: Yup.string()
    .required('ქარის მიმართულება სავალდებულოა'),
  pressure: Yup.number()
    .min(50, 'წნევა უნდა იყოს რეალისტური')
    .required('წნევა სავალდებულოა'),
  humidity: Yup.number()
    .min(0, 'ტენიანობა მინიმუმ 0%')
    .max(100, 'ტენიანობა მაქსიმუმ 100%')
    .required('ტენიანობა სავალდებულოა'),
  feelsLike: Yup.number()
    .required('მგრძნობელობა სავალდებულოა'),
});

export const CityFormModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCityModalOpen, editingCityId } = useAppSelector((state) => state.ui);
  const { cities } = useAppSelector((state) => state.weather);

  const isEditing = Boolean(editingCityId);
  const existingCity = cities.find((c) => c.id === editingCityId);

  // საწყისი მნიშვნელობები Formik-ისთვის
  const initialValues: Partial<CityWeather> = existingCity || {
    nameKa: '',
    nameEn: '',
    region: 'საქართველო',
    currentTemp: 22,
    tempMin: 15,
    tempMax: 25,
    condition: 'partly-cloudy',
    conditionLabel: 'ნაწილობრივ მზიანი',
    windSpeed: 15,
    windDirection: 'NW',
    pressure: 101.5,
    pressureUnit: 'kpa',
    feelsLike: 22,
    feelsLikeWind: 22,
    humidity: 60,
    visibility: 18,
    lat: 41.7,
    lon: 44.8,
  };

  // Formik-ის ინიციალიზაცია
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: CitySchema,
    onSubmit: (values) => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      if (isEditing && editingCityId && existingCity) {
        // არსებული ქალაქის განახლება (UPDATE)
        const updated: CityWeather = {
          ...existingCity,
          ...values,
          lastUpdated: timeStr,
        } as CityWeather;
        dispatch(updateCity(updated));
      } else {
        // ახალი ქალაქის შექმნა (CREATE)
        const id = values.nameEn ? values.nameEn.toLowerCase().replace(/\s+/g, '-') : `city-${Date.now()}`;
        const newCity: CityWeather = {
          ...values,
          id,
          lat: values.lat || 41.7151,
          lon: values.lon || 44.8271,
          pressureUnit: 'kpa',
          feelsLikeWind: values.feelsLike || values.currentTemp || 20,
          visibility: values.visibility || 16,
          lastUpdated: timeStr,
          isCustom: true,
          hourly: [
            { id: `h-${id}-1`, hour: '18 საათი', temp: values.currentTemp || 20, condition: values.condition || 'sunny', conditionLabel: values.conditionLabel || 'მზიანი' },
            { id: `h-${id}-2`, hour: '19 საათი', temp: (values.currentTemp || 20) - 2, condition: values.condition || 'sunny', conditionLabel: values.conditionLabel || 'მზიანი' },
            { id: `h-${id}-3`, hour: '20 საათი', temp: (values.currentTemp || 20) - 3, condition: 'partly-cloudy', conditionLabel: 'ნაწილობრივ ღრუბლიანი' },
          ],
          daily: [
            { id: `d-${id}-1`, dayName: 'ორშაბათი', date: 'დღეს', tempMin: values.tempMin || 14, tempMax: values.tempMax || 24, condition: values.condition || 'sunny', conditionLabel: values.conditionLabel || 'მზიანი' },
            { id: `d-${id}-2`, dayName: 'სამშაბათი', date: 'ხვალ', tempMin: (values.tempMin || 14) - 1, tempMax: values.tempMax || 24, condition: 'partly-cloudy', conditionLabel: 'ნაწილობრივ მზიანი' },
          ],
        } as CityWeather;
        dispatch(addCity(newCity));
      }

      dispatch(closeCityModal());
    },
  });

  /** ქალაქის წაშლა (DELETE) */
  const handleDelete = () => {
    if (editingCityId && confirm('დარწმუნებული ხართ, რომ გსურთ ქალაქის წაშლა?')) {
      dispatch(deleteCity(editingCityId));
      dispatch(closeCityModal());
    }
  };

  return (
    <Modal
      isOpen={isCityModalOpen}
      onClose={() => dispatch(closeCityModal())}
      title={isEditing ? `ქალაქის რედაქტირება: ${existingCity?.nameKa}` : 'ახალი ქალაქის დამატება'}
      subtitle="მონაცემების მართვა Formik & Yup ვალიდაციით (CRUD)"
      maxWidth="lg"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* ქალაქის სახელები (ქართულად და ინგლისურად) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ქალაქის სახელი (ქართულად) *
            </label>
            <input
              type="text"
              name="nameKa"
              placeholder="მაგ. ბათუმი, გორი..."
              value={formik.values.nameKa || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full text-xs px-3 py-2 rounded border focus:outline-hidden focus:ring-1 ${
                formik.touched.nameKa && formik.errors.nameKa
                  ? 'border-rose-500 ring-rose-200'
                  : 'border-slate-300 focus:border-sky-500'
              }`}
            />
            {formik.touched.nameKa && formik.errors.nameKa && (
              <p className="text-[11px] text-rose-600 mt-1">{formik.errors.nameKa}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              City Name (English) *
            </label>
            <input
              type="text"
              name="nameEn"
              placeholder="e.g. Batumi, Gori..."
              value={formik.values.nameEn || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full text-xs px-3 py-2 rounded border focus:outline-hidden focus:ring-1 ${
                formik.touched.nameEn && formik.errors.nameEn
                  ? 'border-rose-500 ring-rose-200'
                  : 'border-slate-300 focus:border-sky-500'
              }`}
            />
            {formik.touched.nameEn && formik.errors.nameEn && (
              <p className="text-[11px] text-rose-600 mt-1">{formik.errors.nameEn}</p>
            )}
          </div>
        </div>

        {/* რეგიონი და ამინდის ტიპი */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              რეგიონი / მხარე
            </label>
            <input
              type="text"
              name="region"
              placeholder="მაგ. იმერეთი, კახეთი, აჭარა..."
              value={formik.values.region || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-hidden focus:border-sky-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ამინდის ტიპი (Icon & Condition) *
            </label>
            <select
              name="condition"
              value={formik.values.condition || 'partly-cloudy'}
              onChange={(e) => {
                formik.handleChange(e);
                const labels: Record<string, string> = {
                  sunny: 'მზიანი',
                  'partly-cloudy': 'ნაწილობრივ მზიანი',
                  cloudy: 'მოღრუბლული',
                  rainy: 'წვიმიანი',
                  thunderstorm: 'ჭექა-ქუხილი',
                  snowy: 'თოვლიანი',
                  windy: 'ქარიანი',
                };
                formik.setFieldValue('conditionLabel', labels[e.target.value] || 'ნაწილობრივ მზიანი');
              }}
              onBlur={formik.handleBlur}
              className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-hidden focus:border-sky-500 bg-white"
            >
              <option value="sunny">მზიანი (Sunny)</option>
              <option value="partly-cloudy">ნაწილობრივ მზიანი (Partly Cloudy)</option>
              <option value="cloudy">მოღრუბლული (Cloudy)</option>
              <option value="rainy">წვიმიანი (Rainy)</option>
              <option value="thunderstorm">ჭექა-ქუხილი (Thunderstorm)</option>
              <option value="snowy">თოვლი (Snowy)</option>
              <option value="windy">ქარიანი (Windy)</option>
            </select>
          </div>
        </div>

        {/* აღწერილობის ტექსტი ქართულად */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            აღწერილობის ტექსტი ქართულად *
          </label>
          <input
            type="text"
            name="conditionLabel"
            placeholder="მაგ. ნაწილობრივ მზიანი, უნალექო..."
            value={formik.values.conditionLabel || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full text-xs px-3 py-2 rounded border focus:outline-hidden ${
              formik.touched.conditionLabel && formik.errors.conditionLabel
                ? 'border-rose-500'
                : 'border-slate-300'
            }`}
          />
        </div>

        {/* ტემპერატურები: მიმდინარე, მინიმალური, მაქსიმალური */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              ტემპერატურა (°C) *
            </label>
            <input
              type="number"
              name="currentTemp"
              value={formik.values.currentTemp ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 font-mono"
            />
            {formik.touched.currentTemp && formik.errors.currentTemp && (
              <p className="text-[10px] text-rose-600 mt-0.5">{formik.errors.currentTemp}</p>
            )}
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              მინიმალური (°C) *
            </label>
            <input
              type="number"
              name="tempMin"
              value={formik.values.tempMin ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              მაქსიმალური (°C) *
            </label>
            <input
              type="number"
              name="tempMax"
              value={formik.values.tempMax ?? ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 font-mono"
            />
            {formik.touched.tempMax && formik.errors.tempMax && (
              <p className="text-[10px] text-rose-600 mt-0.5">{formik.errors.tempMax}</p>
            )}
          </div>
        </div>

        {/* ატმოსფერული პარამეტრები: ქარი, მიმართულება, ტენიანობა */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ქარის სიჩქარე (kph)
            </label>
            <input
              type="number"
              name="windSpeed"
              value={formik.values.windSpeed ?? ''}
              onChange={formik.handleChange}
              className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ქარის მიმართულება
            </label>
            <input
              type="text"
              name="windDirection"
              placeholder="NW, W, E, SE..."
              value={formik.values.windDirection || ''}
              onChange={formik.handleChange}
              className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ტენიანობა (%)
            </label>
            <input
              type="number"
              name="humidity"
              min="0"
              max="100"
              value={formik.values.humidity ?? ''}
              onChange={formik.handleChange}
              className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 font-mono"
            />
          </div>
        </div>

        {/* ფორმის ღილაკები */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div>
            {isEditing && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={handleDelete}
              >
                ქალაქის წაშლა
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => dispatch(closeCityModal())}
            >
              გაუქმება
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              {isEditing ? 'ცვლილებების შენახვა' : 'ქალაქის დამატება'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
