# 💍 Wedding Gift Website

Website one-page interativo para casamento com **apresentação do casal**, **galeria de fotos**, **história**, **lista de presentes**, **carrinho** e **checkout integrado com PIX e cartão**.

O projeto combina características de **landing page de alta conversão** com **funcionalidades completas de e-commerce**, tudo em uma única experiência fluida para o convidado.

---

## 🎯 Objetivo do Projeto

Criar uma experiência premium para convidados:

- Conhecer a história do casal
- Visualizar fotos e momentos
- Escolher presentes
- Finalizar pagamento sem sair do site
- Processo rápido e intuitivo

---

## 🚀 Tecnologias

### Frontend

- Next.js 16 (App Router)
- React Server Components
- Server Actions
- Tailwind CSS v4 (CSS-first)
- Zustand (estado global do carrinho)
- React Hook Form

---

### Backend

- Supabase
  - PostgreSQL
  - Auth (opcional)
  - Storage (galeria de fotos)
  - Row Level Security (RLS)

---

### Pagamentos

Arquitetura modular preparada para:

- Mercado Pago (PIX + Cartão)
- Stripe
- Asaas / Pagar.me

---

### Infraestrutura

- Vercel (Deploy)
- Supabase Cloud

---

## 🧱 Arquitetura

O site utiliza uma **estrutura single page por casamento**, combinando:

- Server Side Rendering (SEO)
- Client Side Interactions (Carrinho e Checkout)
- Fetch incremental para paginação de presentes

---

## 📂 Estrutura do Projeto
```
src/
├── app/
│ ├── layout.tsx
│ ├── globals.css
│ │
│ └── [slug]/
│ ├── layout.tsx
│ └── page.tsx
│
├── components/
│ ├── sections/
│ │ ├── HeroSection.tsx
│ │ ├── OurStorySection.tsx
│ │ ├── MomentsGallery.tsx
│ │ └── GiftListSection.tsx
│ │
│ ├── cart/
│ │ └── CartDrawer.tsx
│ │
│ └── checkout/
│ └── CheckoutModal.tsx
│
├── lib/
│ ├── supabase.ts
│ ├── payments/
│ │ ├── provider.interface.ts
│ │ └── mercadopago.ts
│ │
│ └── db.ts
│
└── store/
└── cart-store.ts
```

> ✅ **Single Page Transactional Website**  
> ✅ **One Page Checkout Experience**  
> ✅ **E-commerce embedded experience**
