"use client";

import { usePathname } from "next/navigation";
import Layout from "@/components/layout/Layout";
import ReduxProvider from "@/providers/ReduxProvider";

export default function StudioGate({ children }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  if (isStudioRoute) {
    return children;
  }

  return (
    <ReduxProvider>
      <Layout>{children}</Layout>
    </ReduxProvider>
  );
}
