'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/language-context';
import type { Product } from '@/types/product';
import { getProductName, type Language } from '@/types/product';
import { getShortName } from './product-short-names';
import { POSTERS, LANDSCAPE } from './posters';
import { BakerySection } from '@/components/bakery-section';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

type CatId = 'tea' | 'fruit' | 'snack';
type FilterId = 'all' | 'new' | 'bakery' | CatId | 'gift';
type Lang = 'zh' | 'en' | 'es';

const CATS: { id: CatId; kicker: string; title: Record<Lang, string> }[] = [
  { id: 'tea', kicker: 'Taiwan Tea', title: { zh: '台灣好茶', en: 'Taiwan Tea', es: 'Té de Taiwán' } },
  { id: 'fruit', kicker: 'Dried Fruit & Preserves', title: { zh: '台灣果乾蜜餞', en: 'Dried Fruit & Preserves', es: 'Frutas Secas y Confitadas' } },
  { id: 'snack', kicker: 'Snacks & Crackers', title: { zh: '零食餅乾', en: 'Snacks & Crackers', es: 'Snacks y Galletas' } },
];

const FILTERS: { id: FilterId; label: Record<Lang, string> }[] = [
  { id: 'all', label: { zh: '全部', en: 'All', es: 'Todos' } },
  { id: 'new', label: { zh: '🆕 新到貨', en: '🆕 New Arrivals', es: '🆕 Novedades' } },
  { id: 'bakery', label: { zh: '手工烘焙', en: 'Bakery', es: 'Panadería' } },
  { id: 'tea', label: { zh: '茶葉', en: 'Tea', es: 'Té' } },
  { id: 'fruit', label: { zh: '果乾蜜餞', en: 'Dried Fruit', es: 'Fruta Seca' } },
  { id: 'snack', label: { zh: '零食', en: 'Snacks', es: 'Snacks' } },
  { id: 'gift', label: { zh: '禮盒', en: 'Gift Boxes', es: 'Regalos' } },
];

/* 茶葉依「形式」分小標組（順序即顯示順序） */
const TEA_FORMATS: { id: string; label: Record<Lang, string> }[] = [
  { id: 'looseTea', label: { zh: '台灣高山茶', en: 'High-Mountain Loose Tea', es: 'Té de Alta Montaña' } },
  { id: 'teaBags', label: { zh: '茶包', en: 'Tea Bags', es: 'Bolsitas de Té' } },
  { id: 'teaBlock', label: { zh: '茶磚', en: 'Tea Bricks', es: 'Ladrillos de Té' } },
];

function categorize(p: Product): CatId {
  const n = p.name_zh || '';
  if (/梅|果乾|芭樂乾|甜蜜柑|脆片|梨糖|洛神|黑糖磚|金頌李|金橘/.test(n)) return 'fruit';
  if (/豆干|豆乾|魚酥|香菇|鳳梨酥/.test(n)) return 'snack';
  if (/茶|烏龍|黑糖磚|黑豆/.test(n)) return 'tea';
  return 'snack';
}

function isGift(p: Product): boolean {
  return /禮盒|gift box/i.test(`${p.name_zh || ''} ${p.name_en || ''}`);
}

/** 目前有效的新到貨（勾選 + 未過截止日），與首頁 snack-shop 判斷一致 */
function isActiveNewArrival(p: Product): boolean {
  if (!p.is_new_arrival) return false;
  if (!p.featured_until) return true;
  const today = new Date().toISOString().slice(0, 10);
  return p.featured_until >= today;
}

function teaFormat(p: Product): string {
  const n = `${p.name_zh || ''} ${p.name_en || ''}`;
  if (/磚|黑糖|Brick/.test(n)) return 'teaBlock';
  if (/入|Bags|茶包/.test(n)) return 'teaBags';
  return 'looseTea';
}

/* ── 海報卡 ── */
function PosterCard({ p, language, detail, inStore, eager }: { p: Product; language: Language; detail: string; inStore: string; eager: boolean }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-md"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <Image
          src={POSTERS[p.slug]}
          alt={getProductName(p, language)}
          fill
          preload={eager}
          fetchPriority={eager ? 'high' : undefined}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
        />
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <span className="font-body text-sm font-bold text-primary">
          {p.price != null ? `$${Number(p.price).toFixed(2)}` : inStore}
        </span>
        <span className="inline-flex items-center gap-1 font-body text-xs font-semibold text-primary transition-colors group-hover:text-primary/80">
          {detail}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

/* ── 情境照卡（果乾、零食）：橫式照片，品名與價格寫在下方 ── */
function PhotoCard({ p, language, eager }: { p: Product; language: Language; eager: boolean }) {
  const other: Language = language === 'zh' ? 'en' : 'zh';
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-md"
    >
      {/* 直式舊海報、實拍圖完整顯示在格紋桌巾上；橫式情境照剛好填滿 */}
      <div className="gingham-cloth relative aspect-[3/2] overflow-hidden">
        <Image
          src={POSTERS[p.slug]}
          alt={getProductName(p, language)}
          fill
          preload={eager}
          fetchPriority={eager ? 'high' : undefined}
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <h3 className="font-heading text-base font-bold text-primary">{getShortName(p, language)}</h3>
          <p className="font-heading text-sm text-foreground/60">{getShortName(p, other)}</p>
        </div>
        {p.price != null && (
          <span className="shrink-0 font-heading text-base font-bold text-price">${Number(p.price).toFixed(2)}</span>
        )}
      </div>
    </Link>
  );
}

