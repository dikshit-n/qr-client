import { Box } from "@mui/material";

export function AppSpinner() {
  return (
    <Box
      sx={{ position: "fixed", left: 0, top: 0, width: "100%", height: "100%" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img
        src={"/img/qr-loader.gif"}
        alt="loading"
        style={{ width: 300, height: 200 }}
      />
    </Box>
  );
}
