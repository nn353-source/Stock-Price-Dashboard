const API_KEY = import.meta.env.VITE_AV_KEY;
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY;

const CACHE_DURATION = 1000 * 60 * 60;

const cache = {};
const inFlight = {};

const STOCKS = [
    "AAPL", "MSFT", "NVDA", "AMZN", "META",
    "GOOGL", "BRK.B", "JPM", "V", "MA",
    "WMT", "COST", "XOM", "CVX", "JNJ",
    "PG", "KO", "PEP", "HD", "MCD"
];

function toAlphaVantageSymbol(symbol) {
    return symbol === "BRK.B" ? "BRK-B" : symbol;
}

function toFinnhubSymbol(symbol) {
    return symbol;
}

function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function isValidTimeSeries(data) {
    const ts = data?.["Time Series (Daily)"];
    return ts && typeof ts === "object";
}

function saveToSession(symbol, timeSeries) {
    try {
        sessionStorage.setItem(
            `av_${symbol}`,
            JSON.stringify({
                timestamp: Date.now(),
                data: timeSeries
            })
        );
    } catch (err) {
        console.error(err);
    }
}

function loadFromSession(symbol) {
    try {
        const raw = sessionStorage.getItem(`av_${symbol}`);
        if (!raw) return null;

        const parsed = JSON.parse(raw);

        if (!parsed?.timestamp || Date.now() - parsed.timestamp > CACHE_DURATION) {
            sessionStorage.removeItem(`av_${symbol}`);
            return null;
        }

        return parsed.data;
    } catch {
        return null;
    }
}

function getCachedData(symbol) {
    const cached = cache[symbol];

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    delete cache[symbol];
    return null;
}

export async function isValidSymbol(symbol) {
    try {
        const res = await fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${toFinnhubSymbol(symbol)}&token=${FINNHUB_KEY}`
        );

        const data = await res.json();

        return !!data?.ticker || !!data?.name;
    } catch {
        return false;
    }
}

export async function getSymbolPrice(symbol) {
    try {
        const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${toFinnhubSymbol(symbol)}&token=${FINNHUB_KEY}`
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        if (!data || typeof data !== "object") return null;

        return data;
    } catch {
        return null;
    }
}

export async function getTopMovers(count = 5) {
    try {
        const quotes = await Promise.all(
            STOCKS.map(async symbol => {
                const data = await getSymbolPrice(symbol);

                return {
                    symbol,
                    percentChange: typeof data?.dp === "number" ? data.dp : null
                };
            })
        );

        return quotes
            .filter(s => typeof s.percentChange === "number")
            .sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange))
            .slice(0, count);
    } catch {
        return [];
    }
}

export async function getChartData(symbol, fromDate = null) {
    const memoryCache = getCachedData(symbol);

    if (memoryCache) {
        return buildChartData(symbol, memoryCache, fromDate);
    }

    const sessionCache = loadFromSession(symbol);

    if (sessionCache) {
        cache[symbol] = {
            timestamp: Date.now(),
            data: sessionCache
        };

        return buildChartData(symbol, sessionCache, fromDate);
    }

    if (!inFlight[symbol]) {
        const avSymbol = toAlphaVantageSymbol(symbol);

        inFlight[symbol] = fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${avSymbol}&outputsize=compact&apikey=${API_KEY}`
        )
            .then(r => r.json())
            .then(data => {
                if (!isValidTimeSeries(data)) {
                    throw new Error(
                        data?.Note ||
                        data?.Information ||
                        data?.message ||
                        data?.error ||
                        data?.["Error Message"] ||
                        "Invalid Alpha Vantage response"
                    );
                }

                const timeSeries = data["Time Series (Daily)"];

                cache[symbol] = {
                    timestamp: Date.now(),
                    data: timeSeries
                };

                saveToSession(symbol, timeSeries);

                return timeSeries;
            })
            .finally(() => {
                delete inFlight[symbol];
            });
    }

    try {
        const timeSeries = await inFlight[symbol];
        return buildChartData(symbol, timeSeries, fromDate);
    } catch {
        return { labels: [], datasets: [] };
    }
}

const BATCH_SIZE = 5;

export async function getChartDataForMovers(symbols, fromDate, onEach) {
    for (let i = 0; i < symbols.length; i += BATCH_SIZE) {
        const batch = symbols.slice(i, i + BATCH_SIZE);

        const results = await Promise.all(
            batch.map(symbol => getChartData(symbol, fromDate))
        );

        results.forEach((data, idx) => {
            onEach(batch[idx], data);
        });

        await delay(12500);
    }
}

function buildChartData(symbol, timeSeries, fromDate = null) {
    let entries = Object.entries(timeSeries);

    if (fromDate) {
        const filterDate = new Date(fromDate);
        entries = entries.filter(([d]) => new Date(d) >= filterDate);
    }

    entries.sort((a, b) => new Date(a[0]) - new Date(b[0]));

    if (!entries.length) return { labels: [], datasets: [] };

    const prices = entries
        .map(([, v]) => Number(v?.["4. close"]))
        .filter(v => !Number.isNaN(v));

    return {
        labels: entries.map(([d]) => d),
        datasets: [
            {
                label: `${symbol} Price`,
                data: prices,
                borderColor: "teal",
                tension: 0.25,
                fill: false
            }
        ]
    };
}