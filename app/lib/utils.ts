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
        url.length - 1
      )}</a>`
  );
}
