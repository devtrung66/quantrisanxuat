export function isPositiveInt(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= 0;
}

export function required(v: string | undefined | null): boolean {
  return !!v && v.trim().length > 0;
}
