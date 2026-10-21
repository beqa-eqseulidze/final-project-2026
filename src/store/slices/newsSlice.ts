/**
 * @file newsSlice.ts
 * @description Redux Toolkit სლაისი პალიტრა ნიუსის საინფორმაციო ლენტის სამართავად.
 * ახორციელებს:
 * - სტატიების სიის შენახვას
 * - სტატიის დამატებას (addNews)
 * - სტატიის რედაქტირებას (updateNews)
 * - სტატიის წაშლას (deleteNews)
 * - LocalStorage სინქრონიზაციას
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_NEWS } from '../../data/initialData';
import { NewsItem } from '../../types/weather.types';

const STORAGE_KEY = 'amindi_news_v3';

/** LocalStorage-იდან სიახლეების ჩატვირთვა */
const loadPersistedNews = (): NewsItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('სიახლეების ჩატვირთვის შეცდომა:', e);
  }
  return INITIAL_NEWS;
};

export interface NewsState {
  items: NewsItem[]; // სტატიების სია
}

const initialState: NewsState = {
  items: loadPersistedNews(),
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    /** CRUD: CREATE - ახალი სტატიის დამატება სიის თავში */
    addNews: (state, action: PayloadAction<NewsItem>) => {
      state.items.unshift(action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },

    /** CRUD: UPDATE - არსებული სტატიის განახლება */
    updateNews: (state, action: PayloadAction<NewsItem>) => {
      const index = state.items.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      }
    },

    /** CRUD: DELETE - სტატიის წაშლა */
    deleteNews: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },

    /** საწყის სიახლეებზე დაბრუნება */
    resetNews: (state) => {
      state.items = INITIAL_NEWS;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { addNews, updateNews, deleteNews, resetNews } = newsSlice.actions;
export default newsSlice.reducer;
