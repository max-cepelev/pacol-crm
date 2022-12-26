import React from "react";
import { ru } from "date-fns/locale";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  CalendarPickerView,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

export interface DateSelectorProps {
  onChange: (e: Date | null) => void;
  value: string | Date | null;
  name: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
  views?: CalendarPickerView[];
  label: string;
}

export default function DateSelector({
  label,
  onChange,
  value,
  name,
  error,
  helperText,
  views = ["day"],
  disabled,
  size = "medium",
  ...props
}: DateSelectorProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <DesktopDatePicker
        {...props}
        onChange={onChange}
        value={value}
        label={label}
        disabled={disabled}
        views={views}
        minDate={new Date("2020-01-01")}
        maxDate={new Date("2035-01-01")}
        // inputFormat="dd.MM.yyyy"
        // mask="__.__.____"
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            error={error}
            helperText={helperText}
            size={size}
            placeholder="Выберите дату"
          />
        )}
      />
    </LocalizationProvider>
  );
}
