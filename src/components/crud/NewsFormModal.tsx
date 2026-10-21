/**
 * @file NewsFormModal.tsx
 * @description სიახლის დამატებისა და რედაქტირების მოდალური ფორმა.
 * შექმნილია Formik-ისა და Yup-ის საშუალებით.
 * 
 * ვალიდაცია (Yup):
 * - title: სავალდებულო, მინიმუმ 5 სიმბოლო
 * - category: კატეგორია (ამინდი, საზოგადოება, ეკონომიკა, რეგიონები)
 * - source: წყარო (მაგ. პალიტრა ნიუსი)
 * - imageUrl: სურათის URL მისამართი
 */

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Save, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addNews, deleteNews, updateNews } from '../../store/slices/newsSlice';
import { closeNewsModal } from '../../store/slices/uiSlice';
import { NewsItem } from '../../types/weather.types';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

// Yup ვალიდაციის სქემა
const NewsSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'სათაური უნდა შეიცავდეს მინიმუმ 5 სიმბოლოს')
    .required('სათაური სავალდებულოა'),
  category: Yup.string().required('კატეგორია სავალდებულოა'),
  source: Yup.string().required('წყარო სავალდებულოა'),
  imageUrl: Yup.string().url('მიუთითეთ ვალიდური სურათის URL').optional(),
});

export const NewsFormModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isNewsModalOpen, editingNewsId } = useAppSelector((state) => state.ui);
  const { items } = useAppSelector((state) => state.news);

  const isEditing = Boolean(editingNewsId);
  const existingNews = items.find((n) => n.id === editingNewsId);

  const initialValues: Partial<NewsItem> = existingNews || {
    title: '',
    category: 'ამინდი',
    source: 'პალიტრა ნიუსი',
    imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: NewsSchema,
    onSubmit: (values) => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;

      if (isEditing && editingNewsId && existingNews) {
        // არსებული სტატიის განახლება (UPDATE)
        dispatch(
          updateNews({
            ...existingNews,
            ...values,
          } as NewsItem)
        );
      } else {
        // ახალი სტატიის დამატება (CREATE)
        const id = `news-${Date.now()}`;
        dispatch(
          addNews({
            ...values,
            id,
            time: timeStr,
          } as NewsItem)
        );
      }
      dispatch(closeNewsModal());
    },
  });

  return (
    <Modal
      isOpen={isNewsModalOpen}
      onClose={() => dispatch(closeNewsModal())}
      title={isEditing ? 'სტატიის რედაქტირება' : 'ახალი სტატიის დამატება'}
      subtitle="სიახლეების CRUD მართვა Formik & Yup ვალიდაციით"
      maxWidth="md"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* სათაური */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            სათაური *
          </label>
          <textarea
            name="title"
            rows={3}
            placeholder="შეიყვანეთ სიახლის სათაური..."
            value={formik.values.title || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full text-xs px-3 py-2 rounded border border-slate-300 focus:outline-hidden focus:border-sky-500"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-[11px] text-rose-600 mt-1">{formik.errors.title}</p>
          )}
        </div>

        {/* კატეგორია და წყარო */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              კატეგორია *
            </label>
            <select
              name="category"
              value={formik.values.category || 'ამინდი'}
              onChange={formik.handleChange}
              className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white"
            >
              <option value="ამინდი">ამინდი</option>
              <option value="საზოგადოება">საზოგადოება</option>
              <option value="ეკონომიკა">ეკონომიკა</option>
              <option value="რეგიონები">რეგიონები</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              წყარო *
            </label>
            <input
              type="text"
              name="source"
              placeholder="მაგ. პალიტრა ნიუსი"
              value={formik.values.source || ''}
              onChange={formik.handleChange}
              className="w-full text-xs px-3 py-2 rounded border border-slate-300"
            />
          </div>
        </div>

        {/* სურათის URL */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            სურათის URL (არასავალდებულო)
          </label>
          <input
            type="text"
            name="imageUrl"
            placeholder="https://..."
            value={formik.values.imageUrl || ''}
            onChange={formik.handleChange}
            className="w-full text-xs px-3 py-2 rounded border border-slate-300"
          />
        </div>

        {/* ღილაკები */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <div>
            {isEditing && editingNewsId && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={() => {
                  if (confirm('წავშალოთ ეს სიახლე?')) {
                    dispatch(deleteNews(editingNewsId));
                    dispatch(closeNewsModal());
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
              onClick={() => dispatch(closeNewsModal())}
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
