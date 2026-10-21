/**
 * @file currencySlice.ts
 * @description Redux Toolkit სლაისი ეროვნული ბანკის ვალუტის კურსების სამართავად.
 * ახორციელებს:
 * - ვალუტების სიის შენახვას (USD, EUR, RUB, GBP, TRY)
 * - ვალუტის კალკულატორისა და კონვერტორის მდგომარეობას
 * - CRUD ოპერაციებს (ახალი ვალუტის დამატება, კურსის რედაქტირება, წაშლა)
 * - LocalStorage სინქრონიზაციას
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_CURRENCIES } from '../../data/initialData';
import { CurrencyRate } from '../../types/weather.types';

const STORAGE_KEY = 'amindi_currencies_v1';

/** LocalStorage-იდან ვალუტების ჩატვირთვა */
const loadPersistedCurrencies = (): CurrencyRate[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('ვალუტების ჩატვირთვის შეცდომა:', e);
  }
  return INITIAL_CURRENCIES;
};

export interface CurrencyState {
  currencies: CurrencyRate[];
  converter: {
    amount: number;       // გადასაყვანი თანხა
    fromCurrency: string; // საწყისი ვალუტა (მაგ. 'USD' ან 'GEL')
    toCurrency: string;   // სამიზნე ვალუტა (მაგ. 'GEL' ან 'EUR')
  };
}

const initialState: CurrencyState = {
  currencies: loadPersistedCurrencies(),
  converter: {
    amount: 100,
    fromCurrency: 'USD',
    toCurrency: 'GEL',
  },
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    /** კონვერტორის თანხის შეცვლა */
    setConverterAmount: (state, action: PayloadAction<number>) => {
      state.converter.amount = action.payload;
    },
    /** საწყისი ვალუტის არჩევა */
    setConverterFrom: (state, action: PayloadAction<string>) => {
      state.converter.fromCurrency = action.payload;
    },
    /** სამიზნე ვალუტის არჩევა */
    setConverterTo: (state, action: PayloadAction<string>) => {
      state.converter.toCurrency = action.payload;
    },

    // ==========================================
    // ვალუტის CRUD ოპერაციები
    // ==========================================

    /** CRUD: CREATE - ახალი ვალუტის დამატება */
    addCurrency: (state, action: PayloadAction<CurrencyRate>) => {
      state.currencies.push(action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.currencies));
    },

    /** CRUD: UPDATE - ვალუტის კურსის განახლება */
    updateCurrency: (state, action: PayloadAction<CurrencyRate>) => {
      const index = state.currencies.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.currencies[index] = action.payload;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.currencies));
      }
    },

    /** CRUD: DELETE - ვალუტის წაშლა */
    deleteCurrency: (state, action: PayloadAction<string>) => {
      state.currencies = state.currencies.filter((c) => c.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.currencies));
    },

    /** ვალუტების საწყის მნიშვნელობებზე დაბრუნება */
    resetCurrencies: (state) => {
      state.currencies = INITIAL_CURRENCIES;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const {
  setConverterAmount,
  setConverterFrom,
  setConverterTo,
  addCurrency,
  updateCurrency,
  deleteCurrency,
  resetCurrencies,
} = currencySlice.actions;

export default currencySlice.reducer;
