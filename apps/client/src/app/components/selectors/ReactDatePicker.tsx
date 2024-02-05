import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import ru from 'date-fns/locale/ru'
registerLocale('ru', ru)

export interface DateSelectorProps {
  onChange: (e: Date | null) => void
  value: Date | null
  name: string
  disabled?: boolean
}

export default function ReactDatePicker({
  onChange,
  value,
  name,
  disabled,
}: DateSelectorProps) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
      locale="ru"
      timeFormat="p"
      className="dateSelector"
      showTimeSelect
      // includeTimes={[
      //   setHours(setMinutes(new Date(), 0), 17),
      //   setHours(setMinutes(new Date(), 30), 18),
      //   setHours(setMinutes(new Date(), 30), 19),
      //   setHours(setMinutes(new Date(), 30), 17),
      // ]}
      dateFormat="Pp"
    />
  )
}
