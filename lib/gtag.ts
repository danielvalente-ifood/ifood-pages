export const GA_ID = 'G-J3NZYQ88QQ';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function trackEvent(action: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}

// Pre-defined events
export const events = {
  // CTA clicks
  heroCta: (label: string) => trackEvent('cta_click', { cta_location: 'hero', cta_text: label }),
  navbarCta: (label: string) => trackEvent('cta_click', { cta_location: 'navbar', cta_text: label }),
  salaoCta: () => trackEvent('cta_click', { cta_location: 'salao_menu', cta_text: 'Falar com especialista' }),

  // Navigation
  navClick: (label: string) => trackEvent('nav_click', { nav_item: label }),
  footerLinkClick: (column: string, label: string) => trackEvent('footer_link_click', { footer_column: column, link_text: label }),
  socialClick: (platform: string) => trackEvent('social_click', { platform }),

  // Dropdowns / Accordion
  salaoDropdownToggle: (open: boolean) => trackEvent('dropdown_toggle', { dropdown: 'salao', action: open ? 'open' : 'close' }),
  faqToggle: (question: string, open: boolean) => trackEvent('faq_toggle', { question, action: open ? 'open' : 'close' }),

  // Tabs
  growthTabSwitch: (tab: string) => trackEvent('tab_switch', { section: 'growth', tab }),

  // Scroll depth - section visibility
  sectionView: (section: string) => trackEvent('section_view', { section }),
};
