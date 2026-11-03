'use client'

import { useLanguage } from '@/lib/i18n/language-context'
import Link from 'next/link'
import Image from 'next/image'
import type { Language } from '@/lib/i18n/translations'

const copy: Record<string, Record<Language, string>> = {
  eyebrow: { zh: '店內現烤', en: 'Baked In House', es: 'Horneado en casa' },
  title: { zh: '手工鳳梨酥', en: 'Handmade Pineapple Cakes', es: 'Pasteles de piña artesanales' },
  body: {
    zh: '奶香酥皮包著台灣土鳳梨內餡，在 Middletown 店裡一顆一顆手作。配一杯烏龍剛好，裝成禮盒送人也體面。',
    en: 'A buttery shortcrust wrapped around Taiwanese pineapple filling, made by hand in our Middletown kitchen. Perfect with a cup of oolong, and boxed up as a gift.',
    es: 'Masa mantecosa con relleno de piña taiwanesa, hecha a mano en nuestra cocina de Middletown. Ideal con un oolong o como regalo.',
  },
  cta: { zh: '看鳳梨酥禮盒', en: 'See the Gift Box', es: 'Ver la caja de regalo' },
}

export function BakeryFeature() {
  const { language: lang } = useLanguage()

  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-screen-xl items-center gap-8 px-6 py-14 md:grid-cols-2 md:gap-16 md:px-12 md:py-24">
        <div className="stitch relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src="/images/home/bakery-gift-box.jpg"
            alt={copy.title[lang]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="gingham-chip font-body text-xs font-semibold uppercase tracking-[0.2em] text-brick">{copy.eyebrow[lang]}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-5xl">{copy.title[lang]}</h2>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-muted-foreground md:text-lg">{copy.body[lang]}</p>
          <Link
            href="/product/freshly-baked-pineapple-cake-gift-box"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-7 py-3.5 font-body text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {copy.cta[lang]}
          </Link>
        </div>
      </div>
    </section>
  )
}
