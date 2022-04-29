import { SIDEBAR_MENU_ITEMS_STRUCTURE } from "@/model";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { SidebarMenuItem } from "./sidebar-menu-item";
import Image from "next/image";
import { Divider } from "@mui/material";

const SidebarMenuWrapper = styled(List)(
  ({ theme }) => `
      .MuiListSubheader-root {
        text-transform: uppercase;
        font-weight: bold;
        background: ${theme.sidebar.background};
        color: ${theme.sidebar.menuItemHeadingColor};
        font-size: ${theme.typography.pxToRem(12)};
        line-height: 1.4;
      }
      .MuiListItem-root {
        padding: 0 5px;
        width: 100%;
        .has-default-icon {
          .MuiButton-startIcon {
            opacity: 0;
          }
          &:hover {
            .MuiButton-startIcon{
              opacity: 1;
            }
          }
        }
        .drop-down-toggle, a {
          width: 100%;
          justify-content: flex-start;
          color: ${theme.sidebar.textColor};
          &.Mui-active, &:hover {
            color: #6b6969;
            box-shadow: -2px 2px 2px 0 lightgrey;
            background: #FFFFFF;
            border-radius: 5px;
            &.has-default-icon {
              .MuiButton-startIcon {
                opacity: 1;
              }
            }
          }
          .MuiButton-endIcon {
            margin-left: auto;
            margin-right: 0;
          }
        }
        .drop-down-toggle {
          padding-right: 15px;
        }
      }
      .sub-menu {
        display: block;
      }
    `
);

const ImageWrapper = styled("div")`
  border: 2px solid lightgrey;
  border-radius: 5px;
  margin: 25px;
`;

export const SidebarMenu: React.FC<{
  routes?: SIDEBAR_MENU_ITEMS_STRUCTURE;
}> = (props) => {
  const { routes = [] } = props;
  return (
    <>
      <ImageWrapper>
        <Image src="/img/logo.png" width={240} height={52} />
      </ImageWrapper>
      <Divider />
      {routes.map((el, index) => (
        <SidebarMenuWrapper
          key={index}
          subheader={<ListSubheader key={index}>{el.heading}</ListSubheader>}
        >
          {(el.items || []).map((ele, ind) => (
            <SidebarMenuItem key={ind} {...ele} />
          ))}
        </SidebarMenuWrapper>
      ))}
    </>
  );
};
