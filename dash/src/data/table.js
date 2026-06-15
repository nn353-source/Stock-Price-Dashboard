const API_KEY = import.meta.env.VITE_AV_KEY;
const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY;
const cache = {};
const inFlight = {};

const STOCKS = [
  "AAPL",
  "MSFT",
  "NVDA",
  "AMZN",
  "META",
  "GOOGL",
  "BRK.B",
  "JPM",
  "V",
  "MA",

  "WMT",
  "COST",
  "XOM",
  "CVX",
  "JNJ",
  "PG",
  "KO",
  "PEP",
  "HD",
  "MCD"
];

export async function isValidSymbol(symbol) {
    const response = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_KEY}`
    );

    const data = await response.json();

    return !!data.ticker;
}

export async function getTopMovers(count = 5) {
    try {
        const quotes = await Promise.all(
            STOCKS.map(async (symbol) => {
                const data = await getSymbolPrice(symbol);

                

                return {
                    symbol,
                    percentChange: data?.dp,
                };
            })
        );

        return quotes
            .filter(stock => stock.percentChange != null)
            .sort(
                (a, b) =>
                    Math.abs(b.percentChange) -
                    Math.abs(a.percentChange)
            )
            .slice(0, count);

    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getSymbolPrice(symbol) {
    try {
        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
        );
        return await response.json();
    } catch (err) {
        console.error(err);
        return "Incorrect Symbol"
    }
}

export async function getTopGainers() {
    const response = await fetch(
        `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`
    );

    const data = await response.json();

    return data.top_gainers.slice(0, 5);
}

export async function getChartData(symbol, fromDate) {
    if (cache[symbol]) {
        return buildChartData(symbol, cache[symbol], fromDate);
    }

    if (inFlight[symbol]) {
        const timeSeries = await inFlight[symbol];
        return buildChartData(symbol, timeSeries, fromDate);
    }

    inFlight[symbol] = fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`
    )
        .then(r => r.json())
        .then(data => {
            const timeSeries = data["Time Series (Daily)"];
            if (!timeSeries) throw new Error("No data returned");
            cache[symbol] = timeSeries;
            delete inFlight[symbol];
            return timeSeries;
        });

    try {
        const timeSeries = await inFlight[symbol];
        return buildChartData(symbol, timeSeries, fromDate);
    } catch (err) {
        console.error(err);
        delete inFlight[symbol];
        return "Sorry, Alpha Vantage is not sending data at this time.";
        
    }
}

function buildChartData(symbol, timeSeries, fromDate) {
    const entries = Object.entries(timeSeries)
        .reverse();
    return {
        labels: entries.map(([date]) => date),
        datasets: [{
            label: `${symbol} Price`,
            data: entries.map(([, v]) => parseFloat(v["4. close"])),
            borderColor: "teal",
            fill: false
        }]
    };
}