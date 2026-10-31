"use client";

import { useSyncExternalStore } from "react";
import { formatDate } from "@/lib/format";

const subscribe = () => () => {};

export default function LocalDate({ value }: { value: string }) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return <>{isClient ? formatDate(value) : formatDate(value, "UTC")}</>;
}
