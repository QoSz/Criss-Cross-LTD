# Criss Cross Ltd Website

> Professional website for Kenya's trusted wholesale FMCG distributor

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.2-F69220)](https://pnpm.io/)

## 🏢 About Criss Cross Ltd

Criss Cross Ltd is Kenya's trusted wholesale FMCG (Fast Moving Consumer Goods) distributor, serving retailers, supermarkets, and businesses across Nairobi and Kenya-wide. We specialize in competitive wholesale pricing for:

- **Cooking Oil** - Various brands and sizes
- **Soaps & Detergents** - Household and commercial cleaning products  
- **Rice & Grains** - Bulk food staples
- **Sugar** - Wholesale sugar distribution
- **Beverages** - Water, juices, and soft drinks
- **Household Products** - Essential consumer goods

## 🌐 Website Overview

This website serves as the primary digital presence for Criss Cross Ltd, designed to:

- **Generate Leads**: Convert visitors into wholesale customers
- **Build Trust**: Establish credibility and reliability in FMCG distribution
- **Facilitate Communication**: Enable easy contact and inquiry processes
- **Market Education**: Inform potential customers about wholesale FMCG benefits

### 🎯 Target Audience
- **Primary**: Retailers, supermarkets, small-to-medium businesses
- **Secondary**: Restaurants, hotels, hospitality businesses
- **Geographic**: Nairobi-focused with Kenya-wide delivery

## 🚀 Technology Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better developer experience
- **[React 19](https://react.dev/)** - Latest React with enhanced performance

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible, headless component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Advanced animations

### Features & Integrations
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark/light theme support
- **[Leaflet](https://leafletjs.com/)** - Interactive maps for contact/delivery information
- **WhatsApp Integration** - Primary communication channel for Kenya market
- **SEO Optimization** - Comprehensive metadata and structured data

## 🛠️ Development Setup

### Prerequisites

```bash
# Required software
Node.js 18.x or higher
pnpm 9.15.2 or higher
Git for version control
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/criss-cross-website.git
   cd criss-cross-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📜 Available Scripts

```bash
# Development with Turbopack (faster builds)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Code linting
pnpm lint

# Type checking
pnpm type-check
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with navbar/footer
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── deliveries/        # Delivery information
│   ├── products/          # Product categories
│   └── thank-you/         # Form submission success
├── components/
│   ├── home/              # Homepage-specific components
│   ├── shared/            # Reusable components (Navbar, Footer, WhatsApp)
│   ├── structured-data/   # SEO schema components
│   └── ui/                # Radix UI component library
├── lib/
│   └── seo.ts             # SEO configuration and metadata
└── memory-bank/           # Project documentation
```

## 🎨 Design Principles

### Mobile-First Approach
- **Kenya Market Reality**: Optimized for smartphone users
- **3G Performance**: Target <3 seconds load time on slower connections
- **Progressive Enhancement**: Core functionality works without JavaScript

### Local Market Optimization
- **WhatsApp Integration**: Primary contact method preferred in Kenya
- **English (Kenya)**: Locale set to `en-KE`
- **Business Context**: Professional tone suitable for B2B wholesale customers
- **Trust Building**: Professional design reflecting business maturity

## 🔍 SEO Strategy

### Kenya-Specific Optimization
- **Local Keywords**: "wholesale FMCG Kenya", "wholesale distributor Nairobi"
- **Structured Data**: Organization and business schema markup
- **Meta Optimization**: Comprehensive metadata for each page
- **Performance**: Core Web Vitals optimization for search ranking

### Content Strategy
- **B2B Focus**: Wholesale benefits and competitive advantages
- **Reliability Emphasis**: Consistent delivery and stock availability
- **Geographic Coverage**: Nairobi-centered with Kenya-wide reach

## 🚀 Deployment

### Recommended Platforms
- **[Vercel](https://vercel.com/)** - Optimal for Next.js (recommended)
- **[Netlify](https://netlify.com/)** - Alternative static hosting
- **Custom Server** - For advanced server-side requirements

### Build Configuration
```bash
# Production build
pnpm build

# Static export (if needed)
pnpm build && pnpm export
```

## 📊 Performance Targets

### Technical Metrics
- **Page Load Speed**: <3 seconds on 3G connections
- **Lighthouse Score**: 90+ across all categories
- **Mobile Usability**: 100% mobile-friendly
- **Core Web Vitals**: Excellent scores

### Business Metrics
- **Contact Form Submissions**: Track wholesale inquiries
- **WhatsApp Conversions**: Click-through rates
- **Geographic Reach**: Visitor coverage across Kenya

## 🤝 Contributing

### Development Guidelines
1. **Mobile-First**: Always design for mobile devices first
2. **Performance**: Monitor bundle size and loading times
3. **Accessibility**: Use Radix UI components for accessibility
4. **SEO**: Include metadata for all new pages
5. **TypeScript**: Maintain strict type safety

### Code Standards
- **ESLint**: Automated code linting
- **Prettier**: Code formatting (configured)
- **TypeScript**: Strict mode enabled
- **Component Organization**: Clear separation of concerns

## 📞 Contact & Support

### Business Contact
- **Website**: [crisscross.co.ke](https://crisscross.co.ke)
- **WhatsApp**: Primary communication channel
- **Location**: Nairobi, Kenya

### Development Support
- **Documentation**: Check `memory-bank/` folder for comprehensive project docs
- **Issues**: Use GitHub issues for bug reports and feature requests
- **Wiki**: Additional documentation and guides

## 📄 License

This project is proprietary software owned by Criss Cross Ltd.

---

**Built with ❤️ for Kenya's wholesale FMCG market**
