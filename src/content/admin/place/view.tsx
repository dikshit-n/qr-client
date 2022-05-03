import { CustomIconButton, CustomTable } from "@/components";
import { getError } from "@/utils";
import { Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { QRScannerPopup, ViewPlacesHeader } from "./components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { placeApi, qrApi } from "@/api";
import QrCode2Icon from "@mui/icons-material/QrCode2";

export const ViewPlacesContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([
    {
      name: "Place 1",
      _id: "place_id_1",
    },
    {
      name: "Place 2",
      _id: "place_id_2",
    },
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

  const handleScanQRClick = (_id) => {
    window.modal({
      component: (props: any) => (
        <QRScannerPopup
          {...props}
          scanPromise={(data) => scanPromise(data, _id)}
          startScanOnMount
        />
      ),
      containerProps: { closeOnClick: false },
    });
  };

  const scanPromise = async (data, _id) => {
    // console.log(data, _id);
    try {
      await qrApi.validateQr({ qrText: data.text, deviceId: _id });
      window.popup({ title: "Validated QR successfully" });
    } catch (err) {
      window.popup({ type: "error", title: "Invalid QR code" });
    }
  };

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
              <Tooltip title={"Scan QR"} arrow>
                <span>
                  <CustomIconButton
                    color="warning"
                    onClick={() => handleScanQRClick(value._id)}
                  >
                    <QrCode2Icon fontSize="small" />
                  </CustomIconButton>
                </span>
              </Tooltip>
              <Tooltip title={"Delete"} arrow>
                <span>
                  <CustomIconButton
                    color="error"
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
