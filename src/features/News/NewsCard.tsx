import { format } from 'date-fns';
import { enGB, ka, ru } from 'date-fns/locale';
import type { NewsItem } from './types';
import { tr, useLanguage } from '../../context/LanguageContext';

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const language = useLanguage();
  const dateLocale = language === 'en' ? enGB : language === 'ru' ? ru : ka;
  return(
    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
      className="flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      
      <div className="w-full h-[190px] overflow-hidden relative">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
            loading="lazy" 
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm font-bpg">
            {tr(language, 'სურათი არ არის', 'No image', 'Нет изображения')}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 bg-white">
        <time className="text-[12px] text-gray-500 font-bpg mb-2 block">
          {format(new Date(item.publishedAt), 'HH:mm / dd-MM-yyyy', { locale: dateLocale })}
        </time>

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
