'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { ifoodImages } from '@/public/images/ifood/config';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { events } from '@/lib/gtag';
import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon/Icon';
import styles from './Navbar.module.css';

/* ---- Megamenu data ----
   Ícones SVG da biblioteca fixa (/public/icons). Box = cor do ícone com
   opacidade, mesmo padrão dos cards de Benefícios (chipStyle). */
type MegaItem = { icon: string; label: string; desc: string; iconColor?: string };
const ICON_COLOR = '#141414';

const megamenuColumns: { title: string; items: MegaItem[] }[] = [
  {
    title: 'Venda mais',
    items: [
      { icon: 'store-building-default', label: 'Comer fora', desc: 'Atraia clientes para o salão' },
      { icon: 'users-group-default', label: 'CRM 360', desc: 'Tenha visão completa dos clientes' },
      { icon: 'file-default', label: 'Cardápio digital', desc: 'Mais praticidade na escolha' },
    ],
  },
  {
    title: 'Controle central',
    items: [
      { icon: 'monitor', label: 'PDV', desc: 'Tenha visão completa do negócio' },
      { icon: 'barchart-default', label: 'Relatórios e Insights', desc: 'Esteja sempre um passo à frente' },
      { icon: 'grid-dashboard-bento', label: 'Gestão financeira', desc: 'Organize as finanças' },
    ],
  },
  {
    title: 'Eficiência operacional',
    items: [
      { icon: 'tablet', label: 'Totem', desc: 'Mais facilidade pros clientes' },
      { icon: 'check', label: 'Reservas', desc: 'Ofereça agendamento prévio' },
      { icon: 'burger-menu-three', label: 'Gestão de filas', desc: 'Organize o atendimento' },
    ],
  },
];

/** Box do ícone: fundo = cor com opacidade, ícone = cor cheia (igual Benefícios) */
function chipStyle(color = ICON_COLOR, opacity = 6): CSSProperties {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return { background: `rgba(${r},${g},${b},${opacity / 100})`, color };
}

type NavItem = { label: string; href?: string; hasDropdown?: boolean; external?: boolean };

const navItems: NavItem[] = [
  { label: 'iFood Delivery', hasDropdown: false, href: 'https://parceiros.ifood.com.br', external: true },
  { label: 'iFood Salão', hasDropdown: true },
  { label: 'iFood Pago', hasDropdown: false, href: '/ifood-pago', external: true },
  { label: 'iFood Ads', hasDropdown: false, href: 'https://institucional.ifood.com.br/ifood-ads/', external: true },
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

  /* "Glass/flutuante": fundo translúcido + card com margens. Vale tanto no
     scroll sticky quanto ao abrir o megamenu sobre o hero — em ambos os casos
     a navbar vira um card flutuante com as mesmas margens (topo + laterais). */
  const floating = isSticky || megaOpen;

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
        floating && !fullWidthFixed ? styles.navbarFloating : '',
        /* Slide-down SÓ quando a nav surge por scroll (sticky). Ao abrir o
           submenu estando no topo, ela não desliza — só ganha o fundo no
           lugar, parecendo o mesmo menu. */
        isSticky && !fullWidthFixed ? styles.navbarSlideIn : '',
        megaOpen ? styles.navbarMegaOpen : '',
      ].filter(Boolean).join(' ')}
      /* O backdrop-filter vem inline porque o Lightning CSS (build do Next)
         descarta a declaração quando escrita no CSS Module. Inline não passa
         pelo minificador → o blur "glass" funciona de fato. */
      style={
        floating && !fullWidthFixed
          ? {
              backdropFilter: 'blur(12px) saturate(180%)',
              WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            }
          : undefined
      }
    >
      {/* ── Top row ── */}
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
                    className={`${styles.navButton} ${floating ? styles.navButtonDark : ''}`}
                    onClick={() => events.navClick(item.label)}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className={[
                      styles.navButton,
                      floating ? styles.navButtonDark : '',
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

        <a
          href="https://portal.ifood.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.ctaButton} ${floating ? styles.ctaButtonDark : ''}`}
          onClick={() => events.navbarCta('Entrar no portal')}
        >
          Entrar no portal
        </a>
      </div>

      {/* ── Megamenu panel — expande a nav no mesmo lugar ── */}
      {megaOpen && activeDropdown === 'iFood Salão' && (
        <div className={styles.megapanel} role="dialog" aria-label="Menu iFood Salão">
          {/* Card promo */}
          <div className={styles.megaLeft}>
            <div className={styles.megaPhotoWrap}>
              <img src="/images/ifood/salao-megamenu-photo.png" alt="iFood Salão" className={styles.megaPhoto} loading="lazy" />
              <div className={styles.megaBadge}>
                <img src="/images/ifood/salao-badge.png" alt="iFood Salão" className={styles.megaBadgeImg} loading="lazy" />
              </div>
            </div>

            <div className={styles.megaLeftBody}>
              <div>
                <p className={styles.megaLeftTitle}>iFood Salão</p>
                <p className={styles.megaLeftDesc}>
                  Seus clientes do iFood agora podem{'\n'}viver a experiência presencial
                </p>
              </div>
              <Button variant="stroke" color="dark" content="text-icon" label="Falar com especialista" />
            </div>
          </div>

          {/* Colunas */}
          <div className={styles.megaCols}>
            {megamenuColumns.map((col) => (
              <div key={col.title} className={styles.megaCol}>
                <p className={styles.megaColTitle}>{col.title}</p>
                <div className={styles.megaColItems}>
                  {col.items.map((itm) => (
                    <button key={itm.label} className={styles.megaItem}>
                      <div className={styles.megaItemIcon} style={chipStyle(itm.iconColor)} aria-hidden="true">
                        <Icon name={itm.icon} size={20} />
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

  /* Portal quando flutuante (sticky OU megamenu aberto) ou full-width fixed —
     posição fixed precisa escapar de qualquer ancestral transformado. */
  if ((floating || fullWidthFixed) && mounted) {
    return createPortal(navContent, document.body);
  }

  return navContent;
}
