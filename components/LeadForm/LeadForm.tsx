'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Icon } from '@/components/Icon/Icon';
import { Button } from '@/components/Button/Button';
import styles from './LeadForm.module.css';

export interface LeadFormBenefit {
  text: string;
}

export interface LeadFormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select';
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  options?: string[];
}

export interface LeadFormData {
  badge?: string;
  title: string;
  subtitle?: string;
  benefits?: LeadFormBenefit[];
  form_title: string;
  fields: LeadFormField[];
  submit_text: string;
  success_message?: string;
}

const defaultData: LeadFormData = {
  badge: 'Demonstração gratuita',
  title: 'Vamos agendar sua demonstração gratuita',
  subtitle: 'Contrate a solução para o seu restaurante que centraliza sua gestão, traz clareza no dia a dia.',
  benefits: [
    { text: 'Resposta em até 2 horas úteis' },
    { text: 'Demo personalizada para o seu segmento' },
    { text: 'Sem compromisso de contratação' },
    { text: 'Diagnóstico gratuito da sua operação atual' },
  ],
  form_title: 'Preencha seus dados',
  fields: [
    { id: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Seu nome', required: true },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'Seu email', required: true },
    { id: 'telefone', label: 'Telefone / Whatsapp', type: 'tel', placeholder: 'Número', required: true },
    { id: 'restaurante', label: 'Nome do restaurante', type: 'text', placeholder: 'Restaurante', required: true },
    { id: 'cnpj', label: 'CNPJ', type: 'text', placeholder: 'Somente números', required: false, fullWidth: true },
    {
      id: 'desafio',
      label: 'Maior desafio atual',
      type: 'select',
      required: true,
      fullWidth: true,
      options: ['Delivery caótico', 'Controle Financeiro / Estoque', 'Filas no Salão', 'Tudo junto'],
    },
  ],
  submit_text: 'Quero ver o sistema na prática',
  success_message: 'Recebemos! Nossa equipe entrará em contato em até 2 horas.',
};

function CircleCheck() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" stroke="#EE073A" strokeWidth="1.5" />
      <path d="M7.5 12.5l3 3 6-6" stroke="#EE073A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface LeadFormProps {
  data?: LeadFormData;
}

export default function LeadForm({ data }: LeadFormProps) {
  const d = data ?? defaultData;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const headers = d.fields.map((f) => f.label);
    const values = d.fields.map((f) => String(formData.get(f.id) ?? ''));

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headers,
          values,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Erro ao enviar');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      id="demo"
      aria-label={d.title}
      className={`${styles.section} scroll-reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className={styles.container}>
        {/* Coluna esquerda */}
        <div className={styles.left}>
          <div className={styles.textGroup}>
            {d.badge && <span className={styles.badge}>{d.badge}</span>}
            <h2 className={styles.title}>{d.title}</h2>
            {d.subtitle && <p className={styles.subtitle}>{d.subtitle}</p>}
          </div>

          {d.benefits && d.benefits.length > 0 && (
            <ul className={styles.benefitList} aria-label="Benefícios">
              {d.benefits.map((b, i) => (
                <li key={i} className={styles.benefitItem}>
                  <CircleCheck />
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Coluna direita — form card */}
        <div className={styles.formCard}>
          {!submitted && <h3 className={styles.formTitle}>{d.form_title}</h3>}

          {submitted ? (
            <div className={styles.success} role="alert" aria-live="assertive">
              <img
                src="/images/ifood/Check_3.svg"
                alt=""
                aria-hidden="true"
                className={styles.successIcon}
              />
              <p className={styles.successText}>
                {d.success_message ?? 'Mensagem enviada!'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className={styles.form} aria-label="Formulário de contato">
              <div className={styles.fieldGrid}>
                {d.fields.map((field) => (
                  <div
                    key={field.id}
                    className={`${styles.fieldGroup} ${field.fullWidth ? styles.fieldFull : ''}`}
                  >
                    <label htmlFor={field.id} className={styles.fieldLabel}>
                      {field.label}
                    </label>

                    {field.type === 'select' ? (
                      <div className={styles.selectWrapper}>
                        <select
                          id={field.id}
                          name={field.id}
                          required={field.required}
                          className={styles.fieldInput}
                          defaultValue=""
                          aria-required={field.required}
                        >
                          <option value="" disabled>Selecione</option>
                          {(field.options ?? []).map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <span className={styles.selectChevron} aria-hidden="true">
                          <Icon name="chevron-down" size={16} />
                        </span>
                      </div>
                    ) : (
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={styles.fieldInput}
                        aria-required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <p className={styles.errorMsg} role="alert" aria-live="assertive">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="fill"
                color="dark"
                content="text-icon"
                label={loading ? 'Enviando…' : d.submit_text}
                className={styles.submitFull}
                disabled={loading}
              />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
