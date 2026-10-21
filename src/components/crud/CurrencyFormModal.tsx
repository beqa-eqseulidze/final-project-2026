/**
 * @file CurrencyFormModal.tsx
 * @description ვალუტის დამატებისა და რედაქტირების მოდალური ფორმა.
 * იყენებს Formik-ს ფორმის მართვისთვის და Yup-ს მკაცრი ვალიდაციისთვის.
 * 
 * ვალიდაცია (Yup):
 * - code: ზუსტად 3 ასო (მაგ. USD, GBP, CHF)
 * - nameKa: ქართული დასახელება (მაგ. "აშშ დოლარი")
 * - rateToday, rateYesterday: დადებითი რიცხვები
 * - multiplier: 1, 10, 100 ან 1000
 * 
 * ავტომატურად ითვლის ცვლილების პროცენტს: ((დღეს - გუშინ) / გუშინ) * 100.
 */

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Save, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addCurrency, deleteCurrency, updateCurrency } from '../../store/slices/currencySlice';
import { closeCurrencyModal } from '../../store/slices/uiSlice';
import { CurrencyRate } from '../../types/weather.types';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

// Yup ვალიდაციის სქემა
const CurrencySchema = Yup.object().shape({
  code: Yup.string()
    .length(3, 'ვალუტის კოდი უნდა იყოს ზუსტად 3 ასო (მაგ. USD)')
    .uppercase()
    .required('ვალუტის კოდი სავალდებულოა'),
  nameKa: Yup.string().required('დასახელება ქართულად სავალდებულოა'),
  multiplier: Yup.number().oneOf([1, 10, 100, 1000]).required('რაოდენობა სავალდებულოა'),
  rateToday: Yup.number().positive('კურსი უნდა იყოს დადებითი რიცხვი').required('დღევანდელი კურსი სავალდებულოა'),
  rateYesterday: Yup.number().positive('კურსი უნდა იყოს დადებითი რიცხვი').required('გუშინდელი კურსი სავალდებულოა'),
  symbol: Yup.string().required('სიმბოლო სავალდებულოა'),
});

export const CurrencyFormModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCurrencyModalOpen, editingCurrencyId } = useAppSelector((state) => state.ui);
  const { currencies } = useAppSelector((state) => state.currency);

  const isEditing = Boolean(editingCurrencyId);
  const existingCurrency = currencies.find((c) => c.id === editingCurrencyId);

  const initialValues: Partial<CurrencyRate> = existingCurrency || {
    code: '',
    nameKa: '',
    multiplier: 1,
    rateToday: 2.7,
    rateYesterday: 2.7,
    symbol: '$',
    change: 0,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: CurrencySchema,
    onSubmit: (values) => {
      const today = Number(values.rateToday) || 1;
      const yesterday = Number(values.rateYesterday) || 1;
      const diff = today - yesterday;
      const change = parseFloat(((diff / yesterday) * 100).toFixed(2));

      if (isEditing && editingCurrencyId && existingCurrency) {
        // არსებული ვალუტის განახლება (UPDATE)
        dispatch(
          updateCurrency({
            ...existingCurrency,
            ...values,
            code: values.code!.toUpperCase(),
            change,
          } as CurrencyRate)
        );
      } else {
        // ახალი ვალუტის შექმნა (CREATE)
        const id = values.code!.toLowerCase();
        dispatch(
          addCurrency({
            ...values,
            id,
            code: values.code!.toUpperCase(),
            change,
          } as CurrencyRate)
        );
      }
      dispatch(closeCurrencyModal());
    },
  });

  return (
    <Modal
      isOpen={isCurrencyModalOpen}
      onClose={() => dispatch(closeCurrencyModal())}
      title={isEditing ? `ვალუტის რედაქტირება: ${existingCurrency?.code}` : 'ახალი ვალუტის დამატება'}
      subtitle="ვალუტის კურსის CRUD მართვა Formik & Yup-ით"
      maxWidth="md"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              კოდი (მაგ. USD, GBP) *
            </label>
            <input
              type="text"
              name="code"
              maxLength={3}
              placeholder="USD"
              value={formik.values.code || ''}
              onChange={(e) => formik.setFieldValue('code', e.target.value.toUpperCase())}
              onBlur={formik.handleBlur}
              className="w-full text-xs px-3 py-2 rounded border border-slate-300 font-mono uppercase"
            />
            {formik.touched.code && formik.errors.code && (
              <p className="text-[11px] text-rose-600 mt-1">{formik.errors.code}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              სიმბოლო (მაგ. $, €, ₾) *
            </label>
            <input
              type="text"
              name="symbol"
              placeholder="$"
              value={formik.values.symbol || ''}
              onChange={formik.handleChange}
              className="w-full text-xs px-3 py-2 rounded border border-slate-300"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            დასახელება (ქართულად) *
          </label>
          <input
            type="text"
            name="nameKa"
            placeholder="მაგ. შვეიცარიული ფრანკი"
            value={formik.values.nameKa || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full text-xs px-3 py-2 rounded border border-slate-300"
          />
          {formik.touched.nameKa && formik.errors.nameKa && (
            <p className="text-[11px] text-rose-600 mt-1">{formik.errors.nameKa}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              რაოდენობა
            </label>
            <select
              name="multiplier"
              value={formik.values.multiplier || 1}
              onChange={formik.handleChange}
              className="w-full text-xs px-2 py-1.5 rounded border border-slate-300 bg-white"
            >
              <option value={1}>1</option>
              <option value={10}>10</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              კურსი დღეს (₾) *
            </label>
            <input
              type="number"
              step="any"
              name="rateToday"
              value={formik.values.rateToday ?? ''}
              onChange={formik.handleChange}
              className="w-full text-xs px-2 py-1.5 rounded border border-slate-300 font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              კურსი გუშინ (₾) *
            </label>
            <input
              type="number"
              step="any"
              name="rateYesterday"
              value={formik.values.rateYesterday ?? ''}
              onChange={formik.handleChange}
              className="w-full text-xs px-2 py-1.5 rounded border border-slate-300 font-mono"
            />
          </div>
        </div>

        {/* მოქმედების ღილაკები */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <div>
            {isEditing && editingCurrencyId && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={() => {
                  if (confirm('წავშალოთ ეს ვალუტა?')) {
                    dispatch(deleteCurrency(editingCurrencyId));
                    dispatch(closeCurrencyModal());
                  }
                }}
              >
                წაშლა
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => dispatch(closeCurrencyModal())}
            >
              გაუქმება
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              შენახვა
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
