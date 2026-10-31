"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface OverlayState {
  isSearchOpen: boolean;
  isSubscribeOpen: boolean;
  toggleSearch: () => void;
  toggleSubscribe: () => void;
}

const OverlayContext = createContext<OverlayState>({
  isSearchOpen: false,
  isSubscribeOpen: false,
  toggleSearch: () => {},
  toggleSubscribe: () => {},
});

export function useOverlays(): OverlayState {
  return useContext(OverlayContext);
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSearch = useCallback(() => setIsSearchOpen((open) => !open), []);
  const toggleSubscribe = useCallback(
    () => setIsSubscribeOpen((open) => !open),
    [],
  );
  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((open) => !open),
    [],
  );

  const overlays = useMemo(
    () => ({ isSearchOpen, isSubscribeOpen, toggleSearch, toggleSubscribe }),
    [isSearchOpen, isSubscribeOpen, toggleSearch, toggleSubscribe],
  );

  return (
    <OverlayContext.Provider value={overlays}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
      {children}
      <Footer />
    </OverlayContext.Provider>
  );
}
