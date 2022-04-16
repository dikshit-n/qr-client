import { useEffect, useState } from "react";

export const useLayoutUtils = () => {
  const [contentContainer, setContentContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    const contentContainerModel = document.getElementById("content-container");
    if (!!contentContainerModel) setContentContainer(contentContainerModel);
    return () => setContentContainer(null);
  }, []);

  const scrollContentContainerToTop = () => {
    if (contentContainer)
      contentContainer.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { scrollContentContainerToTop };
};
