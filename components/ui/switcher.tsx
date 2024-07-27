"use client";

import { Select } from "@headlessui/react";
import { useTheme } from "next-themes";

export default function Switcher() {
  const theme = useTheme();

  const setTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    theme.setTheme(e.target.value);
  };

  return (
    <Select
      onChange={(e) => setTheme(e)}
      name="status"
      aria-label="Project status"
      defaultValue={theme.theme}
      className={"text-white bg-red-600 rounded-md px-2 py-1"}
    >
      <option value={theme.systemTheme}>System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </Select>
  );
}
