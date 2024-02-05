import { MenuItem, Select, Switch, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getService, patchService } from "../../api/services";
import { Prisma, Role, User } from "../../types";
import DataGrid, { GridColumn } from "../components/DataGrid";
import AutocompleteSelector from "../components/selectors/AutocompleteSelector";
import ColumnWrapper from "../components/ui/ColumnWrapper";
import DistributorSelector from "../features/distributors/DistributorSelector";
import useDistributors from "../hooks/api/useDistributors";

export default function UsersPage() {
  const path = "/users";
  const client = useQueryClient();
  const { data = [] } = useQuery(
    ["users"],
    async () => await getService<User[]>({ path })
  );

  const { distributors, loading } = useDistributors();

  const { mutate: update } = useMutation(
    ({ id, data }: { id: number; data: Prisma.UserUncheckedUpdateInput }) =>
      patchService<User, Prisma.UserUncheckedUpdateInput>({
        path: path + "/" + id,
        data,
      }),
    {
      onSuccess() {
        client.invalidateQueries(["users"]);
      },
    }
  );

  const Roles = {
    USER: "USER",
    DISTRIBUTOR: "DISTRIBUTOR",
  };

  const columns: GridColumn<User>[] = [
    {
      id: 1,
      key: "id",
      title: "ID",
    },
    {
      id: 2,
      key: "email",
      title: "E-mail",
    },
    {
      id: 3,
      key: "name",
      title: "Имя",
    },
    {
      id: 4,
      key: "phone",
      title: "Телефон",
    },
    {
      id: 5,
      key: "description",
      title: "Описание",
    },
    {
      id: 6,
      title: "Роль",
      component: (row) =>
        row.role == "ADMIN" ? (
          <Typography variant="inherit">Администратор</Typography>
        ) : (
          <Select
            size="small"
            fullWidth={true}
            value={row.role}
            variant="standard"
            onChange={(e) =>
              update({ id: row.id, data: { role: e.target.value as Role } })
            }
            sx={{ padding: 0 }}
            disableUnderline={true}
          >
            {Object.values(Roles).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        ),
    },
    {
      id: 7,
      title: "Дистрибьютор",
      width: 300,
      component: (row) => (
        <DistributorSelector
          currentId={row.distributorId}
          fullWidth
          onSelect={(distributorId) =>
            update({ id: row.id, data: { distributorId } })
          }
        />
      ),
    },
    {
      id: 8,
      title: "Активен",
      width: 50,
      component: (row) => (
        <Switch
          disabled={row.role == "ADMIN"}
          checked={row.activated}
          onChange={(e, activated) =>
            update({ id: row.id, data: { activated } })
          }
        />
      ),
    },
  ];

  return (
    <ColumnWrapper>
      <DataGrid rows={data} columns={columns} getRowId={(row) => row.id} />
    </ColumnWrapper>
  );
}
