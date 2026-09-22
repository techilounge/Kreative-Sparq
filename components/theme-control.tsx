"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useState, useSyncExternalStore } from "react";

const choices = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

const subscribe = () => () => {};

export function ThemeControl({ className = "" }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [announcement, setAnnouncement] = useState("");
  const id = useId();

  useEffect(() => {
    if (!mounted || !resolvedTheme) return;
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"][data-live-theme]',
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.dataset.liveTheme = "true";
      document.head.append(meta);
    }
    meta.content = resolvedTheme === "dark" ? "#1A2421" : "#F2F4F0";
  }, [mounted, resolvedTheme]);

  return (
    <div className={`theme-control ${className}`}>
      <label className="sr-only" htmlFor={id}>
        Choose colour theme
      </label>
      <select
        id={id}
        aria-label="Choose colour theme"
        value={mounted ? theme : "system"}
        disabled={!mounted}
        onChange={(event) => {
          const selected = event.target.value;
          setTheme(selected);
          setAnnouncement(`Colour theme changed to ${selected}.`);
        }}
      >
        {choices.map((choice) => (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
