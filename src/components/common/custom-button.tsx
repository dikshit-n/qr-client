import { CUSTOM_BUTTON_PROPS } from "@/model";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

export const CustomButton: React.FC<CUSTOM_BUTTON_PROPS> = (props) => {
  const { push, replace } = useRouter();
  const { loading, href, ...rest } = props;

  const goto = (route: CUSTOM_BUTTON_PROPS["href"]) => {
    if (route) {
      if (typeof route === "string") push(route);
      else if ("url" in route) {
        if (route.options?.replace) replace(route.url, route.as, route.options);
        else push(route.url, route.as, route.options);
      } else {
        if (route.replace) replace(route);
        else push(route);
      }
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={loading ? <CircularProgress size="1rem" /> : null}
      {...rest}
      disabled={loading || props.disabled}
      // sx={{ mt: 2, ...rest.sx }}
      onClick={
        href || rest.onClick
          ? (e) => {
              if (href) goto(href);
              if (rest.onClick) rest.onClick(e);
            }
          : undefined
      }
    >
      {rest.children}
    </Button>
  );
};
