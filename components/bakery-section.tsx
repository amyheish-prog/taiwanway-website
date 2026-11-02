'use client'

import Image from 'next/image'
import type { Language } from '@/lib/i18n/translations'

type Price = { label: Record<Language, string>; amount: string }

type BakeryItem = {
  id: string
  // 沒有照片時顯示格紋名稱卡
  img?: string
  name: Record<Language, string>
  blurb: Record<Language, string>
  prices: Price[]
}

// 價格以 Square 商品庫為準（2026-11）
const ITEMS: BakeryItem[] = [
  {
    id: 'pineapple-cake',
    img: '/images/home/bakery-pineapple-cake.jpg',
    name: { zh: '手工鳳梨酥', en: 'Handmade Pineapple Cake', es: 'Pastel de piña artesanal' },
    blurb: {
      zh: '奶香酥皮包台灣土鳳梨內餡，每天手作。',
      en: 'Buttery shortcrust with Taiwanese pineapple filling, made by hand daily.',
      es: 'Masa mantecosa con relleno de piña taiwanesa, hecha a mano cada día.',
    },
    prices: [
      { label: { zh: '單顆', en: 'Each', es: 'Unidad' }, amount: '$3.25' },
      { label: { zh: '禮盒 6 入', en: 'Gift box of 6', es: 'Caja de 6' }, amount: '$19.99' },
    ],
  },
  {
    id: 'egg-rolls',
    img: '/images/home/bakery-egg-rolls.jpg',
    name: { zh: '手工蛋捲', en: 'Handmade Egg Rolls', es: 'Barquillos de huevo artesanales' },
    blurb: {
      zh: '薄脆蛋捲一層層捲起，蛋香濃、入口即化。',
      en: 'Thin, crisp rolls with a rich egg flavor that melts in your mouth.',
      es: 'Finos y crujientes, con intenso sabor a huevo.',
    },
    prices: [
      { label: { zh: '單支', en: 'Single', es: 'Unidad' }, amount: '$1.50' },
      { label: { zh: '一包', en: 'Pack', es: 'Paquete' }, amount: '$12.00' },
    ],
  },
  {
    id: 'soft-cookies',
    name: { zh: '現烤軟餅乾', en: 'Fresh-Baked Soft Cookies', es: 'Galletas suaves recién horneadas' },
    blurb: {
      zh: '店內現烤，外酥內軟，口味每日輪替。',
      en: 'Baked in house, crisp edges and a soft center. Flavors rotate daily.',
      es: 'Horneadas en casa, bordes crujientes y centro suave. Sabores del día.',
    },
    prices: [
      { label: { zh: '巧克力', en: 'Chocolate', es: 'Chocolate' }, amount: '$2.99' },
      { label: { zh: '抹茶', en: 'Matcha', es: 'Matcha' }, amount: '$3.50' },
    ],
  },
]

export function BakerySection({ lang }: { lang: Language }) {
  return (
    <section id="bakery" className="mb-16">
      <div className="mb-6 text-center">
        <p className="gingham-chip mb-1 font-body text-[11px] uppercase tracking-[0.2em] text-brick">Baked In House</p>
        <h2 className="font-heading text-2xl font-bold text-primary md:text-3xl">
          {lang === 'zh' ? '手工烘焙' : lang === 'es' ? 'Horneado en casa' : 'Handmade Bakery'}
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-3 md:gap-6">
        {ITEMS.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-black/5">
            {item.img ? (
              <div className="relative aspect-[4/3] sm:aspect-[4/5]">
                <Image src={item.img} alt={item.name[lang]} fill preload fetchPriority="high" className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
            ) : (
              <div className="gingham-cloth flex aspect-[4/3] items-center justify-center p-6 sm:aspect-[4/5]">
                <p className="stitch rounded-2xl bg-card px-6 py-4 text-center font-heading text-xl font-bold text-primary">
                  {item.name[lang]}
                </p>
              </div>
            )}
            <div className="p-5">
              <h3 className="font-heading text-lg font-bold text-primary">{item.name[lang]}</h3>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{item.blurb[lang]}</p>
              <ul className="mt-3 space-y-1 border-t border-border pt-3">
                {item.prices.map((p) => (
                  <li key={p.label.en} className="flex items-baseline justify-between font-body text-sm">
                    <span className="text-foreground/80">{p.label[lang]}</span>
                    <span className="font-heading text-base font-bold text-price">{p.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
