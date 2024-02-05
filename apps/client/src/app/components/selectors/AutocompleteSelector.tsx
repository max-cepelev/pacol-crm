import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface Props<T> {
  options: T[];
  current: T | null;
  onChange: (option: T | null) => void;
  name: string;
  getOptionLabel: (option: T) => string;
  loading?: boolean;
  width?: string | number;
  size?: "small" | "medium";
  noOptionsText?: string;
  fullWidth?: boolean;
  error?: boolean;
}

export default function AutocompleteSelector<T>({
  options,
  current,
  onChange,
  name,
  getOptionLabel,
  size = "small",
  loading,
  width,
  noOptionsText = "Список пуст",
  fullWidth,
  error,
}: Props<T>) {
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: T | null
  ) => {
    onChange(value);
  };

  return (
    <Autocomplete
      loading={loading}
      size={size}
      options={options}
      value={current}
      getOptionLabel={getOptionLabel}
      onChange={handleChange}
      noOptionsText={noOptionsText}
      fullWidth={fullWidth}
      renderInput={(params) => (
        <TextField
          {...params}
          label={name}
          fullWidth={fullWidth}
          error={error}
          sx={{ width, minWidth: "200px" }}
        />
      )}
    />
  );
}
