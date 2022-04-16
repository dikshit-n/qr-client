import { CustomIconButton, CustomTable } from "@/components";
import { getError } from "@/utils";
import { Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ViewEmployeesHeader } from "./components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { userApi } from "@/api";

export const ViewEmployeesContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([
    // {
    //   name: "John",
    //   email: "john@mailinator.com",
    //   phone: "+91 9994959032",
    // },
    // {
    //   name: "Steve",
    //   email: "steve@mailinator.com",
    //   phone: "+91 96004959032",
    // },
  ]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const employees = await userApi.fetchEmployees();
      setEmployees(employees);
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
    setLoading(false);
  };

  const handleDelete = async (_id) => {
    try {
      await userApi.deleteEmployee(_id);
      window.flash({ message: "Deleted Successfully" });
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
  };

  const handleDeleteClick = (_id) =>
    window.modal({ type: "confirmation", onConfirm: () => handleDelete(_id) });

  return (
    <CustomTable
      loading={loading}
      tableHeading={ViewEmployeesHeader}
      tableHeadingProps={{ refresh: fetchEmployees }}
      data={employees.map((el) => ({ ...el, action: el._id }))}
      renderAs={{
        manage: ({ value, Component }) => (
          <Component>
            <Typography noWrap sx={{ textAlign: "right" }}>
              <Tooltip title={"Edit"} arrow>
                <span>
                  <CustomIconButton
                    href={`/admin/employee/${value._id}`}
                    color="primary"
                  >
                    <EditIcon fontSize="small" />
                  </CustomIconButton>
                </span>
              </Tooltip>
              <Tooltip title={"Delete"} arrow>
                <span>
                  <CustomIconButton
                    onClick={() => handleDeleteClick(value._id)}
                  >
                    <DeleteTwoToneIcon fontSize="small" />
                  </CustomIconButton>
                </span>
              </Tooltip>
            </Typography>
          </Component>
        ),
      }}
      columns={[
        { Header: "Name", accessor: "name" },
        { Header: "Email", accessor: "email" },
        { Header: "Phone", accessor: "phone" },
        { Header: "", accessor: "manage" },
      ]}
    />
  );
};
