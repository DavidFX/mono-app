import dynamic from "next/dynamic";
import Link from "next/link";
const ToggleTheme = dynamic(() => import("../ui/toggle-theme"), {
  ssr: false,
});
import { Button } from "../ui/button";
import SearchBar from "../ui/search-bar";
const RegisterPopup = dynamic(() => import("../auth/register-popup"), {
  ssr: false,
});
const LoginPopup = dynamic(() => import("../auth/login-popup"), { ssr: false });

export default async function Header() {
  return (
    <header
      className="container flex items-center justify-between h-12 mt-3 mb-10"
      suppressHydrationWarning
    >
      <div className="flex items-center gap-3">
        <Link href="/" className="font-mono text-2xl font-bold">
          MONO
        </Link>
        <SearchBar />
      </div>

      <div className="flex items-center gap-3">
        <ToggleTheme />
        <LoginPopup />

        <RegisterPopup />
      </div>
    </header>
  );
}
