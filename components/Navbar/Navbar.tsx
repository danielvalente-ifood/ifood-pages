'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { ifoodImages } from '@/public/images/ifood/config';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { events } from '@/lib/gtag';
import { Button } from '@/components/Button/Button';
import styles from './Navbar.module.css';

/* ---- Megamenu data ---- */
const megamenuColumns = [
  {
    title: 'Venda mais',
    items: [
      { icon: '', label: 'Comer fora', desc: 'Atraia clientes para o salão', iconColor: '#eb0033' },
      { icon: '', label: 'CRM 360', desc: 'Tenha visão completa dos clientes', iconColor: '#7b61ff' },
      { icon: '', label: 'Cardápio digital', desc: 'Mais praticidade na escolha', iconColor: '#ff9500' },
    ],
  },
  {
    title: 'Controle central',
    items: [
      { icon: '', label: 'PDV', desc: 'Tenha visão completa do negócio', iconColor: '#5856D6' },
      { icon: '', label: 'Relatórios e Insights', desc: 'Esteja sempre um passo à frente', iconColor: '#007AFF' },
      { icon: '', label: 'Gestão financeira', desc: 'Organize as finanças', iconColor: '#34C759' },
    ],
  },
  {
    title: 'Eficiência operacional',
    items: [
      { icon: '', label: 'Totem', desc: 'Mais facilidade pros clientes', iconColor: '#FF9F0A' },
      { icon: '', label: 'Reservas', desc: 'Ofereça agendamento prévio', iconColor: '#5AC8FA' },
      { icon: '', label: 'Gestão de filas', desc: 'Organize o atendimento', iconColor: '#30D158' },
    ],
  },
];

type NavItem = {
  label: string;
  href?: string;
  hasDropdown?: boolean;
};

const navItems: NavItem[] = [
  { label: 'iFood Ecossistema', hasDropdown: false, href: '/delivery' },
  { label: 'iFood Salão', hasDropdown: true },
  { label: 'iFood Pago', hasDropdown: false, href: '/ifood-pago' },
  { label: 'iFood Logística', hasDropdown: false, href: '/logistica' },
  { label: 'iFood Ads', hasDropdown: false, href: '/ads' },
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
  const megaOpen = !!activeDropdown;
  const isGlass = isSticky || megaOpen;

  useEffect(() => { setMounted(true); }, []);

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
      className={[
        styles.navbar,
        fullWidthFixed ? styles.navbarFullWidthFixed : '',
        isGlass && !fullWidthFixed ? styles.navbarGlass : '',
        megaOpen ? styles.navbarMegaOpen : '',
      ].filter(Boolean).join(' ')}
    >
      {/* ── Top row: logo + links + CTA ── */}
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logoLink} aria-label="iFood — página inicial">
            <div className={styles.logo}>
              <Image src={ifoodImages.logo.src} alt={ifoodImages.logo.alt} width={55} height={30} />
            </div>
          </Link>

          <ul className={styles.navItems} role="list">
            {navItems.map((item) => (
              <li key={item.label} className={styles.navItemWrapper}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${styles.navButton} ${isGlass ? styles.navButtonDark : ''}`}
                    onClick={() => events.navClick(item.label)}
                  >
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className={[
                      styles.navButton,
                      isGlass ? styles.navButtonDark : '',
                      activeDropdown === item.label ? styles.navButtonActive : '',
                    ].filter(Boolean).join(' ')}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup={item.hasDropdown ? 'true' : undefined}
                    onClick={() => item.hasDropdown && handleDropdownToggle(item.label)}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <svg
                        className={`${styles.chevron} ${activeDropdown === item.label ? styles.chevronOpen : ''}`}
                        width="12" height="12" viewBox="0 0 12 12" fill="none"
                        aria-hidden="true" focusable="false"
                      >
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          className={`${styles.ctaButton} ${isGlass ? styles.ctaButtonDark : ''}`}
          onClick={() => events.navbarCta('Entrar no portal')}
        >
          Entrar no portal
        </button>
      </div>

      {/* ── Megamenu panel (inline, expands the nav) ── */}
      {megaOpen && activeDropdown === 'iFood Salão' && (
        <div className={styles.megapanel} role="dialog" aria-label="Menu iFood Salão">
          {/* Left card */}
          <div className={styles.megaLeft}>
            <div className={styles.megaPhotoWrap}>
              <img
                src="/images/ifood/salao-megamenu-photo.png"
                alt="iFood Salão"
                className={styles.megaPhoto}
              />
              <div className={styles.megaBadge}>
                <img
                  src="/images/ifood/salao-badge.png"
                  alt="iFood Salão"
                  className={styles.megaBadgeImg}
                />
              </div>
            </div>

            <div className={styles.megaLeftBody}>
              <div>
                <p className={styles.megaLeftTitle}>iFood Salão</p>
                <p className={styles.megaLeftDesc}>
                  Seus clientes do iFood agora podem{'\n'}viver a experiência presencial
                </p>
              </div>
              <Button
                variant="stroke"
                color="dark"
                content="text-icon"
                label="Falar com especialista"
              />
            </div>
          </div>

          {/* Right columns */}
          <div className={styles.megaCols}>
            {megamenuColumns.map((col) => (
              <div key={col.title} className={styles.megaCol}>
                <p className={styles.megaColTitle}>{col.title}</p>
                <div className={styles.megaColItems}>
                  {col.items.map((itm) => (
                    <button
                      key={itm.label}
                      className={styles.megaItem}
                      style={{ '--icon-color': itm.iconColor } as React.CSSProperties}
                    >
                      <div className={styles.megaItemIcon}>
                        <span className={styles.megaItemGlyph}>{itm.icon}</span>
                      </div>
                      <div className={styles.megaItemText}>
                        <span className={styles.megaItemLabel}>{itm.label}</span>
                        <span className={styles.megaItemDesc}>{itm.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  if ((isGlass || fullWidthFixed) && mounted) {
    return createPortal(navContent, document.body);
  }

  return navContent;
}
