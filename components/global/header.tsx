import dynamic from "next/dynamic";
import Link from "next/link";
const ToggleTheme = dynamic(() => import("../ui/toggle-theme"), {
  ssr: false,
});
import SearchBar from "../ui/search-bar";
const RegisterPopup = dynamic(() => import("../auth/register-popup"), {
  ssr: false,
});
const LoginPopup = dynamic(() => import("../auth/login-popup"), { ssr: false });

// Supabase Auth
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { type User } from "@supabase/supabase-js";

export default async function Header() {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const { data, error } = await supabase.auth.getSession();
  const user: User | null = data.session?.user ?? null;

  if (!user) {
    return (
      <header
        className="container flex items-center justify-between h-12 mt-3 mb-10"
        suppressHydrationWarning
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-2 py-2 font-mono text-2xl font-bold leading-none rounded-md text-background bg-primary"
          >
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
  } else {
    return (
      <header className="container flex items-center justify-between h-12 mt-3 mb-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-mono text-2xl font-bold">
            MONO
          </Link>
          <SearchBar />
        </div>

        <div className="flex items-center gap-3">
          <ToggleTheme />
          <div>User is logged in!</div>
        </div>
      </header>
    );
  }
}
