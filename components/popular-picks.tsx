'use client'

import { useLanguage } from '@/lib/i18n/language-context'
import Link from 'next/link'
import Image from 'next/image'
import { getProductById, type Product } from '@/lib/menu-data'
import type { Language } from '@/lib/i18n/translations'

// 名稱與價格取自 menu-data，或（menu-data 沒有的飲品）取自菜單翻譯檔；這裡只決定露出哪幾道、用哪張照片
type Pick = { img: string } & ({ productId: string } | { menuKey: string })

const picks: Pick[] = [
  { productId: 'braised-beef-noodle-soup', img: '/images/home/pick-beef-noodle.jpg' },
  { productId: 'braised-pork-rice', img: '/images/home/pick-pork-rice.jpg' },
  { productId: 'chiayi-chicken-rice', img: '/images/home/pick-chicken-rice.jpg' },
  { menuKey: 'menu.drinksList.categories.matcha.items.matchaLatte', img: '/images/home/pick-matcha.jpg' },
  { productId: 'pineapple-cake', img: '/images/home/pick-pineapple-cake.jpg' },
]

const fromLabel: Record<Language, string> = { zh: '起', en: 'From', es: 'Desde' }

function priceLabel(p: Product, lang: Language) {
  if (p.priceRange) {
    const amount = `$${p.priceRange.regular.toFixed(2)}`
    return lang === 'zh' ? `${amount} ${fromLabel.zh}` : `${fromLabel[lang]} ${amount}`
  }
  return p.price ? `$${p.price.toFixed(2)}` : ''
}

export function PopularPicks() {
  const { language: lang, t } = useLanguage()

  const heading = lang === 'zh' ? '人氣推薦' : lang === 'es' ? 'Los favoritos' : 'Our Favorites'
  const viewMenu = lang === 'zh' ? '完整菜單' : lang === 'es' ? 'Menú completo' : 'Full Menu'

  const items = picks.flatMap((pick) => {
    if ('menuKey' in pick) {
      const item = t<{ name: string; price: string } | string>(pick.menuKey)
      return typeof item === 'object' ? [{ key: pick.menuKey, img: pick.img, name: item.name, price: `$${item.price}` }] : []
    }
    const product = getProductById(pick.productId)
    return product
      ? [{ key: product.id, img: pick.img, name: product.name[lang] ?? product.name.en, price: priceLabel(product, lang) }]
      : []
  })

  return (
    <section className="bg-muted/60">
      <div className="mx-auto max-w-screen-xl px-6 py-14 md:px-12 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold text-primary md:text-4xl">{heading}</h2>
          <Link href="/menu" className="font-body text-sm font-semibold uppercase tracking-wider text-brick hover:underline">
            {viewMenu}
          </Link>
        </div>

        <div className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:px-0">
          {items.map(({ key, img, name, price }) => (
            <Link key={key} href="/menu" className="group w-[62%] shrink-0 snap-start sm:w-[40%] md:w-auto">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-card">
                <Image
                  src={img}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 62vw, (max-width: 768px) 40vw, 20vw"
                />
              </div>
              <p className="mt-3 font-body text-base font-semibold text-foreground">
                {name}
              </p>
              <p className="mt-0.5 font-body text-base font-semibold text-price">{price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
