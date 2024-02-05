export function excludeFields<T, Key extends keyof T>(
  object: T,
  keys: Key[]
): Omit<T, Key> {
  const obj = { ...object }
  for (const key of keys) {
    delete obj[key]
  }
  return obj
}
