import { CustomButton, TableHeader, RefreshIcon } from "@/components";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { CUSTOM_TABLE_HEADING_PROPS } from "@/model";

export const ViewEmployeesHeader: React.FC<
  CUSTOM_TABLE_HEADING_PROPS & { refresh: Function }
> = ({ refresh }) => {
  return (
    <TableHeader
      header="Employees"
      actions={
        <Grid
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap={2}
        >
          {/* <CustomButton startIcon={<AddIcon />} href="/admin/agent/add">
              Add
            </CustomButton> */}

          <CustomButton
            startIcon={<AddIcon />}
            color="secondary"
            href="/admin/employee/add"
          >
            Add
          </CustomButton>
          <RefreshIcon onClick={refresh} />
        </Grid>
      }
    />
  );
};
