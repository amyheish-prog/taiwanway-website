'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/language-context'
import { menuCategories, type MenuCategory, type MenuItemData } from '@/lib/menu-categories'
import { MapPin, Phone, Clock } from 'lucide-react'
import { OrderButton } from './order-button'

type Lang = 'zh' | 'en' | 'es'

const MAPS = 'https://www.google.com/maps/search/?api=1&query=TaiwanWay+26+South+St+Middletown+NY+10940'

/* 標籤定義：hot=人氣、rec=主廚推薦、diet=成分/過敏原 */
type TagKind = 'hot' | 'rec' | 'diet'
const T: Record<string, { label: Record<Lang, string>; kind: TagKind }> = {
  hot: { label: { zh: '人氣', en: 'Popular', es: 'Popular' }, kind: 'hot' },
  rec: { label: { zh: '主廚推薦', en: "Chef's Pick", es: 'Recomendado' }, kind: 'rec' },
  beef: { label: { zh: '含牛肉', en: 'Beef', es: 'Res' }, kind: 'diet' },
  pork: { label: { zh: '含豬肉', en: 'Pork', es: 'Cerdo' }, kind: 'diet' },
  chicken: { label: { zh: '含雞肉', en: 'Chicken', es: 'Pollo' }, kind: 'diet' },
  seafood: { label: { zh: '含海鮮', en: 'Seafood', es: 'Marisco' }, kind: 'diet' },
  peanut: { label: { zh: '含花生', en: 'Peanuts', es: 'Cacahuete' }, kind: 'diet' },
  egg: { label: { zh: '含蛋', en: 'Egg', es: 'Huevo' }, kind: 'diet' },
  dairy: { label: { zh: '含奶', en: 'Dairy', es: 'Lácteos' }, kind: 'diet' },
  veg: { label: { zh: '素食', en: 'Veg', es: 'Veg' }, kind: 'diet' },
}
const TAGS: Record<string, string[]> = {
  '紅燒牛肉麵': ['hot', 'rec', 'beef'],
  '麻醬牛肉乾麵': ['beef', 'peanut'],
  '古早味滷肉飯': ['hot', 'pork', 'egg'],
  '雞肉飯': ['chicken'],
  '櫻花蝦米糕': ['rec', 'seafood'],
  '台式泡菜': ['veg'],
  '台灣鳳梨酥': ['rec', 'dairy', 'egg'],
  '每日現做各式起司蛋糕': ['dairy', 'egg'],
  '戚風蛋糕': ['dairy', 'egg'],
}

/* 人氣推薦大卡（品牌卡） */
const POPULAR = [
  { img: '/images/home/pick-beef-noodle.jpg', alt: { zh: '紅燒牛肉麵', en: 'Braised Beef Noodle Soup', es: 'Sopa de fideos con res' } },
  { img: '/images/home/pick-pork-rice.jpg', alt: { zh: '滷肉飯', en: 'Braised Pork Rice', es: 'Arroz con cerdo' } },
  { img: '/images/home/pick-matcha.jpg', alt: { zh: '抹茶拿鐵', en: 'Matcha Latte', es: 'Matcha latte' } },
  { img: '/images/home/pick-pineapple-cake.jpg', alt: { zh: '台灣鳳梨酥', en: 'Taiwan Pineapple Cake', es: 'Pastel de piña' } },
]

const NAV = [
  { id: 'popular', label: { zh: '人氣', en: 'Popular', es: 'Favoritos' } },
  { id: 'mains', label: { zh: '主餐', en: 'Mains', es: 'Platos' } },
  { id: 'sides', label: { zh: '小點', en: 'Sides', es: 'Entrantes' } },
  { id: 'desserts', label: { zh: '甜點', en: 'Desserts', es: 'Postres' } },
  { id: 'drinks', label: { zh: '飲品', en: 'Drinks', es: 'Bebidas' } },
  { id: 'combos', label: { zh: '套餐', en: 'Combos', es: 'Combos' } },
]

const DRINK_IDS = ['taiwanese-black-tea', 'jasmine', 'oolong', 'matcha', 'coffee', 'caffeine-free', 'pot-brewed', 'winter']

