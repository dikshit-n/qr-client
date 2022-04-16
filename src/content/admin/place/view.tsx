import { CustomIconButton, CustomTable } from "@/components";
import { getError } from "@/utils";
import { Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ViewPlacesHeader } from "./components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { placeApi } from "@/api";

export const ViewPlacesContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([
    // {
    //   name: "Place 1",
    //   _id: "place_id_1",
    // },
    // {
    //   name: "Place 2",
    //   _id: "place_id_2",
    // },
  ]);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const places = await placeApi.fetchPlaces();
      setPlaces(places);
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
    setLoading(false);
  };

  const handleDelete = async (_id) => {
    try {
      await placeApi.deletePlace(_id);
      window.flash({ message: "Deleted Successfully" });
      fetchPlaces();
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
  };

  const handleDeleteClick = (_id) =>
    window.modal({ type: "confirmation", onConfirm: () => handleDelete(_id) });

  return (
    <CustomTable
      loading={loading}
      tableHeading={ViewPlacesHeader}
      tableHeadingProps={{ refresh: fetchPlaces }}
      data={places.map((el) => ({ ...el, action: el._id }))}
      renderAs={{
        manage: ({ value, Component }) => (
          <Component>
            <Typography noWrap sx={{ textAlign: "right" }}>
              <Tooltip title={"Edit"} arrow>
                <span>
                  <CustomIconButton
                    href={`/admin/place/${value._id}`}
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
        { Header: "Place Name", accessor: "name" },
        { Header: "", accessor: "manage" },
      ]}
    />
  );
};
