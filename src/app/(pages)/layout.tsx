"use client"

import Header from "@/components/Header/Header";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AppLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Header />
      {children}
    </SessionProvider>
  );
};
