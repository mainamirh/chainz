export const coinLogo = (id: number): string =>
  `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;

export const coinPaprikaLogo = (id: string): string =>
  `https://static.coinpaprika.com/coin/${id}/logo.png`;

export const exchangePaprikaLogo = (id: string): string =>
  `https://static.coinpaprika.com/exchanges/${id}/logo-thumb.png`;

export const coinLastWeekChart = (id: number): string =>
  `https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${id}.svg`;

export const exchangeLogo = (id: number): string =>
  `https://s2.coinmarketcap.com/static/img/exchanges/64x64/${id}.png`;

export function roundDecimalsPlaces(number: number, places: number): number {
  return parseFloat((Math.round(number * 100) / 100).toFixed(places));
}

export function linkToATag(text: string): string {
  const urlPattern =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(
    urlPattern,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${url.slice(
        0,
        url.length - 1,
      )}</a>`,
  );
}

export function twelveHourFormat(date: string): string {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(date));

  return formattedDate;
}

export function dayMonthFormat(date: string): string {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));

  return formattedDate;
}

export function yearMonthFormat(date: string): string {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "short",
  })
    .format(new Date(date))
    .replace(" ", " '");

  return formattedDate;
}

export function regularDateFormat(date: string) {
  const formattedDate = new Intl.DateTimeFormat("en-US").format(new Date(date));

  return formattedDate;
}

export function fullClockFormat(date: string) {
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }).format(new Date(date));

  return formattedTime;
}

export function compactNumber(number: number): string {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 2,
    maximumSignificantDigits: 4,
  }).format(number);

  return formattedNumber;
}

export function formatByRange(value: any, _: number, range: string): string {
  switch (range) {
    case "1D":
      return twelveHourFormat(value);
    case "7D":
      return dayMonthFormat(value);
    case "1M":
      return dayMonthFormat(value);
    case "1Y":
      return yearMonthFormat(value);
    default:
      return value;
  }
}

export const shortenedAddress = (address: string): string =>
  `${address.slice(0, 6)}...${address.slice(-6)}`;

export const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export function trustBadgeColor(trustScore: string) {
  switch (trustScore) {
    case "high":
      return "bg-green-600";
    case "medium":
      return "bg-yellow-600";
    case "low":
      return "bg-red-600";
    default:
      return "bg-gray-700";
  }
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
