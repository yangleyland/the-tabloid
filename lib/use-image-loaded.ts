"use client";

import { useCallback } from "react";

export function useLoadedImageRef(
  onLoaded: () => void,
): (element: HTMLImageElement | null) => void {
  return useCallback(
    (element: HTMLImageElement | null) => {
      if (element && element.complete && element.naturalWidth > 0) {
        onLoaded();
      }
    },
    [onLoaded],
  );
}
