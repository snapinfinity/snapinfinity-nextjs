import { Anek_Latin } from "next/font/google";

// One variable family. The width axis does the work a second typeface usually would:
// wide and heavy for display (like "SNAP"), light and spaced for labels (like "INFINITY").
export const anek = Anek_Latin({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-anek",
  display: "swap",
});
