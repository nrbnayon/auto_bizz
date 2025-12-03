# Sales Analytics Dashboard

A modern, real-time sales analytics dashboard with beautiful glassmorphism UI and smart data caching.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![React Query](https://img.shields.io/badge/React%20Query-Latest-ff4154)

## ✨ Features

- **Real-Time Filters** - Date range, price, email, and phone filters
- **Interactive Chart** - Beautiful sales trend visualization with gradients
- **Sortable Table** - Click to sort by date or price
- **Smart Pagination** - Navigate through 50 items per page
- **Auto Token Refresh** - Never lose connection (refreshes before expiration)
- **Intelligent Caching** - Fast loading with React Query
- **Mobile Responsive** - Works perfectly on all devices

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **React Query** - Data fetching & caching
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Radix UI** - Accessible components

## 📱 UI Features

- Glassmorphism design with frosted glass effects
- Vibrant gradient backgrounds
- Smooth animations and transitions
- Dark mode optimized
- Skeleton loading states

## 🌐 Deployment

Deploy easily to **Vercel**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or use:
```bash
npm run build
```

## 📄 API

This dashboard uses the AutoBizz Sales Analytics API:
- **Authorization**: `POST /getAuthorize`
- **Sales Data**: `GET /sales`

Token auto-refreshes every 2 hours automatically.

## 📝 License

MIT
