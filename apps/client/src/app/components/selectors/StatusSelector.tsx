import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getService } from "../../../api/services";
import { ProjectStatus, SaleStatus, TaskStatus } from "../../../types";

interface Props {
  statuses: "task" | "project" | "sale";
  currentId: number | null;
  onSelect: (id: number | null) => void;
  size?: "small" | "medium";
  fullWidth?: boolean;
  nullSelect?: boolean;
}

export default function StatusSelector({
  statuses,
  currentId,
  onSelect,
  size = "small",
  fullWidth = false,
  nullSelect,
}: Props) {
  const names = {
    task: "Статус задачи",
    project: "Статус проекта",
    sale: "Статус продажи",
  };
  const {
    data: options = [],
    isLoading: loading,
    isError: error,
  } = useQuery(
    [`${statuses}Statuses`],
    async () =>
      await getService<(ProjectStatus | TaskStatus | SaleStatus)[]>({
        path: `/${statuses}-statuses`,
      }),
    { staleTime: 60000 }
  );

  const handleChange = (event: SelectChangeEvent<number | string>) => {
    const {
      target: { value },
    } = event;
    onSelect(+value == 0 ? null : +value);
  };

  if (loading)
    return (
      <Box sx={{ minWidth: 135, padding: 1 }}>
        <LinearProgress />
      </Box>
    );

  return (
    <FormControl
      sx={{ m: 0, minWidth: 135 }}
      fullWidth={fullWidth}
      error={error}
    >
      <InputLabel id="complex-label">{names[statuses]}</InputLabel>
      <Select
        size={size}
        fullWidth={fullWidth}
        value={currentId || 0}
        onChange={handleChange}
        input={
          <OutlinedInput label={names[statuses]} size={size} error={error} />
        }
      >
        <MenuItem disabled={!nullSelect} value={0}>
          Не выбран
        </MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
