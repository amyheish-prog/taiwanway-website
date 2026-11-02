'use client'

import { useLanguage } from '@/lib/i18n/language-context'
import Image from 'next/image'
import { MapPin, Phone, Clock } from 'lucide-react'
import type { Language } from '@/lib/i18n/translations'

const DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=26+South+St+Middletown+NY+10940'

const copy: Record<string, Record<Language, string>> = {
  eyebrow: { zh: '歡迎光臨', en: 'You Are Always Welcome', es: 'Siempre bienvenidos' },
  title: { zh: '來店裡坐坐', en: 'Come Sit a While', es: 'Ven a quedarte un rato' },
  body: {
    zh: '一棟老房子裡的台式咖啡館。有壁爐、吊燈和一整面台灣茶，點碗麵、喝杯茶，慢慢待。',
    en: 'A Taiwanese café in an old house on South Street, with a fireplace, warm lights and a wall of Taiwanese tea. Order a bowl, pour a cup, and stay as long as you like.',
    es: 'Un café taiwanés en una casa antigua de South Street, con chimenea y una pared de tés de Taiwán. Pide un plato, sirve un té y quédate.',
  },
  directions: { zh: '開車導航', en: 'Get Directions', es: 'Cómo llegar' },
}

export function VisitUs() {
  const { language: lang, t } = useLanguage()

  return (
    <section className="bg-secondary/60">
      <div className="gingham-band" aria-hidden />
      <div className="mx-auto grid max-w-screen-xl gap-10 px-6 py-14 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-12 md:py-24">
        <div className="grid grid-cols-[3fr_2fr] gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/home/visit-exterior.jpg"
              alt={lang === 'zh' ? 'TaiwanWay 店門口與開花的樹' : 'TaiwanWay storefront on South Street with a tree in bloom'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 60vw, 30vw"
            />
          </div>
          <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/home/visit-interior.jpg"
              alt={lang === 'zh' ? 'TaiwanWay 店內座位與壁爐' : 'Seating and fireplace inside TaiwanWay'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40vw, 20vw"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">{copy.eyebrow[lang]}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary md:text-5xl">{copy.title[lang]}</h2>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-muted-foreground md:text-lg">{copy.body[lang]}</p>

          <ul className="mt-8 space-y-4 font-body text-base text-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>26 South St, Middletown, NY 10940</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>
                {t('contact.schedule')}
                <br />
                <span className="font-semibold">{t('contact.time')}</span>
                <br />
                <span className="text-muted-foreground">{t('contact.closed')}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>
                <a href="tel:+18453811002" className="font-semibold hover:underline">(845) 381-1002</a>
              </span>
            </li>
          </ul>

          <a
            href={DIRECTIONS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-fit items-center rounded-full border-2 border-primary px-7 py-3 font-body text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {copy.directions[lang]}
          </a>
        </div>
      </div>
    </section>
  )
}
