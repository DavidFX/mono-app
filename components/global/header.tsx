import Link from "next/link";
import { ToggleTheme } from "../ui/toggle-theme";
import { Button } from "../ui/button";
import SearchBar from "../ui/search-bar";

export default function Header() {
  return (
    <header className="container flex items-center justify-between h-12 mt-3">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-lg font-medium ">
          MONO
        </Link>
        <SearchBar />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline">Login</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
}