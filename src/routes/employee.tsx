import { SIDEBAR_MENU_ITEMS_STRUCTURE } from "@/model";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const employeeRoutes: SIDEBAR_MENU_ITEMS_STRUCTURE = [
  {
    heading: "General",
    items: [
      {
        label: "Profile",
        link: "/employee/profile",
        icon: <AccountCircleIcon />,
      },
      {
        label: "Dashboard",
        link: "/employee",
        icon: <LeaderboardIcon />,
      },
    ],
  },
];
