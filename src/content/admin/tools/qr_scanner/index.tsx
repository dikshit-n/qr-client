import { CustomButton, PageTitleHeader, PageTitleWrapper } from "@/components";
import { useLayoutUtils } from "@/hooks";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScannerContainer = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 10vh;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const ViewFinder = styled("div")`
  width: 500px;
  height: 500px;
`;

export const QRScanner = () => {
  const [data, setData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const qrScanContainer = useRef(null);
  const { scrollContentContainerToTop } = useLayoutUtils();

  const handleScanEnd = (result, error) => {
    if (!!result) {
      setData(result?.text);
    }
    if (!!error) {
      window.flash({
        message: "Error Occured while scanning",
        variant: "error",
      });
      setData(null);
    }
    setIsScanning(false);
    scrollContentContainerToTop();
  };

  const handleScanToggle = () => {
    setIsScanning((prev) => !prev);
    if (qrScanContainer.current)
      qrScanContainer.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageTitleWrapper>
        <PageTitleHeader
          title="QR Code Scanner"
          description="Show him a QR code"
        />
      </PageTitleWrapper>
      <QRScannerContainer ref={qrScanContainer}>
        {isScanning ? (
          <QrReader
            onResult={handleScanEnd}
            containerStyle={{ width: "500px", height: "500px" }}
            videoContainerStyle={{
              width: "500px",
              height: "500px",
              paddingTop: 0,
            }}
            constraints={{ facingMode: "user" }}
            ViewFinder={ViewFinder}
          />
        ) : (
          <Typography variant="subtitle1">Click to scan a QR code</Typography>
        )}
        <CustomButton
          color={isScanning ? "error" : "primary"}
          onClick={handleScanToggle}
        >
          {isScanning ? "Stop Scanning" : "Scan Qr Code"}
        </CustomButton>
      </QRScannerContainer>
    </>
  );
};
