'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { ifoodImages } from '@/public/images/ifood/config';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { events } from '@/lib/gtag';
import styles from './Navbar.module.css';

/* ---- Megamenu data ---- */
const megamenuColumns = [
  {
    title: 'Venda mais',
    items: [
      { icon: '', label: 'Comer fora', desc: 'Atraia clientes para o salão' },
      { icon: '', label: 'CRM 360', desc: 'Tenha visão completa dos clientes' },
      { icon: '', label: 'Cardápio digital', desc: 'Mais praticidade na escolha' },
    ],
  },
  {
    title: 'Controle central',
    items: [
      { icon: '', label: 'PDV', desc: 'Tenha visão completa do negócio' },
      { icon: '', label: 'Relatórios e Insights', desc: 'Esteja sempre um passo à frente' },
      { icon: '', label: 'Gestão financeira', desc: 'Organize as finanças' },
    ],
  },
  {
    title: 'Eficiência operacional',
    items: [
      { icon: '', label: 'Totem', desc: 'Mais facilidade pros clientes' },
      { icon: '', label: 'Reservas', desc: 'Ofereça agendamento prévio' },
      { icon: '', label: 'Gestão de filas', desc: 'Organize o atendimento' },
      { icon: '', label: 'Integração de pagamentos', desc: 'Organize o atendimento' },
    ],
  },
];

type NavItem = {
  label: string;
  href?: string;
  hasDropdown?: boolean;
};

const navItems: NavItem[] = [
  { label: 'Delivery', hasDropdown: false, href: '/delivery' },
  { label: 'Salão', hasDropdown: true },
  { label: 'iFood Pago', hasDropdown: false, href: '/ifood-pago' },
  { label: 'Logística', hasDropdown: false, href: '/logistica' },
  { label: 'Ads', hasDropdown: false, href: '/ads' },
];

interface NavbarProps {
  forceSticky?: boolean;
  fullWidthFixed?: boolean;
}

export default function Navbar({ forceSticky = false, fullWidthFixed = false }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const scrollY = useScrollPosition();
  const isSticky = fullWidthFixed || forceSticky || scrollY > 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Close megamenu on outside click */
  useEffect(() => {
    if (!activeDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activeDropdown]);

  const handleDropdownToggle = (label: string) => {
    const willOpen = activeDropdown !== label;
    setActiveDropdown(willOpen ? label : null);
    events.salaoDropdownToggle(willOpen);
  };

  const navContent = (
    <nav
      ref={navRef}
      aria-label="Navegação principal"
      className={`${styles.navbar} ${fullWidthFixed ? styles.navbarFullWidthFixed : ''} ${isSticky && !fullWidthFixed ? styles.navbarSticky : ''}`}
    >
      <div className={styles.container}>
        {/* Left Section - Logo + Navigation Items */}
        <div className={styles.leftSection}>
          {/* Logo */}
          <Link href="/" className={styles.logoLink} aria-label="iFood — página inicial">
            <div className={styles.logo}>
              <Image
                src={ifoodImages.logo.src}
                alt={ifoodImages.logo.alt}
                width={55}
                height={30}
              />
            </div>
          </Link>

          {/* Navigation Items */}
          <ul className={styles.navItems} role="list">
            {navItems.map((item) => (
              <li key={item.label} className={styles.navItemWrapper}>
                {item.href ? (
                  <Link href={item.href} className={styles.navButton} onClick={() => events.navClick(item.label)}>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className={styles.navButton}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup={item.hasDropdown ? 'true' : undefined}
                    aria-label={item.hasDropdown ? `${item.label} — abrir submenu` : item.label}
                    onClick={() => item.hasDropdown && handleDropdownToggle(item.label)}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <svg
                        className={`${styles.chevron} ${activeDropdown === item.label ? styles.chevronOpen : ''}`}
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Megamenu — Salão */}
                {item.hasDropdown && item.label === 'Salão' && activeDropdown === 'Salão' && (
                  <div className={styles.megamenu} role="dialog" aria-label="Menu iFood Salão">
                    <div className={styles.megamenuInner}>
                      {/* Left card — promo */}
                      <div className={styles.megaPromoCard}>
                        <div className={styles.megaPromoImage}>
                          <div className={styles.megaLogoBadge}>
                            <span className={styles.megaLogoText}>iFood</span>
                            <span className={styles.megaLogoSub}>Salão</span>
                          </div>
                        </div>
                        <div className={styles.megaPromoBody}>
                          <div>
                            <p className={styles.megaPromoTitle}>iFood Salão</p>
                            <p className={styles.megaPromoDesc}>Seus clientes do iFood agora podem viver a experiência presencial</p>
                          </div>
                          <button className={styles.megaPromoBtn}>Falar com especialista</button>
                        </div>
                      </div>

                      {/* Right columns */}
                      <div className={styles.megaColumns}>
                        {megamenuColumns.map((col) => (
                          <div key={col.title} className={styles.megaColumn}>
                            <p className={styles.megaColumnTitle}>{col.title}</p>
                            <div className={styles.megaColumnItems}>
                              {col.items.map((item) => (
                                <button key={item.label} className={styles.megaItem}>
                                  <div className={styles.megaItemIcon}>
                                    <span className={styles.megaItemIconGlyph}>{item.icon}</span>
                                  </div>
                                  <div className={styles.megaItemText}>
                                    <span className={styles.megaItemLabel}>{item.label}</span>
                                    <span className={styles.megaItemDesc}>{item.desc}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button className={styles.ctaButton} onClick={() => events.navbarCta('Entrar no portal')}>
          Entrar no portal
        </button>
      </div>
    </nav>
  );

  if ((isSticky || fullWidthFixed) && mounted) {
    return createPortal(navContent, document.body);
  }

  return navContent;
}