const comboItems = [
  { img: '/images/home/combo-bubble-tea.png', name: { zh: '珍珠奶茶', en: 'Bubble Tea', es: 'Té de Burbujas' }, price: '+$5.00' },
  { img: '/images/home/combo-hot-tea.png', name: { zh: '熱茶', en: 'Hot Tea', es: 'Té Caliente' }, price: '+$4.00' },
  { img: '/images/home/combo-cheesecake.png', name: { zh: '起司蛋糕', en: 'Cheesecake', es: 'Pastel de Queso' }, price: '+$5.00' },
]

export function MenuFull() {
  const { language } = useLanguage()
  const lang: Lang = (['zh', 'en', 'es'].includes(language) ? language : 'en') as Lang
  const [active, setActive] = useState('popular')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-25% 0px -65% 0px' }
    )
    NAV.forEach((g) => { const el = document.getElementById(g.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const catById = (id: string) => menuCategories.find((c) => c.id === id)
  const catTitle = (c: MenuCategory) => (lang === 'zh' ? c.titleZh : lang === 'es' ? c.titleEs : c.titleEn)
  const name = (i: MenuItemData) => (lang === 'zh' ? i.nameZh : lang === 'es' ? i.nameEs : i.nameEn)
  const subName = (i: MenuItemData) => (lang === 'zh' ? i.nameEn : i.nameZh)
  const desc = (i: MenuItemData) => (lang === 'zh' ? i.descZh : lang === 'es' ? i.descEs : i.descEn)
  const fmt = (p: string) => (p.startsWith('$') ? p : `$${p}`)

  const heading = lang === 'zh' ? '菜單' : lang === 'es' ? 'Menú' : 'Menu'
  const intro = lang === 'zh'
    ? '道地台式餐點、手搖茶飲、現煮咖啡與每日現做甜點——家鄉味，端上你的桌。'
    : lang === 'es'
      ? 'Platos taiwaneses, tés artesanales, café y postres del día — el sabor de casa.'
      : 'Taiwanese comfort food, hand-shaken teas, fresh coffee & daily desserts — the taste of home.'
  const callLabel = lang === 'zh' ? '來電洽詢' : lang === 'es' ? 'Llámanos' : 'Call Us'

  const mains = catById('main-dishes')
  const sides = catById('appetizers')
  const desserts = catById('desserts')

  return (
    <div className="bg-cream pb-24 md:pb-0">
      {/* 頁首標題 + CTA */}
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-6 md:px-8 md:pt-12">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-primary md:text-4xl">
            {heading}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-balance font-body text-sm leading-relaxed text-muted-foreground md:text-base">{intro}</p>
          <span className="sr-only">
            {lang === 'zh'
              ? 'TaiwanWay 菜單 — 牛肉麵、珍珠奶茶、滷肉飯、甜點｜紐約 Middletown'
              : lang === 'es'
                ? 'Menú TaiwanWay — Sopa de Fideos, Bubble Tea, Arroz con Cerdo | Middletown, NY'
                : 'TaiwanWay Menu — Beef Noodle Soup, Bubble Tea, Braised Pork Rice & Desserts in Middletown, NY'}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <OrderButton className="px-5 py-2 text-sm" />
          <a href="tel:+18453811002" className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 font-body text-sm font-semibold text-primary transition hover:bg-secondary">
            <Phone className="h-4 w-4" />{callLabel}
          </a>
        </div>
      </div>

      {/* 分類黏頂列 */}
      <nav className="sticky top-20 z-30 md:top-[108px] border-y border-black/5 bg-cream/95 backdrop-blur-md">
        <div className="scrollbar-hide mx-auto max-w-6xl overflow-x-auto px-4 py-3">
          <div className="flex min-w-max justify-center gap-2">
            {NAV.map((g) => (
              <a key={g.id} href={`#${g.id}`}
                className={`whitespace-nowrap rounded-full border px-5 py-2 font-body text-sm font-semibold transition-colors duration-300 ${active === g.id ? 'border-primary/25 bg-secondary text-primary' : 'border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-primary'}`}>
                {g.label[lang]}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        {/* 人氣推薦 */}
        <section id="popular" className="gingham-cloth -mx-6 scroll-mt-36 px-6 py-8 md:mx-0 md:scroll-mt-44 md:rounded-3xl md:px-8">
          <GroupHeader kicker="Signature · Most Loved" title={lang === 'zh' ? '人氣推薦' : lang === 'es' ? 'Los favoritos' : 'Popular Picks'} />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {POPULAR.map((p, i) => (
              <figure key={p.img} className="rounded-2xl bg-card p-3 shadow-sm ring-1 ring-black/5">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={p.img} alt={p.alt[lang]} fill preload={i < 2} fetchPriority={i < 2 ? 'high' : undefined} className="object-cover" sizes="(max-width:768px) 45vw, 22vw" />
                </div>
                <figcaption className="mt-3 px-1 pb-1 font-body text-base font-semibold text-foreground">{p.alt[lang]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 主餐 */}
        {mains && (
          <CardSection id="mains" kicker="Rice Bowls & Noodles" title={lang === 'zh' ? '主餐' : 'Mains'}
            items={mains.items} lang={lang} name={name} subName={subName} desc={desc} fmt={fmt} />
        )}

        {/* 小點 */}
        {sides && (
          <CardSection id="sides" kicker="Small Bites" title={lang === 'zh' ? '小點' : lang === 'es' ? 'Entrantes' : 'Sides'}
            items={sides.items} lang={lang} name={name} subName={subName} desc={desc} fmt={fmt} />
        )}

        {/* 甜點 */}
        {desserts && (
          <CardSection id="desserts" kicker="Sweet Endings" title={lang === 'zh' ? '甜點' : 'Desserts'}
            items={desserts.items} lang={lang} name={name} subName={subName} desc={desc} fmt={fmt} />
        )}

        {/* 飲品（一大類一張卡） */}
        <section id="drinks" className="scroll-mt-36 md:scroll-mt-44 pt-6">
          <GroupHeader kicker="Hand-Shaken Teas · Coffee" title={lang === 'zh' ? '飲品' : 'Drinks'} />
          <div className="grid items-start gap-x-12 gap-y-10 md:grid-cols-2">
            {DRINK_IDS.map((id) => {
              const c = catById(id)
              if (!c) return null
              return <DrinkCard key={id} title={catTitle(c)} items={c.items} name={name} subName={subName} fmt={fmt} />
            })}
          </div>
        </section>

        {/* 套餐 */}
        <section id="combos" className="scroll-mt-36 md:scroll-mt-44 pt-6">
          <GroupHeader kicker="Better Together" title={lang === 'zh' ? '套餐' : 'Combos'} />
          <div className="stitch mx-auto max-w-3xl rounded-2xl bg-secondary px-6 py-8">
            <p className="text-center font-heading text-xl font-bold text-primary">
              {lang === 'zh' ? '加購優惠' : lang === 'es' ? 'Agrega a tu plato' : 'Add to Any Main Dish'}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {comboItems.map((c) => (
                <div key={c.name.en} className="text-center">
                  <Image src={c.img} alt={c.name[lang]} width={360} height={360} className="mx-auto h-auto w-full max-w-[200px]" sizes="200px" />
                  <p className="mt-2 font-heading text-base font-semibold text-foreground">{c.name[lang]}</p>
                  <p className="font-heading text-base font-bold text-price">{c.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 注意事項 */}
        <section className="pt-14">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white/70 p-6 ring-1 ring-black/5">
            <h3 className="mb-3 font-heading text-lg font-bold text-primary">
              {lang === 'zh' ? '注意事項' : lang === 'es' ? 'Aviso' : 'Good to Know'}
            </h3>
            <ul className="space-y-2 font-body text-sm text-foreground/75">
              <li>{lang === 'zh' ? '如有食物過敏，請於點餐時告知我們。' : lang === 'es' ? 'Si tienes alguna alergia, por favor avísanos al pedir.' : 'Please let us know of any food allergies when ordering.'}</li>
              <li>{lang === 'zh' ? '供應時段：週一・二・三・五・六 11:00am–7:00pm（週四・日 公休）。' : 'Serving hours: Mon · Tue · Wed · Fri · Sat 11:00am–7:00pm (closed Thu · Sun).'}</li>
              <li>{lang === 'zh' ? '菜單內容與價格可能隨季節調整，以店內為準。' : 'Menu items and prices may vary by season; in-store menu prevails.'}</li>
            </ul>
          </div>
        </section>

        {/* 店鋪資訊 */}
        <section className="pt-12">
          <GroupHeader kicker="Find Us" title={lang === 'zh' ? '店鋪資訊' : 'Visit Us'} />
          <div className="mx-auto grid max-w-3xl gap-3 font-body text-foreground/80">
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />26 South St, Middletown, NY 10940
            </a>
            <a href="tel:+18453811002" className="flex items-center gap-3 hover:text-primary">
              <Phone className="h-5 w-5 shrink-0 text-primary" />(845) 381-1002
            </a>
            <p className="flex items-center gap-3">
              <Clock className="h-5 w-5 shrink-0 text-primary" />
              {lang === 'zh' ? '週一・二・三・五・六　11:00am – 7:00pm' : 'Mon · Tue · Wed · Fri · Sat　11:00am – 7:00pm'}
            </p>
          </div>
        </section>
      </div>

      {/* 固定底部點餐條（手機） */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-cream/95 px-4 py-3 backdrop-blur-md md:hidden">
        <OrderButton fullWidth side="top" className="py-2.5 text-sm" />
      </div>
    </div>
  )
}

function CardSection({ id, kicker, title, items, lang, name, subName, desc, fmt }: {
  id: string; kicker: string; title: string; items: MenuItemData[]; lang: Lang
  name: (i: MenuItemData) => string; subName: (i: MenuItemData) => string
  desc: (i: MenuItemData) => string | undefined; fmt: (p: string) => string
}) {
  return (
    <section id={id} className="scroll-mt-36 md:scroll-mt-44 pt-6">
      <GroupHeader kicker={kicker} title={title} />
      <div className="grid grid-cols-1 gap-x-12 border-t border-border md:grid-cols-2">
        {items.map((item, i) => (
          <DishCard key={i} name={name(item)} sub={subName(item)}
            desc={desc(item)} options={item.options} price={item.price ? fmt(item.price) : undefined}
            tags={(TAGS[item.nameZh] || []).map((k) => ({ label: T[k].label[lang], kind: T[k].kind }))} />
        ))}
      </div>
    </section>
  )
}

// 人氣、主廚推薦用紅色小字；成分標籤用灰色小字。不用實心膠囊，跟印刷菜單一樣安靜
function tagClass(kind: TagKind) {
  if (kind === 'diet') return 'font-body text-xs text-muted-foreground'
  return 'font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-brick'
}

function DishCard({ name, sub, desc, options, price, tags }: {
  name: string; sub?: string; desc?: string; options?: string; price?: string
  tags?: { label: string; kind: TagKind }[]
}) {
  const highlights = tags?.filter((t) => t.kind !== 'diet') ?? []
  const diet = tags?.filter((t) => t.kind === 'diet') ?? []
  return (
    <div className="border-b border-border py-5">
      {highlights.length > 0 && (
        <p className="mb-1 flex gap-3">
          {highlights.map((t) => <span key={t.label} className={tagClass(t.kind)}>{t.label}</span>)}
        </p>
      )}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-heading text-lg font-bold text-primary md:text-xl">{name}</h3>
        <div className="flex shrink-0 items-baseline gap-2">
          {options && <span className="font-body text-xs text-muted-foreground">{options}</span>}
          {price && <span className="whitespace-nowrap font-heading text-lg font-bold text-price">{price}</span>}
        </div>
      </div>
      {sub && <p className="font-heading text-sm text-foreground/70">{sub}</p>}
      {desc && <p className="mt-1.5 font-body text-sm leading-relaxed text-muted-foreground">{desc}</p>}
      {diet.length > 0 && <p className={`mt-2 ${tagClass('diet')}`}>{diet.map((t) => t.label).join(' · ')}</p>}
    </div>
  )
}

function GroupHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6 mt-2 flex flex-col items-center text-center">
      <p className="gingham-chip font-body text-[11px] uppercase tracking-[0.2em] text-brick">{kicker}</p>
      <h2 className="mt-1 font-heading text-2xl font-bold text-primary md:text-3xl">{title}</h2>
    </div>
  )
}

function DrinkCard({ title, items, name, subName, fmt }: {
  title: string; items: MenuItemData[]
  name: (i: MenuItemData) => string; subName: (i: MenuItemData) => string; fmt: (p: string) => string
}) {
  return (
    <div>
      <h3 className="gingham-chip mb-2 border-b border-primary/20 pb-2 font-heading text-lg font-bold text-primary">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <p className="font-heading text-base font-semibold text-foreground">{name(item)}</p>
              <p className="font-heading text-xs text-foreground/60">{subName(item)}</p>
            </div>
            <div className="flex shrink-0 items-baseline gap-2">
              {item.options && <span className="whitespace-nowrap font-body text-[11px] text-muted-foreground">{item.options}</span>}
              {item.price && <span className="whitespace-nowrap font-heading text-base font-bold text-price">{fmt(item.price)}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
