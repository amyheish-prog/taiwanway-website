'use client'

import { useLanguage } from '@/lib/i18n/language-context'
import Link from 'next/link'
import Image from 'next/image'
import { DOORDASH_URL } from '@/components/order-button'

const copy = {
  eyebrow: { zh: '台式咖啡館 · 紐約 Middletown', en: 'Taiwanese Café · Middletown, NY', es: 'Café taiwanés · Middletown, NY' },
  headline: { zh: '台灣的味道，\n為你而做。', en: 'A Taste of Taiwan,\nMade for You.', es: 'Un sabor de Taiwán,\nhecho para ti.' },
  description: {
    zh: '慢燉牛肉麵、滷肉飯、手搖珍奶，還有現烤鳳梨酥。',
    en: 'Slow-braised beef noodle soup, braised pork rice, bubble tea, and fresh-baked pineapple cakes.',
    es: 'Sopa de fideos con res, arroz con cerdo estofado, bubble tea y pasteles de piña recién horneados.',
  },
  order: { zh: 'DoorDash 外送', en: 'Order on DoorDash', es: 'Pedir en DoorDash' },
  menu: { zh: '看菜單', en: 'View Menu', es: 'Ver menú' },
  // 畫面顯示品牌標語，真 h1 用關鍵字完整的在地描述（給螢幕閱讀器與搜尋引擎）
  srHeading: {
    zh: 'TaiwanWay 台灣味 — 紐約 Middletown 家鄉味台式咖啡館｜牛肉麵、滷肉飯、珍珠奶茶、鳳梨酥',
    en: 'TaiwanWay — Home-Style Taiwanese Café in Middletown, NY | Beef Noodle Soup, Braised Pork Rice, Bubble Tea & Pineapple Cake',
    es: 'TaiwanWay — Café taiwanés casero en Middletown, NY | Sopa de fideos con res, arroz con cerdo estofado, bubble tea',
  },
  alt: {
    zh: 'TaiwanWay 紅燒牛肉麵，配酸菜、青蔥與青江菜，擺在灑滿陽光的木桌上',
    en: 'TaiwanWay braised beef noodle soup with pickled greens, scallions and bok choy on a sunlit wood table',
    es: 'Sopa de fideos con res de TaiwanWay con mostaza encurtida, cebollín y bok choy en una mesa soleada',
  },
}

export function Hero() {
  const { language: lang } = useLanguage()

  return (
    <section className="relative w-full">
      <div className="relative h-[560px] w-full overflow-hidden md:h-[min(78vh,680px)]">
        <Image
          src="/images/home/hero.jpg"
          alt={copy.alt[lang]}
          fill
          preload
          fetchPriority="high"
          className="object-cover object-[60%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/40 md:via-45%" />

        <div className="relative z-10 mx-auto flex h-full max-w-screen-xl items-end px-6 pb-12 md:items-center md:px-12 md:pb-0">
          <div className="max-w-xl text-white">
            <h1 className="sr-only">{copy.srHeading[lang]}</h1>
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/85 md:text-sm">
              {copy.eyebrow[lang]}
            </p>
            <p className="whitespace-pre-line font-heading text-4xl font-bold leading-tight drop-shadow-sm sm:text-5xl md:text-6xl">
              {copy.headline[lang]}
            </p>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-white/90 md:text-lg">
              {copy.description[lang]}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={DOORDASH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-cream px-7 py-3.5 font-body text-base font-semibold text-primary shadow-lg transition-colors hover:bg-secondary"
              >
                {copy.order[lang]}
              </a>
              <Link
                href="/menu"
                className="inline-flex items-center rounded-full border-2 border-white/90 px-7 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-white hover:text-primary"
              >
                {copy.menu[lang]}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="gingham-band" aria-hidden />
    </section>
  )
}
