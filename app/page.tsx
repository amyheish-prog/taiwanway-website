import type { Metadata } from 'next'
import { Hero } from "@/components/hero"

export const metadata: Metadata = {
  title: 'TaiwanWay | Beef Noodle Soup, Boba & Café · Middletown NY',
  description:
    'A Taiwanese café in Middletown, NY 10940 — beef noodle soup, braised pork rice, boba, and comforting flavors from home. Serving Orange County and the Hudson Valley.',
  keywords: [
    'Taiwanese restaurant near me',
    'Middletown NY Taiwanese food',
    'Middletown 10940 restaurants',
    'beef noodle soup Middletown NY',
    'boba Middletown NY',
    'beef noodle soup',
    'braised pork rice',
    'home-style Taiwanese cafe',
    'Orange County NY restaurant',
    'Hudson Valley Taiwanese',
    'boba near me',
    'pineapple cake Hudson Valley',
    '台灣味 紐約',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'TaiwanWay | Beef Noodle Soup, Boba & Café · Middletown NY',
    description: 'A home-style Taiwanese café in Middletown, NY 10940. Slow-braised beef noodle soup, classic braised pork rice, handcrafted boba, and freshly baked pineapple cakes. Made with care, served with warmth.',
    url: '/',
    type: 'website',
    images: ['/images/og-cover.jpg'],
  },
}
import { CategoryTiles } from "@/components/category-tiles"
import { PopularPicks } from "@/components/popular-picks"
import { BakeryFeature } from "@/components/bakery-feature"
import { Testimonials } from "@/components/testimonials"
import { VisitUs } from "@/components/visit-us"

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <CategoryTiles />
      <PopularPicks />
      <BakeryFeature />
      <Testimonials />
      <VisitUs />
    </main>
  )
}
