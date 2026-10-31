import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/GridContainer.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles/fonts.css";
import SiteShell from "@/components/SiteShell";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "Tabloid",
  description: "Tabloid",
  manifest: "/manifest.json",
  icons: { icon: "/favicon.ico", apple: "/logo192.png" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <div className="App">
            <SiteShell>{children}</SiteShell>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
