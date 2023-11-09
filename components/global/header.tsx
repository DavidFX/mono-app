import dynamic from "next/dynamic";
import Link from "next/link";
import { ToggleTheme } from "../ui/toggle-theme";
import { Button } from "../ui/button";
import SearchBar from "../ui/search-bar";
const RegisterPopup = dynamic(() => import("../auth/register-popup"), {
  ssr: false,
});

export default function Header() {
  return (
    <header
      className="container flex items-center justify-between h-12 mt-3"
      suppressHydrationWarning
    >
      <div className="flex items-center gap-3">
        <Link href="/" className="font-mono text-2xl font-bold">
          MONO
        </Link>
        <SearchBar />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline">Login</Button>
        <RegisterPopup />
      </div>
    </header>
  );
}
