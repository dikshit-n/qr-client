import { CustomButton, CustomIconButton } from "@/components";
import { CUSTOM_MODAL_COMPONENT_PROPS } from "@/model";
import { wait } from "@/utils";
import { Box, LinearProgress, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import CloseIcon from "@mui/icons-material/Close";

const QRScannerContainer = styled("div")`
  width: 100%;
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export interface QR_SCANNER_POPUP_PROPS {
  scanPromise: Function;
  startScanOnMount?: boolean;
}

export const QRScannerPopup: React.FC<
  QR_SCANNER_POPUP_PROPS & CUSTOM_MODAL_COMPONENT_PROPS
> = ({ onCancel, scanPromise, startScanOnMount }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setIsScanning(startScanOnMount);
  }, [startScanOnMount]);

  const handleScan = async (data, error) => {
    if (!!data) {
      setIsScanning(false);
      setProcessing(true);
      await wait(1000);
      await scanPromise(data);
      setProcessing(false);
    }
    if (!!error) {
      console.log(error);
      window.flash({
        message: "Error Occured while scanning",
        variant: "error",
      });
    }
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
      <CustomIconButton
        sx={{ position: "absolute", top: 5, right: 5 }}
        onClick={() => onCancel()}
        color="error"
      >
        <CloseIcon />
      </CustomIconButton>
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
                constraints={{ facingMode: "user" }}
                onResult={handleScan}
                containerStyle={previewStyle}
                scanDelay={300}
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
