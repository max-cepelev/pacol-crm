import { TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { CalendarOrClockPickerView } from '@mui/x-date-pickers/internals/models'
import { ru } from 'date-fns/locale'
import React from 'react'

export interface DateSelectorProps {
  onChange: (e: Date | null) => void
  value: string | Date | null
  name: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  size?: 'small' | 'medium'
  views?: CalendarOrClockPickerView[]
  fullWidth?: boolean
  label: string
}

export default function DateTimeSelector({
  label,
  onChange,
  value,
  name,
  error,
  helperText,
  views = ['year', 'day', 'hours', 'minutes'],
  disabled,
  size = 'medium',
  fullWidth,
}: DateSelectorProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <DateTimePicker
        onChange={onChange}
        value={value}
        label={label}
        disabled={disabled}
        views={views}
        minDate={new Date('2020-01-01')}
        maxDate={new Date('2035-01-01')}
        // inputFormat="dd.MM.yyyy"
        // mask="__.__.____"
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            fullWidth={fullWidth}
            error={error}
            helperText={helperText}
            size={size}
            placeholder="Выберите дату"
          />
        )}
      />
    </LocalizationProvider>
  )
}
