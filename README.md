# Stock Dash

A real-time stock market dashboard built with JavaScript. Track top gainers, search individual tickers, and monitor price movements — all in one place.

**Live demo:** [nehas-stock-price-dashboard.vercel.app](https://nehas-stock-price-dashboard.vercel.app)

---

## Features

- **Top Gainers** — Scans a curated list of symbols and surfaces the day's biggest movers by percent change in decreasing order
- **Stock Quotes** — Live price, daily high, daily low, and percent change powered by the Finnhub API
-  **Historic Data Plots** — Last 100 days of data powered by Alpha Vantage API
- **Stock Search** — Look up any stock symbol on demand
- **Clean UI** — Minimal, responsive interface built for quick at-a-glance reads

---

## Tech Stack

- **Frontend** — JavaScript, HTML, CSS
- **Data** — [Finnhub API](https://finnhub.io) [Alpha Vantage API](https://www.alphavantage.co/)
- **Hosting** — Vercel


---

## API Notes

The Finnhub free tier allows **60 requests/minute**. The top gainers feature scans a predefined watchlist and fires requests in parallel — keep the symbol list under ~50 to stay within the limit comfortably.
The Alpha Vantage free tier allows **5 requests/minute** and **25 requests/day**
---
