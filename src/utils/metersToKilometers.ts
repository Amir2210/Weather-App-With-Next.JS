export function metersToKilometers(visibility: number): string {
  const visibilityInKilometers = visibility / 1000
  return `${visibilityInKilometers.toFixed(0)}km`
}