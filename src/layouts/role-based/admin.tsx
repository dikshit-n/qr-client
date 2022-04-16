import { authSetup } from "@/data";
import { useAuth } from "@/hooks";
import { ExtendedSidebarLayout } from "@/layouts";
import { HEADER_PROPS } from "@/model";
import { routes } from "@/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const AdminLayout: React.FC = (props) => {
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
      // "https://cdn.discordapp.com/avatars/692038003476135977/4d2acd3aab7d3dffebacae5726d2e905.webp?size=160",
      email: data?.profile?.email,
      name: data?.profile?.name,
      actions: [
        {
          label: "Profile",
          href: "/admin/profile",
        },
      ],
      logout: handleLogout,
    },
  };

  return (
    <ExtendedSidebarLayout
      headerProps={headerProps}
      sidebarRoutes={routes.admin}
    >
      {children}
    </ExtendedSidebarLayout>
  );
};
