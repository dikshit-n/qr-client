import { Card, Grid, styled, Typography, Box } from "@mui/material";
import { DashboardHeader, DashboardTitleWrapper } from "@/components";
import GroupIcon from "@mui/icons-material/Group";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useEffect, useState } from "react";
import { getError } from "@/utils";
import { dashboardApi } from '@/api/employee'
import { EMPLOYEE_DASHBOARD_DETAILS } from "@/model";
import { useSelector } from "@/redux";

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
  
const TileSubHeader = styled(Typography)(({theme}) => `
  color: ${theme.palette.text.secondary};
  font-weight: bold;
`)

const TileValue = styled(Typography)(
  ({ theme }) => `
  vertical-alignment: sub;
  font-size: 34px;
  color: ${theme.colors.alpha.black[100]};
`
);

export const EmployeeDashboard: React.FC = () => {

  const [details, setDetails] = useState<EMPLOYEE_DASHBOARD_DETAILS>(null)
  const [loading, setLoading] = useState(false)
  const {data={}} = useSelector(state => state.auth)
  const {name=''} = data
  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = async() => {
    setLoading(true)
    try {
      const data = await dashboardApi.fetchDetails()
      console.log(data)
      setDetails(data)
    }
    catch(err) {
      window.flash({message: getError(err), variant: 'error'})
    }
    setLoading(false)
  }

  return (
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
              <TileValue variant="h5">{details?.employeeCount}</TileValue>
            </Box>
            <GroupIcon />
          </TileCard>
        </Grid>
        <Grid item width={{ xs: "100%", sm: "50%", md: "30%" }}>
          <TileCard>
            <Box>
              <TileHeader>Total Scans</TileHeader>
              <TileSubHeader>Success</TileSubHeader>
              <TileValue variant="h5">{details?.scanCount?.success}</TileValue>
              <TileSubHeader>Failure</TileSubHeader>
              <TileValue variant="h5">{details?.scanCount?.failure}</TileValue>
            </Box>
            <QrCodeScannerIcon />
          </TileCard>
        </Grid>
      </Grid>
    </>
  );
};
