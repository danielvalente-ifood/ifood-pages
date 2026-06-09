'use client';

import { events } from '@/lib/gtag';
import styles from './Footer.module.css';

const defaultData = {
  logo: '/images/ifood/logo_footer.svg',
  copyright: '© Copyright 2026 - iFood - Todos os direitos reservados iFood com Agência de Restaurantes Online S.A',
  social_links: [
    { platform: 'facebook', url: '#', icon: '/images/ifood/logo-facebook.svg' },
    { platform: 'instagram', url: '#', icon: '/images/ifood/logo-instagram.svg' },
    { platform: 'linkedin', url: '#', icon: '/images/ifood/logo-linkedin.svg' },
  ],
  columns: [
    { title: 'iFood', badge: null, links: [{ label: 'Portal do Parceiro', url: '#' }, { label: 'Carreiras no iFood', url: '#' }, { label: 'Blog para Parceiros', url: '#' }] },
    { title: 'Saiba mais', badge: null, links: [{ label: 'Privacidade', url: '#' }, { label: 'Código de conduta', url: '#' }] },
    { title: 'Delivery', badge: null, links: [{ label: 'Plataforma', url: '#' }, { label: 'Central de crescimento', url: '#' }, { label: 'Logística', url: '#' }, { label: 'Gestão de pedidos', url: '#' }] },
    { title: 'Salão', badge: 'Novo', links: [{ label: 'Comer fora', url: '#' }, { label: 'PDV', url: '#' }, { label: 'CRM 360', url: '#' }, { label: 'Relatórios e Insights', url: '#' }, { label: 'Gestão financeira', url: '#' }] },
    { title: 'iFood Ads', badge: null, links: [{ label: 'Plataforma de anúncios', url: '#' }, { label: 'Campanhas premium', url: '#' }, { label: 'Analytics para marcas', url: '#' }] },
    { title: 'iFood Pago', badge: null, links: [{ label: 'Conta digital', url: '#' }, { label: 'Antecipação', url: '#' }, { label: 'Crédito', url: '#' }] },
  ],
};

interface FooterProps {
  data?: typeof defaultData;
}

export default function Footer({ data }: FooterProps) {
  const d = data ?? defaultData;
  return (
    <footer className={styles.footer}>
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Links Sections */}
        <div className={styles.columnsWrapper}>
          {d.columns.map((col, i) => (
            <div key={i} className={styles.column}>
              <h3 className={styles.columnTitle}>
                {col.title}
                {col.badge && <span className={styles.newBadge}>{col.badge}</span>}
              </h3>
              <ul className={styles.linksList}>
                {col.links.map((link, li) => (
                  <li key={li}><a href={link.url} onClick={() => events.footerLinkClick(col.title, link.label)}>{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Copyright & Social */}
        <div className={styles.bottomSection}>
          <div className={styles.copyrightSection}>
            <p className={styles.copyright}>{d.copyright}</p>
            <div className={styles.socialLinks}>
              {d.social_links.map((social, i) => (
                <a key={i} href={social.url} aria-label={social.platform} className={styles.socialIcon} onClick={() => events.socialClick(social.platform)}>
                  <img src={social.icon} alt="" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className={styles.logoWrapper}>
            <img src={d.logo} alt="iFood" />
          </div>
        </div>
      </div>
    </footer>
  );
}
