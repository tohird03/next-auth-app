"use client"

import Header from "@/components/Header/Header";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AppLayout ({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null
}>) {
  return (
    <SessionProvider session={session}>
      <Header />
      {children}
    </SessionProvider>
  );
};
