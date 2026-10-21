/**
 * @file weatherSlice.ts
 * @description Redux Toolkit სლაისი ამინდის მონაცემებისა და ქალაქების სამართავად.
 * ახორციელებს:
 * - სრულ CRUD ოპერაციებს ქალაქებზე (დამატება, განახლება, წაშლა, არჩევა)
 * - ასინქრონულ Thunk-ს (fetchWeatherForCity) ცოცხალი API-დან მონაცემების ჩასატვირთად
 * - მონაცემთა შენახვას/სინქრონიზაციას LocalStorage-ში
 * - API Key-სა და პროვაიდერის პარამეტრების მართვას
 */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_CITIES } from '../../data/initialData';
import { fetchLiveCityWeather } from '../../services/weatherApi';
import { ApiSettings, CityWeather } from '../../types/weather.types';

// LocalStorage-ის გასაღებები
const STORAGE_KEY = 'amindi_cities_v3';
const SETTINGS_KEY = 'amindi_api_settings_v3';

/**
 * LocalStorage-იდან ქალაქების ჩატვირთვა.
 * თუ მონაცემები არ არსებობს, იყენებს INITIAL_CITIES-ს.
 */
const loadPersistedCities = (): CityWeather[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('ქალაქების ჩატვირთვის შეცდომა LocalStorage-იდან:', e);
  }
  return INITIAL_CITIES;
};

/**
 * LocalStorage-იდან API პარამეტრების ჩატვირთვა.
 */
const loadPersistedSettings = (): ApiSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('API პარამეტრების ჩატვირთვის შეცდომა:', e);
  }
  return {
    apiKey: '',
    provider: 'open-meteo',
    useLiveApi: false,
    autoRefreshInterval: 15,
  };
};

/** WeatherState ინტერფეისი */
export interface WeatherState {
  cities: CityWeather[];        // ქალაქების სრული სია
  selectedCityId: string;       // მიმდინარე არჩეული ქალაქის ID
  loading: boolean;             // API ჩატვირთვის ინდიკატორი
  error: string | null;         // შეცდომის შეტყობინება
  apiSettings: ApiSettings;     // API Key და პროვაიდერის პარამეტრები
  lastSyncTime: string | null;  // ბოლო სინქრონიზაციის დრო
}

const initialState: WeatherState = {
  cities: loadPersistedCities(),
  selectedCityId: 'tbilisi',
  loading: false,
  error: null,
  apiSettings: loadPersistedSettings(),
  lastSyncTime: null,
};

/**
 * ასინქრონული Thunk ქალაქის ცოცხალი ამინდის წამოსაღებად Open-Meteo API-დან.
 */
export const fetchWeatherForCity = createAsyncThunk(
  'weather/fetchWeatherForCity',
  async (cityId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { weather: WeatherState };
      const city = state.weather.cities.find((c) => c.id === cityId);
      if (!city) {
        return rejectWithValue('ქალაქი ვერ მოიძებნა');
      }

      // თუ მომხმარებელს ცოცხალი API გამორთული აქვს, არ ვაკეთებთ HTTP მოთხოვნას
      if (!state.weather.apiSettings.useLiveApi) {
        return { cityId, updates: {} };
      }

      const updates = await fetchLiveCityWeather(city, state.weather.apiSettings.apiKey);
      return { cityId, updates };
    } catch (err: any) {
      return rejectWithValue(err.message || 'API-დან მონაცემების მიღება ვერ მოხერხდა');
    }
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    /** ქალაქის არჩევა UI-ში */
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCityId = action.payload;
    },

    // ==========================================
    // CRUD ოპერაციები (Create, Update, Delete)
    // ==========================================

    /** CRUD: CREATE - ახალი ქალაქის დამატება ბაზაში */
    addCity: (state, action: PayloadAction<CityWeather>) => {
      state.cities.push(action.payload);
      state.selectedCityId = action.payload.id;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cities));
    },

    /** CRUD: UPDATE - არსებული ქალაქის მონაცემების რედაქტირება */
    updateCity: (state, action: PayloadAction<CityWeather>) => {
      const index = state.cities.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = action.payload;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cities));
      }
    },

    /** CRUD: DELETE - ქალაქის წაშლა ბაზიდან */
    deleteCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter((c) => c.id !== action.payload);
      if (state.selectedCityId === action.payload) {
        state.selectedCityId = state.cities[0]?.id || '';
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cities));
    },

    /** API Key-სა და პარამეტრების განახლება */
    setApiSettings: (state, action: PayloadAction<Partial<ApiSettings>>) => {
      state.apiSettings = { ...state.apiSettings, ...action.payload };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.apiSettings));
    },

    /** მონაცემთა ბაზის პირვანდელ მდგომარეობაში დაბრუნება (Reset) */
    resetToDefaultCities: (state) => {
      state.cities = INITIAL_CITIES;
      state.selectedCityId = 'tbilisi';
      localStorage.removeItem(STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      // API მოთხოვნის დაწყება
      .addCase(fetchWeatherForCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // API მოთხოვნის წარმატებით დასრულება და State-ის განახლება
      .addCase(fetchWeatherForCity.fulfilled, (state, action) => {
        state.loading = false;
        const { cityId, updates } = action.payload;
        const index = state.cities.findIndex((c) => c.id === cityId);
        if (index !== -1 && Object.keys(updates).length > 0) {
          state.cities[index] = { ...state.cities[index], ...updates };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cities));
        }
        state.lastSyncTime = new Date().toLocaleTimeString('ka-GE');
      })
      // API მოთხოვნის შეცდომა
      .addCase(fetchWeatherForCity.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'მონაცემების ჩატვირთვა ვერ მოხერხდა';
      });
  },
});

export const {
  setSelectedCity,
  addCity,
  updateCity,
  deleteCity,
  setApiSettings,
  resetToDefaultCities,
} = weatherSlice.actions;

export default weatherSlice.reducer;
