import { qrApi } from "@/api";
import { CustomButton, PageTitleHeader, PageTitleWrapper } from "@/components";
import { getError, wait } from "@/utils";
import { Typography, LinearProgress, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import QrReader from "react-qr-scanner";

const QRScannerContainer = styled("div")`
  width: 100%;
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleScan = async (data) => {
    if (!!data) {
      setIsScanning(false);
      setProcessing(true);
      await wait(1000);
      try {
        await qrApi.validateQr({ qrText: data.text });
        window.popup({ title: "Validated QR successfully" });
      } catch (err) {
        console.log(getError(err).message);
        window.popup({ type: "error", title: "Invalid QR code" });
      }
      setProcessing(false);
    }
  };

  const handleError = (error) => {
    console.log(error);
    if (!!error)
      window.flash({
        message: "Error Occured while scanning",
        variant: "error",
      });
  };

  const handleScanToggle = () => setIsScanning((prev) => !prev);

  const previewStyle = {
    height: "auto",
    width: "90%",
    maxWidth: "400px",
    display: "flex",
    justifyContent: "center",
    border: "3px solid red",
    padding: "10px",
  };

  return (
    <>
      <PageTitleWrapper>
        <PageTitleHeader
          title="QR Code Scanner"
          description="Just show me a QR code"
        />
      </PageTitleWrapper>
      <QRScannerContainer>
        {processing ? (
          <Box sx={{ width: "90%", pt: "20px" }}>
            <LinearProgress />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Validating QR code...
            </Typography>
          </Box>
        ) : (
          <>
            {isScanning ? (
              <QrReader
                onScan={handleScan}
                onError={handleError}
                facingMode="environment"
                style={previewStyle}
                delay={300}
              />
            ) : (
              <Typography variant="subtitle1">
                Click to scan a QR code
              </Typography>
            )}
            <CustomButton
              color={isScanning ? "error" : "primary"}
              onClick={handleScanToggle}
            >
              {isScanning ? "Stop Scanning" : "Scan Qr Code"}
            </CustomButton>
          </>
        )}
      </QRScannerContainer>
    </>
  );
};
