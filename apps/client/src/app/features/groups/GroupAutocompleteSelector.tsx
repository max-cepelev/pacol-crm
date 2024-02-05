import React, { useMemo } from "react";
import AutocompleteSelector from "../../components/selectors/AutocompleteSelector";
import useGroupsService from "../../hooks/api/useGroupsService";

interface Props {
  currentId: number | null;
  distributorId: number | null;
  onSelect: (id: number | null) => void;
}

export default function GroupAutocompleteSelector({
  currentId,
  distributorId,
  onSelect,
}: Props) {
  const { groups, isLoading } = useGroupsService({
    distributorId,
  });
  const current = useMemo(
    () => groups.find((item) => item.id == currentId) || null,
    [currentId, groups, distributorId]
  );
  return (
    <AutocompleteSelector
      options={groups}
      loading={isLoading}
      current={current}
      onChange={(option) => onSelect(option?.id || null)}
      name="Группа компаний"
      getOptionLabel={(option) => option.name}
    />
  );
}
