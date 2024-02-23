import type { Metadata } from "next";
import "./globals.css";
import React, {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Sphere Engine Containers",
  description: "Demo app for Sphere Engine Containers",
};

export default function RootLayout({children}: Readonly<{children: ReactNode; }>) {
  return (
    <html lang="en">
      <body>
      {children}
      </body>
    </html>
  );
}
