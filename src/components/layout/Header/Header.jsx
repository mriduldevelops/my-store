"use client";

import { Container } from "@/components/ui";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";

import { selectCartCount } from "@/redux/slices/cartSlice";

import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = useSelector(selectCartCount);
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <MobileNav />

            <Logo />

            <DesktopNav />

            <div className="flex items-center gap-5">
              <SearchButton />
              <CartButton
                  isCartOpen={isCartOpen}
                  setIsCartOpen={setIsCartOpen}
                  cartCount={cartCount}
                />
              <UserMenu />
            </div>
          </div>
        </Container>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
