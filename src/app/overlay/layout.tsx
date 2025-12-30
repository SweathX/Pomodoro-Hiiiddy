import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro Overlay - Hiiiddy",
  description: "Overlay Pomodoro pour OBS",
};

export default function OverlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
