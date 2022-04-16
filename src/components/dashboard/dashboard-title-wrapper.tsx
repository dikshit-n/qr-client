import { FC, ReactNode } from "react";
import { styled, Box } from "@mui/material";

const DashboardTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
        background-color: ${theme.colors.alpha.white[70]};
`
);

interface DashboardTitleWrapperProps {
  children?: ReactNode;
}

export const DashboardTitleWrapper: FC<DashboardTitleWrapperProps> = ({
  children,
}) => {
  return (
    <>
      <DashboardTitle className="MuiPageTitle-wrapper">
        {children}
      </DashboardTitle>
    </>
  );
};
