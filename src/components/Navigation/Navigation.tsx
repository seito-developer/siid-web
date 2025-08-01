'use client';

import React, { useState } from "react";
import useIsPc from "@/hooks/useIsPc";
import NavigationSp from "./NavigationSp/NavigationSp";
import NavigationPc from "./NavigationPc/NavigationPc";

export default function Navigation() {
  const isPc = useIsPc();
  
  return (
    <>{isPc ? <NavigationPc /> : <NavigationSp />}</>
  );
}