/* ── 沒有海報的商品：菜單式一行（品名、另一語言名稱、價格），不放隨手拍的照片 ── */
function TextCard({ p, language }: { p: Product; language: Language }) {
  const other: Language = language === 'zh' ? 'en' : 'zh';
  return (
    <Link href={`/product/${p.slug}`} className="group flex items-baseline justify-between gap-4 border-b border-border py-4">
      <div className="min-w-0">
        <h3 className="font-heading text-base font-bold text-primary group-hover:underline md:text-lg">{getShortName(p, language)}</h3>
        <p className="font-heading text-sm text-foreground/60">{getShortName(p, other)}</p>
      </div>
      {p.price != null && (
        <span className="shrink-0 font-heading text-base font-bold text-price md:text-lg">${Number(p.price).toFixed(2)}</span>
      )}
    </Link>
  );
}

const SMALL_GRID = 'grid grid-cols-1 gap-x-12 border-t border-border md:grid-cols-2';

/* ── 單一分類區塊：海報卡 + （茶葉再依形式分小標）小卡 ── */
function CategoryBlock({
  catId,
  items,
  showHeader,
  isFirst,
  lang,
  language,
  detail,
  inStore,
}: {
  catId: CatId;
  items: Product[];
  showHeader: boolean;
  isFirst: boolean;
  lang: Lang;
  language: Language;
  detail: string;
  inStore: string;
}) {
  if (!items.length) return null;
  // 茶葉保留直式海報；果乾零食、以及任何有橫式情境照的商品用橫式卡
  const isPhoto = (p: Product) => catId !== 'tea' || LANDSCAPE.has(p.slug);
  const photos = items.filter((p) => POSTERS[p.slug] && isPhoto(p));
  const posters = items.filter((p) => POSTERS[p.slug] && !isPhoto(p));
  const lists = items.filter((p) => !POSTERS[p.slug]);
  const cat = CATS.find((c) => c.id === catId)!;

  return (
    <section className="mb-16">
      {showHeader && (
        <div className="mb-6 text-center">
          <p className="gingham-chip mb-1 font-body text-[11px] uppercase tracking-[0.2em] text-brick">{cat.kicker}</p>
          <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">{cat.title[lang]}</h2>
        </div>
      )}

      {photos.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {photos.map((p, i) => (
            <PhotoCard key={p.id} p={p} language={language} eager={isFirst && i < 3} />
          ))}
        </div>
      )}

      {posters.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-4 md:gap-5 [&>*]:w-[calc(50%-0.5rem)] md:[&>*]:w-[calc(33.333%-0.834rem)] lg:[&>*]:w-[calc(25%-0.9375rem)]">
          {posters.map((p, i) => (
            <PosterCard key={p.id} p={p} language={language} detail={detail} inStore={inStore} eager={isFirst && i < 4} />
          ))}
        </div>
      )}

      {lists.length > 0 &&
        (catId === 'tea' ? (
          /* 茶葉：依 台灣高山茶 / 茶包 / 茶磚 小標分組 */
          <div className="space-y-8">
            {TEA_FORMATS.map((tf) => {
              const sub = lists.filter((p) => teaFormat(p) === tf.id);
              if (!sub.length) return null;
              return (
                <div key={tf.id}>
                  <div className="mb-4 flex items-center gap-3">
                    <h3 className="font-heading text-xl font-bold text-primary">{tf.label[lang]}</h3>
                    <span className="h-px flex-1 bg-primary/15" />
                  </div>
                  <div className={SMALL_GRID}>
                    {sub.map((p) => (
                      <TextCard key={p.id} p={p} language={language} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={SMALL_GRID}>
            {lists.map((p) => (
              <TextCard key={p.id} p={p} language={language} />
            ))}
          </div>
        ))}
    </section>
  );
}

export default function ProductsGrid({ products }: { products: Product[] }) {
  const { language } = useLanguage();
  const lang: Lang = (['zh', 'en', 'es'] as const).includes(language as Lang) ? (language as Lang) : 'en';
  const [filter, setFilter] = useState<FilterId>('all');

  const inStore = lang === 'zh' ? '店內販售' : lang === 'es' ? 'En tienda' : 'In-store';
  const detail = lang === 'zh' ? '看詳情' : lang === 'es' ? 'Ver más' : 'Details';
  const intro =
    lang === 'zh'
      ? '嚴選台灣好茶、果乾蜜餞與傳統零嘴——歡迎到店選購，把家鄉味帶回家。'
      : lang === 'es'
        ? 'Tés selectos, frutas confitadas y snacks tradicionales de Taiwán — disponibles en tienda.'
        : 'Curated Taiwanese teas, dried fruits and traditional snacks — come pick some up in store.';

  const grouped: Record<CatId, Product[]> = { tea: [], fruit: [], snack: [] };
  products.forEach((p) => grouped[categorize(p)].push(p));

  const emptyLabel = lang === 'zh' ? '此分類目前沒有商品' : lang === 'es' ? 'No hay productos en esta categoría' : 'No products in this category';

  // 有沒有「有效的新到貨」— 沒有就不顯示該篩選 chip
  const hasNew = products.some(isActiveNewArrival);
  const visibleFilters = FILTERS.filter((f) => f.id !== 'new' || hasNew);

  // 依篩選決定要呈現的分類區塊（跨類的用 CategoryBlock 依分類拆）
  let blocks: { catId: CatId; items: Product[] }[] = [];
  if (filter === 'all') {
    blocks = CATS.map((c) => ({ catId: c.id, items: grouped[c.id] }));
  } else if (filter === 'gift') {
    blocks = CATS.map((c) => ({ catId: c.id, items: grouped[c.id].filter(isGift) })).filter((b) => b.items.length);
  } else if (filter === 'bakery') {
    blocks = [];
  } else if (filter === 'new') {
    blocks = CATS.map((c) => ({ catId: c.id, items: grouped[c.id].filter(isActiveNewArrival) })).filter((b) => b.items.length);
  } else {
    blocks = [{ catId: filter, items: grouped[filter] }];
  }
  const showBakery = filter === 'all' || filter === 'bakery';
  const nothing = !showBakery && blocks.every((b) => b.items.length === 0);

  return (
    <div className="bg-cream">
      {/* 頁首 banner */}
      <div className="mx-auto max-w-5xl px-6 pt-6 pb-4 md:px-8">
        <div className="pt-5 text-center md:pt-6">
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            {lang === 'zh' ? '台灣茶與伴手禮' : lang === 'es' ? 'Té y regalos de Taiwán' : 'Taiwan Tea & Gifts'}
          </h1>
          <span className="sr-only">
            {lang === 'zh'
              ? '台灣零食・茶葉・伴手禮｜紐約 Middletown TaiwanWay 台灣味'
              : lang === 'es'
                ? 'Snacks, Té y Regalos Taiwaneses en Middletown, NY | TaiwanWay'
                : 'Taiwanese Snacks, Tea & Gifts in Middletown, NY | TaiwanWay'}
          </span>
        </div>
        <p className="mx-auto mt-2 max-w-xl text-center font-body text-sm text-muted-foreground md:text-base">{intro}</p>
      </div>

      {/* 分類篩選列（黏頂） */}
      <nav className="sticky top-20 z-30 md:top-[108px] border-y border-black/5 bg-cream/95 backdrop-blur-md">
        <div className="scrollbar-hide mx-auto max-w-6xl overflow-x-auto px-4 py-3">
          <div className="flex min-w-max justify-center gap-2">
            {visibleFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`whitespace-nowrap rounded-full border px-5 py-2 font-body text-sm font-semibold transition-colors duration-300 ${
                  filter === f.id ? 'border-primary/25 bg-secondary text-primary' : 'border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-primary'
                }`}
              >
                {f.label[lang]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8">
        {showBakery && <BakerySection lang={language} />}
        {nothing ? (
          <p className="py-16 text-center font-body text-muted-foreground">{emptyLabel}</p>
        ) : (
          blocks.map((b, i) => (
            <CategoryBlock
              key={b.catId}
              isFirst={i === 0 && !showBakery}
              catId={b.catId}
              items={b.items}
              showHeader={filter === 'all' || filter === 'gift' || filter === 'new'}
              lang={lang}
              language={language}
              detail={detail}
              inStore={inStore}
            />
          ))
        )}

        {/* 到店資訊 */}
        <section className="border-t border-black/5 pt-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-primary">{lang === 'zh' ? '歡迎到店選購' : 'Come Visit Us'}</h2>
          <div className="mx-auto mt-4 flex max-w-xl flex-col items-center gap-2 font-body text-sm text-foreground/80">
            <a
              href="https://www.google.com/maps/search/?api=1&query=TaiwanWay+26+South+St+Middletown+NY+10940"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              <MapPin className="h-4 w-4 text-primary" />26 South St, Middletown, NY 10940
            </a>
            <a href="tel:+18453811002" className="flex items-center gap-2 hover:text-primary">
              <Phone className="h-4 w-4 text-primary" />(845) 381-1002
            </a>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />{lang === 'zh' ? '週一・二・三・五・六 11AM–7PM' : 'Mon · Tue · Wed · Fri · Sat 11AM–7PM'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
