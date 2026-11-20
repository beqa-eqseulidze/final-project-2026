<<<<<<< HEAD
import { format } from 'date-fns';
import { enGB, ka, ru } from 'date-fns/locale';
=======
<<<<<<< HEAD
=======
import { format, isValid } from 'date-fns';
import { enGB, ka, ru } from 'date-fns/locale';
>>>>>>> 7ad2997b40c070642a1993233010d4028caa44c0
>>>>>>> master
import type { NewsItem } from './types';
import { tr, useLanguage } from '../../context/LanguageContext';

interface NewsCardProps {
  item: NewsItem;
}

<<<<<<< HEAD
export function NewsCard({ item }: NewsCardProps) {
  const language = useLanguage();
  const dateLocale = language === 'en' ? enGB : language === 'ru' ? ru : ka;
=======
<<<<<<< HEAD
function formatNewsDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${hours}:${minutes} / ${day}-${month}-${year}`;
  } catch {
    return dateString;
  }
}

export function NewsCard({ item }: NewsCardProps) {
=======
/**
 * Parses API date strings safely across all engines (including iOS Safari JSC),
 * which rejects non-ISO formats like "YYYY-MM-DD HH:mm:ss +0000".
 */
function parsePublishedDate(rawDate: string): Date | null {
  if (!rawDate) return null;
  const direct = new Date(rawDate);
  if (isValid(direct)) return direct;

  const isoNormalized = rawDate
    .trim()
    .replace(/^(\d{4}-\d{2}-\d{2})\s+/, '$1T')
    .replace(/\s+([+-]\d{2}):?(\d{2})$/, '$1:$2');
  const normalized = new Date(isoNormalized);
  return isValid(normalized) ? normalized : null;
}

export function NewsCard({ item }: NewsCardProps) {
  const language = useLanguage();
  const dateLocale = language === 'en' ? enGB : language === 'ru' ? ru : ka;
  const publishedDate = parsePublishedDate(item.publishedAt);
  const formattedDate = publishedDate
    ? format(publishedDate, 'HH:mm / dd-MM-yyyy', { locale: dateLocale })
    : '';
>>>>>>> 7ad2997b40c070642a1993233010d4028caa44c0
>>>>>>> master
  return(
    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
      className="flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      
      <div className="w-full h-[190px] overflow-hidden relative">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} loading="lazy" decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm font-bpg">
            {tr(language, 'სურათი არ არის', 'No image', 'Нет изображения')}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 bg-white">
<<<<<<< HEAD
        <time className="text-[12px] text-gray-500 font-bpg mb-2 block">
          {format(new Date(item.publishedAt), 'HH:mm / dd-MM-yyyy', { locale: dateLocale })}
=======
<<<<<<< HEAD
        {/* 🆕 dateTime ატრიბუტი SEO-სთვის */}
        <time 
          dateTime={item.publishedAt} 
          className="text-[12px] text-gray-500 font-bpg mb-2 block"
        >
          {formatNewsDate(item.publishedAt)}
>>>>>>> master
        </time>
=======
        {formattedDate && (
          <time className="text-[12px] text-gray-500 font-bpg mb-2 block">
            {formattedDate}
          </time>
        )}
>>>>>>> 7ad2997b40c070642a1993233010d4028caa44c0

        <h3 className="text-[#00a8e8] font-bold text-[15px] leading-tight mb-2 line-clamp-2 font-bpg group-hover:text-[#0086b8] transition-colors">
          {item.title}
        </h3>

        <p className="text-gray-700 text-[13px] leading-snug line-clamp-3 font-bpg">
          {item.description || tr(language, 'დეტალური ინფორმაციისთვის გადადით ბმულზე...', 'Open the link for more information...', 'Перейдите по ссылке для подробной информации...')}
        </p>
      </div>
    </a>
  );
}