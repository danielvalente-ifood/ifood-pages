'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { ifoodImages } from '@/public/images/ifood/config';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { events } from '@/lib/gtag';
import styles from './Navbar.module.css';

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
  const scrollY = useScrollPosition();
  const isSticky = fullWidthFixed || forceSticky || scrollY > 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDropdownToggle = (label: string) => {
    const willOpen = activeDropdown !== label;
    setActiveDropdown(willOpen ? label : null);
    events.salaoDropdownToggle(willOpen);
  };

  const navContent = (
    <nav
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

                {/* Dropdown Placeholder */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className={styles.dropdown} role="menu">
                    <p className={styles.dropdownPlaceholder}>
                      Submenu para {item.label}
                    </p>
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
