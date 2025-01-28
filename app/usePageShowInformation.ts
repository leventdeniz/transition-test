import { useEffect, useState } from "react";

interface PageShowInformation {
  persisted: boolean;
}

export default function usePageShowInformation(): PageShowInformation {
  const [persisted, setPersisted] = useState(false);

  useEffect(() => {
    const handler = (e: PageTransitionEvent) => {
      setPersisted(e.persisted);
    };

    window.addEventListener("pageshow", handler, { passive: true });
    return () => {
      window.removeEventListener("pageshow", handler);
    };
  }, []);

  return {
    persisted,
  };
}
