import Header from "@/components/Header/Header";
import React from "react";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
