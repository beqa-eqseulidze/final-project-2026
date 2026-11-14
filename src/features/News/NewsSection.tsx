import { useEffect, useState } from 'react';
import type { NewsItem } from './types';
import { fetchGeorgianNews } from './newsService';
import { NewsCard } from './NewsCard'; 

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    let cancelled = false;
    fetchGeorgianNews(10)
      .then((data) => {
        if (!cancelled) {
          setNews(data);
          setLoading(false);
        }
      })
      .catch((err)=>{
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return()=>{ cancelled = true; };
  }, []);

  if(loading) {
    return (
      <div className="w-full animate-pulse">
        {/* ლურჯი ზოლი ზემოთ */}
        <div className="bg-[#00a8e8] h-10 mb-2"></div>
        {/* თეთრი კონტეინერი ქვემოთ */}
        <div className="bg-white p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-col bg-white overflow-hidden shadow-sm">
                <div className="w-full h-48 bg-slate-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-slate-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if(error) {
    return(
      <div className="bg-white shadow-sm p-4 text-center text-red-500 text-sm font-bpg">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* 🆕 ლურჯი სათაურის ზოლი - ცალკე, კონტეინერის გარეთ */}
      <div className="bg-[#00a8e8] text-white px-4 py-2.5 flex justify-between items-center">
        <h2 className="font-sanet font-bold text-[17px] tracking-wide">სიახლეები</h2>
      </div>

      {/* 🆕 თეთრი კონტეინერი ბარათებისთვის - ზოლის ქვემოთ */}
      <div className="bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}