"use client";

import SearchOverlay from "./SearchOverlay";
import { useOverlays } from "./SiteShell";
import Subscribe from "./Subscribe";

export default function PageOverlays() {
  const { isSearchOpen, isSubscribeOpen, toggleSearch, toggleSubscribe } =
    useOverlays();
  return (
    <>
      <SearchOverlay isSearchOpen={isSearchOpen} onSearchClick={toggleSearch} />
      <Subscribe
        isSubscribeOpen={isSubscribeOpen}
        onSubscribeClick={toggleSubscribe}
      />
    </>
  );
}
