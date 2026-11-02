'use client'

import { useLanguage } from '@/lib/i18n/language-context'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Language } from '@/lib/i18n/translations'

type Tile = {
  href: string
  img: string
  title: Record<Language, string>
  blurb: Record<Language, string>
  cta: Record<Language, string>
}

const tiles: Tile[] = [
  {
    href: '/menu',
    img: '/images/home/category-kitchen.jpg',
    title: { zh: '台式主餐', en: 'Taiwanese Kitchen', es: 'Cocina taiwanesa' },
    blurb: {
      zh: '牛肉麵、滷肉飯、雞肉飯，每天現煮。',
      en: 'Beef noodle soup, braised pork rice and chicken rice, cooked fresh daily.',
      es: 'Sopa de fideos con res, arroz con cerdo y arroz con pollo, hechos cada día.',
    },
    cta: { zh: '看主餐', en: 'See the menu', es: 'Ver el menú' },
  },
  {
    href: '/menu',
    img: '/images/home/category-drinks.jpg',
    title: { zh: '珍奶與茶飲', en: 'Bubble Tea & Drinks', es: 'Bubble tea y bebidas' },
    blurb: {
      zh: '台灣茶葉現沖，黑糖珍珠每天熬煮。',
      en: 'Brewed from Taiwanese tea leaves, with brown sugar boba made every day.',
      es: 'Con hojas de té de Taiwán y boba de azúcar morena hecha a diario.',
    },
    cta: { zh: '看飲料', en: 'See drinks', es: 'Ver bebidas' },
  },
  {
    href: '/products',
    img: '/images/home/category-shop.jpg',
    title: { zh: '台灣茶與伴手禮', en: 'Tea, Snacks & Gifts', es: 'Té, snacks y regalos' },
    blurb: {
      zh: '高山茶、蜜餞零嘴、鳳梨酥禮盒，店內選購。',
      en: 'Mountain teas, Taiwanese snacks and pineapple cake gift boxes, in store.',
      es: 'Tés de montaña, snacks taiwaneses y cajas de pastel de piña, en tienda.',
    },
    cta: { zh: '逛商品', en: 'Browse the shop', es: 'Ver productos' },
  },
]

export function CategoryTiles() {
  const { language: lang } = useLanguage()

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-screen-xl gap-5 px-6 py-14 sm:grid-cols-3 md:gap-8 md:px-12 md:py-20">
        {tiles.map((tile) => (
          <Link key={tile.img} href={tile.href} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted sm:aspect-[4/5]">
              <Image
                src={tile.img}
                alt={tile.title[lang]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-bold text-primary">{tile.title[lang]}</h2>
            <p className="mt-2 font-body text-base leading-relaxed text-muted-foreground">{tile.blurb[lang]}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 font-body text-sm font-semibold uppercase tracking-wider text-accent">
              {tile.cta[lang]}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
