# ChainZ

A cryptocurrency market analysis platform built with **Next.js**, inspired by platforms like CoinMarketCap.

ChainZ aggregates cryptocurrency and exchange data from the **CoinMarketCap** and **CoinPaprika** APIs and presents it through a responsive, interactive interface.

The project is primarily a **portfolio and learning project** designed to demonstrate practical Next.js frontend development skills. It can also serve as a starting point for developers who want to build their own cryptocurrency market platform.

## Features

### Cryptocurrency

- Cryptocurrency ranking and market overview
- Individual cryptocurrency pages
- Detailed coin information
- Market and trading-pair information
- Best markets for trading a cryptocurrency
- Interactive charts and data visualization

### Exchanges

- Exchange listing and overview
- Individual exchange pages
- Exchange details and statistics
- Exchange asset and allocation information

### Data & UI

- Real-time cryptocurrency and exchange data through external APIs
- Client-side data fetching and caching
- Responsive design
- Interactive charts
- Loading states and skeleton components
- URL-based state for shareable pages and filters

## Tech Stack

- **Next.js** — React framework and application architecture
- **TypeScript** — Type-safe development
- **TanStack Query** — Server-state management, caching, and data fetching
- **Recharts** — Interactive charts and data visualization
- **Tailwind CSS** — Styling and responsive UI
- **CoinMarketCap API** — Cryptocurrency and exchange data
- **CoinPaprika API** — Cryptocurrency market data

## Why ChainZ?

ChainZ was built as a practical demonstration of modern frontend development with Next.js.

Rather than being a simple demo application, the project covers many of the concepts commonly required when building a real-world data-driven frontend, including:

- API integration
- Server-state management
- Data caching
- Pagination and infinite queries
- Dynamic routing
- URL state management
- TypeScript
- Responsive UI development
- Data visualization
- Loading and error states
- Component architecture
- Reusable hooks and utilities

The project can also be used as a **kickstart for developers who want to build something similar to a cryptocurrency market platform**.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/mainamirh/chainz.git
cd chainz
```

Install dependencies:

```bash
pnpm install
```

Create a `.env.local` file and add the required API keys:

```env
CMC_API_KEY=your_coinmarketcap_api_key
```

Start the development server:

```bash
pnpm dev
```

Then open `http://localhost:3000` in your browser.

## Future Improvements

ChainZ can be extended with additional functionality such as:

- Portfolio tracking
- Watchlists
- User accounts
- More advanced market analytics
- Additional chart types
- More cryptocurrency data providers
- Advanced filtering and sorting
- Historical market data
- More detailed exchange analytics

## Purpose

This project is publicly available as a **portfolio and learning project**.

The goal is to demonstrate how a modern Next.js application can be designed and implemented around a large amount of external, dynamic data while maintaining a reusable and scalable frontend architecture.

If you're learning Next.js and want to build a data-intensive application, ChainZ can also be used as a starting point for experimenting with similar ideas.
