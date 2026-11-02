'use client';

import { useLanguage } from '@/lib/i18n/language-context';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowLeft } from 'lucide-react';
import type { Product } from '@/types/product';
import { getProductName, getProductDescription, getProductHowToUse } from '@/types/product';
import { POSTERS } from '@/app/products/posters';

export default function ProductDetail({ product }: { product: Product }) {
  const { language } = useLanguage();

  const name = getProductName(product, language);
  const description = getProductDescription(product, language);
  const howToUse = getProductHowToUse(product, language);
  const poster = POSTERS[product.slug];

  const backLabel = language === 'zh' ? '返回商品' : language === 'es' ? 'Volver a productos' : 'Back to products';
  const home = language === 'zh' ? '首頁' : language === 'es' ? 'Inicio' : 'Home';
  const productsLabel = language === 'zh' ? '商品' : language === 'es' ? 'Productos' : 'Products';
  const inStoreNote =
    language === 'zh' ? '本商品於店內販售 · 歡迎到店選購'
      : language === 'es' ? 'Disponible en tienda · Ven a visitarnos'
        : 'Available in store · Come visit us';

  return (
    <div className="min-h-screen bg-cream pb-16 pt-24">
      <div className="mx-auto max-w-2xl px-6">
        {/* 麵包屑 */}
        <nav aria-label="Breadcrumb" className="mb-6 font-body text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="transition-colors hover:text-primary">{home}</Link></li>
            <li aria-hidden>·</li>
            <li><Link href="/products" className="transition-colors hover:text-primary">{productsLabel}</Link></li>
            <li aria-hidden>·</li>
            <li aria-current="page" className="truncate font-medium text-foreground">{name}</li>
          </ol>
        </nav>

        {/* 主圖 */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          {poster ? (
            <div className="relative aspect-[3/2] w-full bg-muted">
              <Image src={poster} alt={name} fill preload fetchPriority="high" className="object-contain" sizes="(max-width:768px) 100vw, 640px" />
            </div>
          ) : (
            // 沒有修過的海報時不放現場隨手拍的照片，改用格紋名稱卡
            <div className="gingham-cloth flex aspect-[3/2] w-full items-center justify-center p-8">
              <div className="stitch rounded-2xl bg-card px-8 py-6 text-center shadow-sm">
                <p className="font-heading text-2xl font-bold text-primary md:text-3xl">{product.name_zh}</p>
                <p className="mt-1 font-heading text-base text-foreground/70">{product.name_en}</p>
              </div>
            </div>
          )}
        </div>

        {/* 商品資訊 */}
        <div className="mt-6 space-y-4">
          {product.brand && (
            <p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-primary/70">{product.brand}</p>
          )}

          <div className="flex items-start justify-between gap-4">
            <h1 className="font-heading text-2xl font-bold leading-tight text-primary md:text-3xl">{name}</h1>
            {product.price != null && (
              <span className="shrink-0 font-body text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</span>
            )}
          </div>

          {product.origin && (
            <p className="flex items-center gap-1.5 font-body text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-primary/70" />{product.origin}
            </p>
          )}

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="whitespace-pre-line font-body leading-relaxed text-foreground/85">{description}</p>
          </div>

          {howToUse && (
            <div className="rounded-2xl bg-primary/[0.06] p-5 ring-1 ring-primary/10">
              <h2 className="mb-2 font-heading text-base font-bold text-primary">
                {language === 'zh' ? '🍵 食用方式' : language === 'es' ? '🍵 Modo de uso' : '🍵 How to Use'}
              </h2>
              <p className="whitespace-pre-line font-body leading-relaxed text-foreground/80">{howToUse}</p>
            </div>
          )}

          {/* 到店資訊 + 返回 */}
          <div className="border-t border-black/5 pt-6 text-center">
            <p className="font-body text-sm text-muted-foreground">{inStoreNote}</p>
            <p className="mt-1 font-body text-sm font-medium text-foreground">26 South St, Middletown, NY 10940</p>
            <Link
              href="/products"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <ArrowLeft className="h-4 w-4" />{backLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
