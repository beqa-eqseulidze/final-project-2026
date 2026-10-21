/**
 * @file AllCurrenciesModal.tsx
 * @description "ყველა ვალუტა" მოდალური ფანჯარა.
 * აჩვენებს ეროვნული ბანკის ყველა ოფიციალურ ვალუტას დეტალური ცხრილით:
 * - ვალუტის კოდი და დასახელება ქართულად
 * - გუშინდელი და დღევანდელი კურსი
 * - ცვლილების პროცენტი (მწვანე/წითელი ინდიკატორებით)
 * - CRUD ოპერაციები: ახალი ვალუტის დამატება, რედაქტირება და წაშლა
 */

import React from 'react';
import { ArrowDownRight, ArrowUpRight, Edit2, Plus, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { deleteCurrency } from '../../store/slices/currencySlice';
import {
  openAddCurrencyModal,
  openEditCurrencyModal,
  setAllCurrenciesModalOpen,
} from '../../store/slices/uiSlice';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

export const AllCurrenciesModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAllCurrenciesModalOpen } = useAppSelector((state) => state.ui);
  const { currencies } = useAppSelector((state) => state.currency);

  return (
    <Modal
      isOpen={isAllCurrenciesModalOpen}
      onClose={() => dispatch(setAllCurrenciesModalOpen(false))}
      title="საქართველოს ეროვნული ბანკის ოფიციალური კურსები"
      subtitle="ვალუტის კურსების სრული ჩამონათვალი და CRUD მართვა"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* ზედა ზოლი: ვალუტების რაოდენობა და დამატების ღილაკი */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">
            სულ {currencies.length} ვალუტა სისტემაში
          </span>
          <Button
            size="sm"
            variant="primary"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => {
              dispatch(setAllCurrenciesModalOpen(false));
              dispatch(openAddCurrencyModal());
            }}
          >
            ვალუტის დამატება
          </Button>
        </div>

        {/* სრული ცხრილი */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">კოდი</th>
                <th className="p-3">დასახელება</th>
                <th className="p-3 text-right">გუშინ</th>
                <th className="p-3 text-right">დღეს</th>
                <th className="p-3 text-right">ცვლილება</th>
                <th className="p-3 text-center">მოქმედება</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currencies.map((c) => {
                const isNegative = c.change < 0;
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">
                      {c.multiplier > 1 ? `${c.multiplier} ` : ''}
                      {c.code}
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{c.nameKa}</td>
                    <td className="p-3 text-right font-mono text-slate-500">
                      {c.rateYesterday.toFixed(4)}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">
                      {c.rateToday.toFixed(4)}
                    </td>
                    <td
                      className={`p-3 text-right font-mono font-bold flex items-center justify-end ${
                        isNegative ? 'text-rose-600' : 'text-emerald-600'
                      }`}
                    >
                      {isNegative ? (
                        <ArrowDownRight className="w-3.5 h-3.5 inline mr-0.5" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 inline mr-0.5" />
                      )}
                      <span>{c.change > 0 ? `+${c.change}%` : `${c.change}%`}</span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {/* რედაქტირების ღილაკი */}
                        <button
                          onClick={() => {
                            dispatch(setAllCurrenciesModalOpen(false));
                            dispatch(openEditCurrencyModal(c.id));
                          }}
                          className="p-1 rounded hover:bg-slate-200 text-slate-600 hover:text-sky-700 transition cursor-pointer"
                          title="რედაქტირება"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {/* წაშლის ღილაკი */}
                        {currencies.length > 1 && (
                          <button
                            onClick={() => {
                              if (confirm(`წავშალოთ ${c.code}?`)) {
                                dispatch(deleteCurrency(c.id));
                              }
                            }}
                            className="p-1 rounded hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                            title="წაშლა"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};
