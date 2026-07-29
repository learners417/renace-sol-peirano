"use client";
import { useEffect } from "react";
import { installDomGuard } from "@/lib/domGuard";
export function Guard() {
  useEffect(() => { installDomGuard(); }, []);
  return null;
}
