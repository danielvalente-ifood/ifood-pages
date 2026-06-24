import LeadForm from '@/components/LeadForm/LeadForm';
import type { RegistryEntry } from './types';

const entry: RegistryEntry = {
  type: 'leadform',
  label: 'Formulário de Lead',
  category: 'Conteúdo',
  component: LeadForm,
  defaults: {
    badge: 'Demonstração gratuita',
    title: 'Vamos agendar sua demonstração gratuita',
    subtitle: 'Contrate a solução para o seu restaurante que centraliza sua gestão.',
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
      { id: 'desafio', label: 'Maior desafio atual', type: 'select', required: true, fullWidth: true, options: ['Delivery caótico', 'Controle Financeiro / Estoque', 'Filas no Salão', 'Tudo junto'] },
    ],
    submit_text: 'Quero ver o sistema na prática',
    success_message: 'Recebemos! Nossa equipe entrará em contato em até 2 horas.',
  },
  variants: [
    {
      id: 'default',
      label: 'Ilha escura',
      description: 'Container #141414, coluna de benefícios + card branco do formulário.',
      config: {},
    },
  ],
  schema: [
    { key: 'badge', label: 'Badge', type: 'text' },
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
    { key: 'benefits', label: 'Benefícios', type: 'list' },
    { key: 'form_title', label: 'Título do formulário', type: 'text' },
    { key: 'submit_text', label: 'Texto do botão', type: 'text' },
  ],
};

export default entry;
