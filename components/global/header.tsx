import dynamic from "next/dynamic";
import Link from "next/link";
const ToggleTheme = dynamic(() => import("../ui/toggle-theme"), {
  ssr: false,
});

import SearchBar from "../ui/search-bar";

const RegisterPopup = dynamic(() => import("../auth/register-popup"), {
  ssr: false,
});
const LogoutPopup = dynamic(() => import("../auth/logout-popup"), {
  ssr: false,
});
const LoginPopup = dynamic(() => import("../auth/login-popup"), { ssr: false });

import { readUserSession } from "@/utils/server/actions";
import AvatarComponent from "../user/avatar-component";

export default async function Header() {
  const { data } = await readUserSession();

  if (data.session?.user) {
    return (
      <header className="container flex items-center justify-between h-12 mx-auto mt-3 mb-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-mono text-2xl font-bold">
            MONO
          </Link>
          {/* <SearchBar /> */}
        </div>

        <div className="flex items-center gap-3">
          <ToggleTheme />
          <AvatarComponent />
        </div>
      </header>
    );
  } else {
    return (
      <header
        className="container flex items-center justify-between h-12 mx-auto mt-3 mb-10"
        suppressHydrationWarning
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-2 py-2 font-mono text-2xl font-bold leading-none rounded-md text-background bg-primary"
          >
            MONO
          </Link>
          {/* <SearchBar /> */}
        </div>

        <div className="flex items-center gap-3">
          <ToggleTheme />
          <LoginPopup />
          <RegisterPopup />
        </div>
      </header>
    );
  }
}
