import { styled } from "@mui/material/styles";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import Box from "@mui/material/Box";
import { SidebarProvider } from "@/context";
import { EXTENDED_SIDEBAR_LAYOUT_PROPS, HEADER_PROPS } from "@/model";

const LayoutContainer = styled(Box)(
  ({ theme }) => `
    width: 100%;
    zIndex: 0;
    height: 100vh;
    overflow: hidden;
    ${theme.breakpoints.up("lg")} {
      display: grid;
      grid-template-columns: ${theme.sidebar.width} calc(100vw - ${
    theme.sidebar.width
  });
    }
  `
);
const MainContainer = styled(Box)(
  ({ theme }) => `
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${theme.palette.background.default}
`
);

const ContentContainer = styled(Box)(
  ({ theme }) => `
  width: 100%;
  position: relative;
  height: calc(100vh - ${theme.header.height});
  max-height: calc(100vh - ${theme.header.height});
  overflow: auto;

  // margin approach
  // ${theme.breakpoints.up("lg")} {
    // margin-left: ${theme.sidebar.width};
  //   width: calc(100% - ${theme.sidebar.width});
  // }
  `
);

export const ExtendedSidebarLayout: React.FC<EXTENDED_SIDEBAR_LAYOUT_PROPS> = (
  props
) => {
  const { children } = props;

  return (
    <SidebarProvider>
      <LayoutContainer>
        <Sidebar routes={props.sidebarRoutes} />
        <MainContainer id="content-container">
          <Header {...props.headerProps} />
          <ContentContainer>{children}</ContentContainer>
        </MainContainer>
      </LayoutContainer>
    </SidebarProvider>
  );
};
