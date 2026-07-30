import Link from "next/link";
import { navigation } from "@/constants/navigation";

export default function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="transition hover:text-primary"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}