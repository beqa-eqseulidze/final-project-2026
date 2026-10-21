/**
 * @file store/index.ts
 * @description Redux Toolkit-ის ცენტრალური Store-ის კონფიგურაცია.
 * აერთიანებს 4 მთავარ სლაისს:
 * 1. weather - ქალაქების მონაცემები, API და CRUD ოპერაციები.
 * 2. currency - ეროვნული ბანკის კურსები და კონვერტორი.
 * 3. news - პალიტრა ნიუსის საინფორმაციო ლენტი.
 * 4. ui - მომხმარებლის ინტერფეისის სტატუსები (°C/°F, მოდალები, რადიო).
 * 
 * აგრეთვე აექსპორტებს ტიპიზირებულ ჰუკებს: useAppDispatch და useAppSelector.
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import currencyReducer from './slices/currencySlice';
import newsReducer from './slices/newsSlice';
import uiReducer from './slices/uiSlice';
import weatherReducer from './slices/weatherSlice';

/**
 * Redux Store-ის შექმნა configureStore-ით.
 */
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    currency: currencyReducer,
    news: newsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // საჭიროებისამებრ გამორთულია მკაცრი სერიალიზაციის გაფრთხილებების თავიდან ასაცილებლად
    }),
});

/** RootState - აპლიკაციის სრული State-ის ტიპი */
export type RootState = ReturnType<typeof store.getState>;

/** AppDispatch - Dispatch ფუნქციის ტიპი */
export type AppDispatch = typeof store.dispatch;

/** ტიპიზირებული useAppDispatch ჰუკი მთელ პროექტში გამოსაყენებლად */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** ტიპიზირებული useAppSelector ჰუკი State-იდან მონაცემების უსაფრთხოდ წამოსაღებად */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
