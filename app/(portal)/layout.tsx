import { NavComponent } from "@/layout/nav";
import { ReactNode } from "react";
import noisyBg from "@/public/bg/noisy-bg.webp";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Noise overlay */}
      <div
        style={{
          backgroundImage: `url(${noisyBg.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
        className="pointer-events-none absolute inset-0 z-[9999] opacity-30"
      />

      <NavComponent />
      <main>{children}</main>
    </div>
  );
}
