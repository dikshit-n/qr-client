import { FC, ReactNode } from "react";
import { styled, Box } from "@mui/material";

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
        background-color: ${theme.colors.alpha.white[70]};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

export const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return (
    <>
      <PageTitle className="MuiPageTitle-wrapper">{children}</PageTitle>
    </>
  );
};
