import { SIDEBAR_MENU_ITEMS_STRUCTURE } from "@/model";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import HandymanIcon from "@mui/icons-material/Handyman";

export const adminRoutes: SIDEBAR_MENU_ITEMS_STRUCTURE = [
  {
    heading: "General",
    items: [
      {
        label: "Profile",
        link: "/admin/profile",
        icon: <AccountCircleIcon />,
      },
      {
        label: "Dashboard",
        link: "/admin",
        icon: <LeaderboardIcon />,
      },
      {
        label: "Employees",
        link: "/admin/employee",
        icon: <GroupIcon />,
      },
      {
        label: "Places",
        link: "/admin/place",
        icon: <LocationSearchingIcon />,
      },
    ],
  },
  {
    heading: "Tools",
    items: [
      {
        label: "Scan QR Code",
        link: "/admin/tools/qr_scanner",
        icon: <HandymanIcon />,
      },
    ],
  },
];
