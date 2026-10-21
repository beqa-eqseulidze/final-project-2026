/**
 * @file uiSlice.ts
 * @description Redux Toolkit სლაისი მომხმარებლის ინტერფეისის (UI) სამართავად.
 * აკონტროლებს:
 * - ტემპერატურის ერთეულს (ცელსიუსი °C / ფარენჰაიტი °F)
 * - ენას (ქართული 'ka' / ინგლისური 'en')
 * - პროგნოზის აქტიურ ტაბს (5 დღის, 10 დღის, 2 კვირის, 1 თვის, მთვარე)
 * - ქალაქების ძებნის საძიებო ველს (searchQuery)
 * - რადიო პალიტრა FM 103.9-ის მდგომარეობას (ჩართვა/გამორთვა, ხმა)
 * - ხედვის რეჟიმს ('portal' - ცოცხალი საიტი / 'showcase' - კომპონენტების ბიბლიოთეკა)
 * - ყველა CRUD მოდალის (ქალაქი, ვალუტა, სიახლე, API) გახსნა/დახურვას
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ForecastTab = '5days' | '10days' | '2weeks' | '1month' | 'moon';
export type TempUnit = 'C' | 'F';

export interface UiState {
  unit: TempUnit;             // ტემპერატურის ერთეული (°C ან °F)
  language: 'ka' | 'en';       // ინტერფეისის ენა
  activeTab: ForecastTab;      // ამინდის პროგნოზის არჩეული ტაბი
  searchQuery: string;         // საძიებო ტექსტი
  isRadioPlaying: boolean;     // რადიოს დაკვრის სტატუსი
  radioVolume: number;         // რადიოს ხმის სიმძლავრე (0-100)
  viewMode: 'portal' | 'showcase'; // პორტალის ან კომპონენტების ბიბლიოთეკის ხედი

  // მოდალური ფანჯრების მდგომარეობა
  isCityModalOpen: boolean;
  editingCityId: string | null;
  isCurrencyModalOpen: boolean;
  editingCurrencyId: string | null;
  isNewsModalOpen: boolean;
  editingNewsId: string | null;
  isApiSettingsModalOpen: boolean;
  isHourlyModalOpen: boolean;
  isAllCurrenciesModalOpen: boolean;
}

const initialState: UiState = {
  unit: 'C',
  language: 'ka',
  activeTab: '5days',
  searchQuery: '',
  isRadioPlaying: false,
  radioVolume: 80,
  viewMode: 'portal',
  isCityModalOpen: false,
  editingCityId: null,
  isCurrencyModalOpen: false,
  editingCurrencyId: null,
  isNewsModalOpen: false,
  editingNewsId: null,
  isApiSettingsModalOpen: false,
  isHourlyModalOpen: false,
  isAllCurrenciesModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /** ტემპერატურის ერთეულის გადართვა C° <-> F° */
    toggleUnit: (state) => {
      state.unit = state.unit === 'C' ? 'F' : 'C';
    },
    setUnit: (state, action: PayloadAction<TempUnit>) => {
      state.unit = action.payload;
    },
    /** ენის შეცვლა */
    setLanguage: (state, action: PayloadAction<'ka' | 'en'>) => {
      state.language = action.payload;
    },
    /** პროგნოზის ტაბის შეცვლა */
    setActiveTab: (state, action: PayloadAction<ForecastTab>) => {
      state.activeTab = action.payload;
    },
    /** საძიებო ტექსტის შეცვლა */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    /** რადიოს ჩართვა/გამორთვა */
    toggleRadio: (state) => {
      state.isRadioPlaying = !state.isRadioPlaying;
    },
    /** რადიოს ხმის შეცვლა */
    setRadioVolume: (state, action: PayloadAction<number>) => {
      state.radioVolume = action.payload;
    },
    /** ხედვის რეჟიმის შეცვლა (პორტალი <-> კომპონენტების ბიბლიოთეკა) */
    setViewMode: (state, action: PayloadAction<'portal' | 'showcase'>) => {
      state.viewMode = action.payload;
    },

    // ==========================================
    // მოდალების კონტროლერები (CRUD)
    // ==========================================

    /** ახალი ქალაქის დამატების მოდალის გახსნა */
    openAddCityModal: (state) => {
      state.editingCityId = null;
      state.isCityModalOpen = true;
    },
    /** არსებული ქალაქის რედაქტირების მოდალის გახსნა */
    openEditCityModal: (state, action: PayloadAction<string>) => {
      state.editingCityId = action.payload;
      state.isCityModalOpen = true;
    },
    /** ქალაქის მოდალის დახურვა */
    closeCityModal: (state) => {
      state.isCityModalOpen = false;
      state.editingCityId = null;
    },

    /** ახალი ვალუტის დამატების მოდალის გახსნა */
    openAddCurrencyModal: (state) => {
      state.editingCurrencyId = null;
      state.isCurrencyModalOpen = true;
    },
    /** ვალუტის რედაქტირების მოდალი */
    openEditCurrencyModal: (state, action: PayloadAction<string>) => {
      state.editingCurrencyId = action.payload;
      state.isCurrencyModalOpen = true;
    },
    closeCurrencyModal: (state) => {
      state.isCurrencyModalOpen = false;
      state.editingCurrencyId = null;
    },

    /** ახალი სიახლის დამატების მოდალი */
    openAddNewsModal: (state) => {
      state.editingNewsId = null;
      state.isNewsModalOpen = true;
    },
    openEditNewsModal: (state, action: PayloadAction<string>) => {
      state.editingNewsId = action.payload;
      state.isNewsModalOpen = true;
    },
    closeNewsModal: (state) => {
      state.isNewsModalOpen = false;
      state.editingNewsId = null;
    },

    /** API პარამეტრების მოდალი */
    setApiSettingsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isApiSettingsModalOpen = action.payload;
    },
    /** სრული 24-საათიანი პროგნოზის მოდალი */
    setHourlyModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isHourlyModalOpen = action.payload;
    },
    /** ყველა ვალუტის სრული სიის მოდალი */
    setAllCurrenciesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAllCurrenciesModalOpen = action.payload;
    },
  },
});

export const {
  toggleUnit,
  setUnit,
  setLanguage,
  setActiveTab,
  setSearchQuery,
  toggleRadio,
  setRadioVolume,
  setViewMode,
  openAddCityModal,
  openEditCityModal,
  closeCityModal,
  openAddCurrencyModal,
  openEditCurrencyModal,
  closeCurrencyModal,
  openAddNewsModal,
  openEditNewsModal,
  closeNewsModal,
  setApiSettingsModalOpen,
  setHourlyModalOpen,
  setAllCurrenciesModalOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
