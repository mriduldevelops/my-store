"use client";

import { Menu } from "lucide-react";

export default function MobileNav() {
  return (
    <button className="lg:hidden">
      <Menu size={24} />
    </button>
  );
}