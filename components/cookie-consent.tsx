'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import {
  getCookieConsent,
  setCookieConsent,
  acceptAllCookies,
  acceptNecessaryOnly
} from '@/lib/cookies'

const translations = {
  zh: {
    short: '我們用 Cookie 了解網站的使用狀況，讓網站更好用。',
    acceptAll: '全部接受',
    necessaryOnly: '僅必要',
    manage: '管理 Cookies',
    settingsTitle: '隱私權偏好設定',
    confirm: '確認選擇',
    necessary: '必要的 Cookie',
    necessaryDesc: '網站運行離不開這些 Cookie 且您不能在系統中將其關閉。通常僅根據您所做出的操作來設置這些 Cookie，如設置隱私偏好、登錄或填充表格。',
    analytics: '分析 Cookie',
    analyticsDesc: '幫助我們了解訪客如何使用網站，以便改善用戶體驗。',
    marketing: '行銷 Cookie',
    marketingDesc: '用於追蹤訪客以顯示相關廣告和行銷活動。',
    preferences: '偏好 Cookie',
    preferencesDesc: '記住您的偏好設定，如語言選擇。',
    alwaysOn: '一律啟用',
    privacyPolicy: '查看隱私權政策',
    title: 'Cookie 設定',
  },
  en: {
    short: 'We use cookies to understand how the site is used and make it better.',
    acceptAll: 'Accept All',
    necessaryOnly: 'Necessary Only',
    manage: 'Manage Cookies',
    settingsTitle: 'Privacy Preference Center',
    confirm: 'Confirm Selection',
    necessary: 'Necessary Cookies',
    necessaryDesc: 'These cookies are essential for the website to function properly. They are usually set in response to actions made by you, such as setting privacy preferences, logging in, or filling in forms.',
    analytics: 'Analytics Cookies',
    analyticsDesc: 'Help us understand how visitors use the website to improve user experience.',
    marketing: 'Marketing Cookies',
    marketingDesc: 'Used to track visitors to display relevant ads and marketing campaigns.',
    preferences: 'Preference Cookies',
    preferencesDesc: 'Remember your preferences such as language selection.',
    alwaysOn: 'Always On',
    privacyPolicy: 'View Privacy Policy',
    title: 'Cookie Settings',
  },
  es: {
    short: 'Usamos cookies para entender cómo se usa el sitio y mejorarlo.',
    acceptAll: 'Aceptar Todo',
    necessaryOnly: 'Solo necesarias',
    manage: 'Gestionar Cookies',
    settingsTitle: 'Centro de Preferencias de Privacidad',
    confirm: 'Confirmar Selección',
    necessary: 'Cookies Necesarias',
    necessaryDesc: 'Estas cookies son esenciales para el funcionamiento del sitio web. No se pueden desactivar en nuestros sistemas.',
    analytics: 'Cookies de Análisis',
    analyticsDesc: 'Nos ayudan a entender cómo los visitantes usan el sitio web para mejorar la experiencia.',
    marketing: 'Cookies de Marketing',
    marketingDesc: 'Se utilizan para rastrear visitantes y mostrar anuncios y campañas relevantes.',
    preferences: 'Cookies de Preferencias',
    preferencesDesc: 'Recuerdan sus preferencias como la selección de idioma.',
    alwaysOn: 'Siempre Activo',
    privacyPolicy: 'Ver Política de Privacidad',
    title: 'Configuración de Cookies',
  }
}

/* 自訂 toggle 開關 */
function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      } ${checked ? 'bg-primary' : 'bg-foreground/20'}`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export function CookieConsentBanner() {
  const { language } = useLanguage()
  const t = translations[language]

  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    preferences: true
  })

  useEffect(() => {
    const consent = getCookieConsent()
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    acceptAllCookies()
    setIsVisible(false)
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
      detail: { analytics: true, marketing: true, preferences: true }
    }))
  }

  const handleNecessaryOnly = () => {
    acceptNecessaryOnly()
    setIsVisible(false)
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
      detail: { analytics: false, marketing: false, preferences: false }
    }))
  }

  const handleConfirm = () => {
    setCookieConsent(preferences)
    setIsVisible(false)
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
      detail: preferences
    }))
  }

  if (!isVisible) return null

  const rows = [
    { label: t.necessary, desc: t.necessaryDesc, checked: true, onChange: undefined, alwaysOn: true },
    { label: t.analytics, desc: t.analyticsDesc, checked: preferences.analytics, onChange: (v: boolean) => setPreferences(p => ({ ...p, analytics: v })) },
    { label: t.marketing, desc: t.marketingDesc, checked: preferences.marketing, onChange: (v: boolean) => setPreferences(p => ({ ...p, marketing: v })) },
    { label: t.preferences, desc: t.preferencesDesc, checked: preferences.preferences, onChange: (v: boolean) => setPreferences(p => ({ ...p, preferences: v })) },
  ]

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="fixed inset-x-0 bottom-0 z-50 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[380px]"
    >
      <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-card p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] sm:rounded-2xl sm:border">
        <h2 className="font-heading text-base font-bold text-primary">{showDetails ? t.settingsTitle : t.title}</h2>
        <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">{t.short}</p>

        {showDetails && (
          <div className="mt-4 space-y-3 border-t border-border pt-4">
            {rows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm font-medium text-foreground">{row.label}</span>
                    {row.alwaysOn && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 font-body text-[11px] text-primary">{t.alwaysOn}</span>
                    )}
                  </div>
                  <p className="mt-0.5 font-body text-xs leading-relaxed text-muted-foreground">{row.desc}</p>
                </div>
                <Toggle checked={row.checked} onChange={row.onChange} disabled={row.alwaysOn} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mr-auto flex cursor-pointer items-center gap-1 font-body text-sm text-primary underline-offset-4 hover:underline"
          >
            {t.manage}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} />
          </button>
          {showDetails ? (
            <button
              onClick={handleConfirm}
              className="cursor-pointer rounded-full border border-primary px-4 py-2 font-body text-sm font-medium text-primary transition-colors hover:bg-secondary"
            >
              {t.confirm}
            </button>
          ) : (
            <button
              onClick={handleNecessaryOnly}
              className="cursor-pointer rounded-full border border-primary px-4 py-2 font-body text-sm font-medium text-primary transition-colors hover:bg-secondary"
            >
              {t.necessaryOnly}
            </button>
          )}
          <button
            onClick={handleAcceptAll}
            className="cursor-pointer rounded-full bg-primary px-4 py-2 font-body text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.acceptAll}
          </button>
        </div>
      </div>
    </div>
  )
}
