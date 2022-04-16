import { CustomIconButton } from "@/components";
import CachedIcon from "@mui/icons-material/Cached";
import { styled } from "@mui/material";
import { useState } from "react";

const AnimatedRefreshIcon = styled(CachedIcon)`
  animation: spin 1s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const RefreshIcon: React.FC<{ onClick: Function }> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (event) => {
    setLoading(true);
    await props.onClick(event);
    setLoading(false);
  };

  return (
    <CustomIconButton onClick={handleClick}>
      {loading ? <AnimatedRefreshIcon /> : <CachedIcon />}
    </CustomIconButton>
  );
};
