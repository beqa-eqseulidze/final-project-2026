/**
 * @file NewsSection.tsx
 * @description amindi.ge-ს იდენტური "სიახლეები" (.article_header, .article_blocks_container)
 * და SS.ge კურორტების კარუსელი (.rss-item-amindi).
 * იყენებს ზუსტად amindi.ge-ს სტატიების სურათებს (https://amindi.ge/media/uploads/...)
 * და SS.ge-ს კურორტების ბარათებს (https://ss.ge/img/summer/..., amindige-logo.png, sun-logo.png, moon-logo.png).
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2, Plus, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { deleteNews } from '../../store/slices/newsSlice';
import { openAddNewsModal, openEditNewsModal } from '../../store/slices/uiSlice';
import { SSGE_RESORT_CARDS } from '../../data/initialData';
import { NewsItem } from '../../types/weather.types';

export const NewsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.news);
  const [resortOffset, setResortOffset] = useState(0);

  const firstTwoNews = items.slice(0, 2);
  const remainingNews = items.slice(2);

  // SS.ge კარუსელში ერთდროულად ჩანს 3 ქარდი
  const visibleResorts = [
    SSGE_RESORT_CARDS[resortOffset % SSGE_RESORT_CARDS.length],
    SSGE_RESORT_CARDS[(resortOffset + 1) % SSGE_RESORT_CARDS.length],
    SSGE_RESORT_CARDS[(resortOffset + 2) % SSGE_RESORT_CARDS.length],
  ];

  const renderNewsCard = (news: NewsItem) => (
    <div
      key={news.id}
      className="article_block w-full sm:w-[calc(50%-4px)] bg-[#eeeeee] rounded-[5px] overflow-hidden mt-[8px] pb-[8px] relative group"
    >
      {/* CRUD ღილაკები */}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            dispatch(openEditNewsModal(news.id));
          }}
          className="p-1.5 rounded bg-black/60 hover:bg-black/80 text-white cursor-pointer border-0"
          title="სტატიის რედაქტირება (Formik CRUD)"
        >
          <Edit2 className="w-3 h-3" />
        </button>
        {items.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (confirm('გსურთ წაშალოთ ეს სიახლე?')) {
                dispatch(deleteNews(news.id));
              }
            }}
            className="p-1.5 rounded bg-rose-600/80 hover:bg-rose-600 text-white cursor-pointer border-0"
            title="სტატიის წაშლა (Delete CRUD)"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>

      <a
        href="#news-item"
        onClick={(e) => {
          e.preventDefault();
          dispatch(openEditNewsModal(news.id));
        }}
        className="block no-underline"
      >
        <div className="image w-full h-[172px] overflow-hidden bg-slate-200">
          {news.imageUrl && (
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="article_date px-[8px] text-[#707070] text-[12px] font-bpg-arial mt-[10px] mb-[6px]">
          {news.time}
        </div>
        <h3 className="article_title m-0 px-[8px] text-[#363636] text-[14px] leading-[17px] h-[34px] overflow-hidden font-bpg-arial font-normal">
          {news.title}
        </h3>
      </a>
    </div>
  );

  return (
    <div id="news" className="w-full">
      {/* .article_header */}
      <div className="relative mt-[8px]">
        <a
          href="#news"
          onClick={(e) => e.preventDefault()}
          className="article_header block w-full h-[42px] leading-[42px] text-center bg-[#15aadc] hover:bg-[#1298c5] rounded-[5px] text-white text-[14px] font-bpg-arial no-underline transition-colors"
        >
          სიახლეები
        </a>
        <button
          type="button"
          onClick={() => dispatch(openAddNewsModal())}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white text-[11px] px-2.5 py-1 rounded flex items-center gap-1 cursor-pointer border-0"
          title="ახალი სტატიის დამატება (Formik/Yup CRUD)"
        >
          <Plus className="w-3 h-3" />
          <span>+ სტატია</span>
        </button>
      </div>

      {/* .article_blocks_container */}
      <div className="article_blocks_container flex flex-wrap justify-between">
        {/* პირველი 2 სიახლე */}
        {firstTwoNews.map(renderNewsCard)}

        {/* SS.ge კურორტების კარუსელი (.rss-item-amindi) ზუსტად amindi.ge-ს სტრუქტურით */}
        <div className="rss-item-amindi w-full mt-[8px] relative">
          <button
            type="button"
            onClick={() =>
              setResortOffset(
                (prev) => (prev - 1 + SSGE_RESORT_CARDS.length) % SSGE_RESORT_CARDS.length
              )
            }
            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-[#19375c] flex items-center justify-center shadow cursor-pointer border-0"
            aria-label="Previous resort"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              setResortOffset((prev) => (prev + 1) % SSGE_RESORT_CARDS.length)
            }
            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-[#19375c] flex items-center justify-center shadow cursor-pointer border-0"
            aria-label="Next resort"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {visibleResorts.map((resort) => (
              <div
                key={resort.id}
                className="relative h-[200px] rounded-[8px] overflow-hidden text-white flex flex-col justify-between p-3 bg-cover bg-center"
                style={{ backgroundImage: `url('${resort.bgImage}')` }}
              >
                {/* shadow.svg გადაფარვა */}
                <img
                  src="https://amindi.ge/static/img/shadow.svg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* ზედა ზოლი: amindige-logo.png + ქალაქის სახელი */}
                <div className="relative z-10 flex items-center gap-2">
                  <img
                    src="https://amindi.ge/static/img/amindige-logo.png"
                    alt="amindi.ge"
                    className="w-5 h-5"
                  />
                  <span className="text-[13px] font-bold truncate drop-shadow">
                    {resort.name}
                  </span>
                </div>

                {/* ცენტრალური ამინდის ხატულა + დღე/ღამის ტემპერატურა */}
                <div className="relative z-10 flex items-center justify-around my-1">
                  <img
                    src={`https://amindi.ge/static/img/weather_${resort.iconCode}.png`}
                    alt={resort.name}
                    className="w-[52px] h-auto"
                  />
                  <div className="text-[13px] space-y-1">
                    <div className="flex items-center gap-1.5">
                      <img
                        src="https://amindi.ge/static/img/sun-logo.png"
                        alt="day"
                        className="w-4 h-4"
                      />
                      <span className="font-bold">{resort.tempMax}°</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <img
                        src="https://amindi.ge/static/img/moon-logo.png"
                        alt="night"
                        className="w-3.5 h-3.5"
                      />
                      <span className="text-white/90">{resort.tempMin}°</span>
                    </div>
                  </div>
                </div>

                {/* ქვედა ზოლი: SS.ge ტექსტი + "ნახვა" ღილაკი */}
                <div className="relative z-10 flex items-center justify-between gap-2 pt-1 border-t border-white/20">
                  <a
                    href={resort.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-tight text-white no-underline hover:underline"
                  >
                    იქირავე დღიურად ბინა, სახლი, აგარაკი
                  </a>
                  <a
                    href={resort.link}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 bg-[#15aadc] hover:bg-[#1298c5] text-white text-[11px] px-2.5 py-1 rounded-[4px] no-underline"
                  >
                    ნახვა
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* დანარჩენი 8 სიახლე */}
        {remainingNews.map(renderNewsCard)}
      </div>

      {/* "ყველა სიახლე" ღილაკი */}
      <a
        href="https://www.ambebi.ge/"
        target="_blank"
        rel="noreferrer"
        className="see_all_article table px-[14px] py-[7px] text-[13px] rounded-[5px] bg-[#15aadc] hover:bg-[#1298c5] text-white mx-auto mt-[12px] font-bpg-arial no-underline transition-colors"
      >
        ყველა სიახლე
      </a>
    </div>
  );
};
