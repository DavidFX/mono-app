import { useEffect, useState } from "react";
import { createClient } from "../supabase/client";
import { readUserSession } from "@/utils/server/actions";

export function useUserClient() {
  const supabase = createClient();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [User, setUser] = useState<any>(undefined);

  const checkIfLogged = async () => {
    const session = await readUserSession();
    if (session.data.session?.user) {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.data.session.user.id)
        .single();

      setIsLogged(true);
      setUser(data);
    } else {
      setIsLogged(false);
    }
  };

  useEffect(() => {
    checkIfLogged();
  }, []);

  return [isLogged, User];
}
