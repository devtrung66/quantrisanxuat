export { default as cx } from "clsx";

export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

export function ratio(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return (part / whole) * 100;
}
