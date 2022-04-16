import { authSetup } from "@/data";
import { useAuth } from "@/hooks";
import { ExtendedSidebarLayout } from "@/layouts";
import { HEADER_PROPS } from "@/model";
import { routes } from "@/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const EmployeeLayout: React.FC = (props) => {
  const { children } = props;
  const router = useRouter();
  const { logout, data, fetchProfile } = useAuth();

  useEffect(() => {
    handleFetchProfile();
  }, []);

  const handleFetchProfile = async () => {
    try {
      await fetchProfile<"admin">();
    } catch (err) {}
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
    router.push(authSetup.authPage);
  };

  const headerProps: HEADER_PROPS = {
    avatar: {
      image: data?.profile?.image,
      email: data?.profile?.email,
      name: data?.profile?.name,
      actions: [
        {
          label: "Profile",
          href: "/user/profile",
        },
      ],
      logout: handleLogout,
    },
  };

  return (
    <ExtendedSidebarLayout
      headerProps={headerProps}
      sidebarRoutes={routes.employee}
    >
      {children}
    </ExtendedSidebarLayout>
  );
};
