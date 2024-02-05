export const getDateFormat = (
  date: string | Date | null,
  options?: Intl.DateTimeFormatOptions,
  noDateText?: string
) => {
  if (!date) {
    return noDateText || 'Не задана'
  }
  const dt = new Date(date)
  return dt.toLocaleString('ru-RU', options)
}
