/**
 * @file ApiSettingsModal.tsx
 * @description API Key-სა და მონაცემთა ბაზის მართვის მოდალური ფანჯარა.
 * განსაკუთრებით მნიშვნელოვანია გუნდური მუშაობისთვის:
 * - მომხმარებლის პირადი Weather API Key-ს შეყვანა (OpenWeatherMap, WeatherAPI ან Custom Backend)
 * - ცოცხალი API რეჟიმის (Live API Mode) ჩართვა/გამორთვა
 * - API პროვაიდერის შერჩევა (Open-Meteo, OpenWeatherMap, საკუთარი REST API)
 * - მონაცემთა ექსპორტი JSON ფაილად (გუნდის წევრებს შორის მონაცემების გასაზიარებლად)
 * - ბაზის გადატვირთვა პირვანდელ მდგომარეობაზე (Reset to default)
 */

import React, { useState } from 'react';
import { CheckCircle2, Database, Download, Globe, Key, RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { resetCurrencies } from '../../store/slices/currencySlice';
import { resetNews } from '../../store/slices/newsSlice';
import { setApiSettingsModalOpen } from '../../store/slices/uiSlice';
import { resetToDefaultCities, setApiSettings } from '../../store/slices/weatherSlice';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

export const ApiSettingsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isApiSettingsModalOpen } = useAppSelector((state) => state.ui);
  const { apiSettings, cities } = useAppSelector((state) => state.weather);
  const { currencies } = useAppSelector((state) => state.currency);
  const { items: news } = useAppSelector((state) => state.news);

  const [apiKey, setApiKeyLocal] = useState(apiSettings.apiKey || '');
  const [useLiveApi, setUseLiveApi] = useState(apiSettings.useLiveApi);
  const [provider, setProvider] = useState(apiSettings.provider || 'open-meteo');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  /** პარამეტრების შენახვა Redux-ში */
  const handleSave = () => {
    dispatch(
      setApiSettings({
        apiKey,
        useLiveApi,
        provider,
      })
    );
    setStatusMessage('პარამეტრები წარმატებით შეინახა!');
    setTimeout(() => {
      setStatusMessage(null);
      dispatch(setApiSettingsModalOpen(false));
    }, 1200);
  };

  /** ყველა მონაცემის საწყისზე გადატვირთვა */
  const handleResetAll = () => {
    if (confirm('ნამდვილად გსურთ ყველა მონაცემის საწყის მდგომარეობაში დაბრუნება?')) {
      dispatch(resetToDefaultCities());
      dispatch(resetCurrencies());
      dispatch(resetNews());
      setStatusMessage('მონაცემები გადატვირთულია საწყის მდგომარეობაზე!');
      setTimeout(() => setStatusMessage(null), 2000);
    }
  };

  /** JSON ფაილად ექსპორტი გუნდის წევრებისთვის */
  const handleExportData = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      cities,
      currencies,
      news,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amindi-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isApiSettingsModalOpen}
      onClose={() => dispatch(setApiSettingsModalOpen(false))}
      title="API & მონაცემთა ბაზის მართვა"
      subtitle="გუნდური მუშაობისთვის API Key-ს კონფიგურაცია და ლოკალური შენახვა"
      maxWidth="md"
    >
      <div className="space-y-4">
        {statusMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-md text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* ცოცხალი API რეჟიმის ჩამრთველი */}
        <div className="flex items-center justify-between p-3 bg-sky-50 rounded-md border border-sky-200">
          <div>
            <div className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-sky-600" />
              <span>ცოცხალი API რეჟიმი (Live API Mode)</span>
            </div>
            <p className="text-[11px] text-sky-700 mt-0.5">
              მონაცემების ავტომატური წამოღება გარე მეტეო სერვისიდან
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useLiveApi}
              onChange={(e) => setUseLiveApi(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
          </label>
        </div>

        {/* API Key-ს შეყვანის ველი */}
        <div>
          <label className="text-xs font-semibold text-slate-700 flex items-center justify-between mb-1">
            <span className="flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-amber-500" />
              შენი Weather API Key
            </span>
            <span className="text-[10px] text-slate-400 font-normal">არასავალდებულო (Default: Open-Meteo)</span>
          </label>
          <input
            type="password"
            placeholder="ჩასვით თქვენი API Key აქ..."
            value={apiKey}
            onChange={(e) => setApiKeyLocal(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded border border-slate-300 font-mono focus:outline-hidden focus:border-sky-500"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            თუ გაქვთ OpenWeatherMap ან პირადი API გასაღები, შეიყვანეთ აქ. სტანდარტულად აპლიკაცია იყენებს საჯარო Open-Meteo API-ს.
          </p>
        </div>

        {/* პროვაიდერის ამორჩევა */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            API პროვაიდერი
          </label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as any)}
            className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
          >
            <option value="open-meteo">Open-Meteo (ცოცხალი რეალური მონაცემები, Key არ სჭირდება)</option>
            <option value="openweathermap">OpenWeatherMap (მოითხოვს API Key-ს)</option>
            <option value="custom">საკუთარი ბექენდ REST API</option>
          </select>
        </div>

        {/* ლოკალური ბაზა, JSON ექსპორტი და Reset */}
        <div className="pt-3 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-sky-600" />
            <span>მონაცემთა ბაზა (Local Redux Store)</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExportData}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-sky-600" />
              <span>JSON ექსპორტი</span>
            </button>

            <button
              onClick={handleResetAll}
              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              <span>საწყისზე დაბრუნება</span>
            </button>
          </div>
        </div>

        {/* შენახვის ღილაკები */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => dispatch(setApiSettingsModalOpen(false))}
          >
            დახურვა
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            შენახვა
          </Button>
        </div>
      </div>
    </Modal>
  );
};
