"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "@/redux/features/ui/uiSlice";
import { Button } from "@/components/ui";

export default function TestRedux() {
  const dispatch = useDispatch();

  const isOpen = useSelector(
    (state) => state.ui.isMobileMenuOpen
  );

  return (
    <div className="space-y-4">
      <Button onClick={() => dispatch(toggleMobileMenu())}>
        Toggle Menu
      </Button>

      <p>Menu: {isOpen ? "Open" : "Closed"}</p>
    </div>
  );
}