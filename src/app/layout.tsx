"use client";

import "../assets/globals.css";
import {
  FluentProvider,
  Theme,
  createLightTheme,
  createDarkTheme,
  BrandVariants,
} from "@fluentui/react-components";

import { themeToken } from "@/config/customTheme";

const customTheme: BrandVariants = {
  10: "#020402",
  20: "#101C13",
  30: "#172E1E",
  40: "#1B3C26",
  50: "#1F4A2D",
  60: "#225835",
  70: "#25673D",
  80: "#287746",
  90: "#2B864E",
  100: "#2D9656",
  110: "#2EA75F",
  120: "#30B768",
  130: "#31C871",
  140: "#32D97A",
  150: "#5DE78F",
  160: "#99F0B2",
};

const lightTheme: Theme = {
  ...createLightTheme(customTheme),
  ...themeToken,
};

const darkTheme: Theme = {
  ...createDarkTheme(customTheme),
  ...themeToken,
};

darkTheme.colorBrandForeground1 = customTheme[110];
darkTheme.colorBrandForeground2 = customTheme[120];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <div id="global-background" className="flex-1"></div>
        <FluentProvider theme={lightTheme} className="p-8">
          {children}
        </FluentProvider>
      </body>
    </html>
  );
}
