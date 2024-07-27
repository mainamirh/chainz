export function roundDecimalsPlaces(number: number, places: number): number {
  return parseFloat((Math.round(number * 100) / 100).toFixed(places));
}
