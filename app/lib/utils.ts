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

export function compactNumber(number: number): string {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 2,
    maximumSignificantDigits: 4,
  }).format(number);

  return formattedNumber;
}
