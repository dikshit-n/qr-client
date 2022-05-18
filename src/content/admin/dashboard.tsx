import {
  Card,
  Grid,
  styled,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { DashboardHeader, DashboardTitleWrapper } from "@/components";
import GroupIcon from "@mui/icons-material/Group";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { getError } from "@/utils";
import { dashboardApi } from "@/api/admin";
import { ADMIN_DASHBOARD_DETAILS } from "@/model";
import { useSelector } from "@/redux";
import CloseIcon from "@mui/icons-material/Close";

const TileCard = styled(Card)(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: 0 0 2px 0 lightgrey;
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(2)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
);

const TileHeader = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
  `
);

const TileValue = styled(Typography)(
  ({ theme }) => `
  vertical-alignment: sub;
  font-size: 34px;
  color: ${theme.colors.alpha.black[100]};
`
);

export const AdminDashboard: React.FC = () => {
  const [details, setDetails] = useState<ADMIN_DASHBOARD_DETAILS>(null);
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state) => state.auth);
  const { name = "" } = data;
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const data = await dashboardApi.fetchDetails();
      console.log(data);
      setDetails(data);
    } catch (err) {
      console.log(err);
      window.flash({ message: getError(err).meassage, variant: "error" });
    }
    setLoading(false);
  };

  return loading ? (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <>
      <DashboardTitleWrapper>
        <DashboardHeader
          name={name}
          description="Here are your analytical stats"
        />
      </DashboardTitleWrapper>
      <Grid direction="row" container spacing={10} sx={{ p: 5 }}>
        <Grid item width={{ xs: "100%", sm: "50%", md: "30%" }}>
          <TileCard>
            <Box>
              <TileHeader>Total Employees</TileHeader>
              <TileValue variant="h5">{details?.employeeCount || 0}</TileValue>
            </Box>
            <GroupIcon />
          </TileCard>
        </Grid>
        <Grid item width={{ xs: "100%", sm: "50%", md: "30%" }}>
          <TileCard>
            <Box>
              <TileHeader>Total Successful Scans</TileHeader>
              <TileValue variant="h5">
                {details?.scanCount?.success || 0}
              </TileValue>
            </Box>
            <CheckIcon color="success" />
          </TileCard>
        </Grid>
        <Grid item width={{ xs: "100%", sm: "50%", md: "30%" }}>
          <TileCard>
            <Box>
              <TileHeader>Total Failure Scans</TileHeader>
              <TileValue variant="h5">
                {details?.scanCount?.failure || 0}
              </TileValue>
            </Box>
            <CloseIcon color="error" />
          </TileCard>
        </Grid>
      </Grid>
    </>
  );
};
