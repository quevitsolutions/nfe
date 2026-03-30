# AIPCORE: Web Application Interface

This directory contains the primary Next.js Frontend for the AIPCORE protocol. It manages user registration, dashboard views, and node matrix visualizations.

## 🛠 Features

- **Decentralized Authentication**: Built with RainbowKit for seamless wallet connectivity.
- **On-Chain Analytics**: Real-time stats visualization using Recharts.
- **Node Matrix Views**: High-fidelity node and layer propagation visualization.
- **Dynamic Rewards**: Algorithmic reward flow monitoring.

## 📁 Key Directories

- `src/app/`: Core routing and layouts (Next.js App Router).
- `src/components/`: Reusable UI components for dashboard and admin panels.
- `src/lib/`: Logic for contract interactions (ethers/viem) and utility functions.
- `public/`: Static assets and branding.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ 
- npm or pnpm

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 🎨 Branding & Theme

The application uses the **"Mint & Red"** theme as defined in `src/app/globals.css`.
- **Primary Color**: `#ed1b24` (AIP Red)
- **Background**: `#fcf3eb` (AIP Cream)
- **Secondary**: `#22c55e` (AIP Green)

## 🔧 Environment Configuration

Ensure you have a `.env.local` or `.env.production` file for local testing:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=85bbe9...
NEXT_PUBLIC_ENABLE_TESTNETS=false
NEXT_PUBLIC_DEFAULT_CHAIN=56
```

---
*Visit the root [README.md](file:///f:/GICLUB/README.md) for full project architecture.*

