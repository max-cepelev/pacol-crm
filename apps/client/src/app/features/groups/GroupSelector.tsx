import { mdiCheck, mdiClose } from "@mdi/js";
import { Icon } from "@mdi/react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

import useGroupsService from "../../hooks/api/useGroupsService";
import { useAuthStore } from "../../store/useAuthStore";

interface Props {
  currentId: number | null;
  onSelect: (id: number | null) => void;
  size?: "small" | "medium";
  nullSelect?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  distributorId?: number;
}

export default function GroupSelector({
  currentId,
  onSelect,
  size = "small",
  nullSelect = false,
  fullWidth = false,
  error = false,
  distributorId,
}: Props) {
  const { groups, create, update, isLoading } = useGroupsService({
    distributorId,
  });
  const [addField, setAddField] = useState(false);
  const [addState, setAddState] = useState<string>("");
  const user = useAuthStore((store) => store.user);
  const handleChange = (event: SelectChangeEvent<typeof currentId>) => {
    const {
      target: { value },
    } = event;
    onSelect(value == 0 ? null : Number(value));
  };

  const handleCancel = () => {
    setAddState("");
    setAddField(false);
  };

  const handleSave = () => {
    addState && create({ name: addState, distributorId: user?.distributorId });
    handleCancel();
  };

  const handleKeyDawn = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.code == "Enter") {
      handleSave();
    }
    // if (e.code == "Escape") {
    //   handleCancel();
    // }
  };

  if (isLoading)
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
      <InputLabel id="building-label">Группа компаний</InputLabel>
      <Select
        fullWidth={fullWidth}
        labelId="building-label"
        id="building"
        defaultValue={0}
        value={currentId || 0}
        onChange={handleChange}
        error={error}
        input={
          <OutlinedInput label="Группа компаний" size={size} error={error} />
        }
        sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <MenuItem disabled={!nullSelect} value={0}>
          Не выбран
        </MenuItem>
        {groups.map((item) => (
          <MenuItem
            key={item.id}
            value={item.id}
            disabled={addField}
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {item.name}
          </MenuItem>
        ))}
        <Box p={1}>
          {addField ? (
            <>
              <OutlinedInput
                size="small"
                value={addState}
                onChange={({ target }) => setAddState(target.value)}
                autoFocus={true}
                onKeyDown={handleKeyDawn}
              />
              <IconButton
                disabled={!Boolean(addState)}
                onClick={handleSave}
                children={
                  <Icon
                    path={mdiCheck}
                    size={1}
                    color={Boolean(addState) ? "green" : "grey"}
                  />
                }
              />
              <IconButton
                onClick={handleCancel}
                children={<Icon path={mdiClose} size={1} color="red" />}
              />
            </>
          ) : (
            <Button onClick={() => setAddField(true)}>Добавить</Button>
          )}
        </Box>
      </Select>
    </FormControl>
  );
}
