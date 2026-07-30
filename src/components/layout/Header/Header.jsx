import { Container } from "@/components/ui";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <MobileNav />

          <Logo />

          <DesktopNav />

          <div className="flex items-center gap-5">
            <SearchButton />
            <CartButton />
            <UserMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}