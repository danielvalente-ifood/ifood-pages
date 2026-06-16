'use client';

import { events } from '@/lib/gtag';
import styles from './Footer.module.css';

interface FooterLink {
  label: string;
  url: string;
}
interface FooterColumn {
  title: string;
  badge?: string | null;
  links: FooterLink[];
}
interface FooterSocial {
  platform: string;
  url: string;
  icon: string;
}
interface FooterData {
  logo: string;
  copyright: string;
  social_links: FooterSocial[];
  columns: FooterColumn[];
}

const defaultData: FooterData = {
  logo: '/images/ifood/logo_footer.svg',
  copyright:
    '© Copyright 2026 - iFood - Todos os direitos reservados iFood com Agência de Restaurantes Online S.A',
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
  data?: Partial<FooterData>;
}

export default function Footer({ data }: FooterProps) {
  // Merge com os defaults — um bloco recém-criado pode ter data={} (sem campos).
  const d: FooterData = {
    ...defaultData,
    ...(data ?? {}),
    columns: data?.columns ?? defaultData.columns,
    social_links: data?.social_links ?? defaultData.social_links,
  };

  return (
    <footer className={styles.footer}>

      <div className={styles.content}>
        {/* Colunas de links */}
        <div className={styles.columns}>
          {d.columns.map((col, i) => (
            <div key={i} className={styles.column}>
              <h3 className={styles.columnTitle}>
                <span>{col.title}</span>
                {col.badge && <span className={styles.badge}>{col.badge}</span>}
              </h3>
              <ul className={styles.linksList}>
                {col.links.map((link, li) => (
                  <li key={li}>
                    <a href={link.url} onClick={() => events.footerLinkClick(col.title, link.label)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Base: copyright + social, depois o logo */}
        <div className={styles.bottom}>
          <div className={styles.copyrightRow}>
            <p className={styles.copyright}>{d.copyright}</p>
            <div className={styles.social}>
              {d.social_links.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  aria-label={s.platform}
                  className={styles.socialIcon}
                  onClick={() => events.socialClick(s.platform)}
                >
                  <img src={s.icon} alt="" aria-hidden="true" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
          {d.logo && (
            <div className={styles.logo}>
              <img src={d.logo} alt="iFood" loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
