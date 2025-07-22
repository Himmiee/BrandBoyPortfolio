import { NavComponent } from "@/layout/nav";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavComponent />
      <main>{children}</main>
    </div>
  );
}
