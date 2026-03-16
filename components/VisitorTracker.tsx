"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    void fetch("/api/visitor", {
      method: "POST",
    });
  }, []);

  return null;
}
