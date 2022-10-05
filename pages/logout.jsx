import { destroyCookie, parseCookies } from "nookies";
import { useEffect } from "react";
import Router from "next/router";

export default function Logout() {
  async function FullLogout() {
    destroyCookie({}, 'nextAuthToken', { path: '/'});
    destroyCookie({}, 'nextAuthToken', { path: '/logout'});
    destroyCookie({}, 'nextAuthToken', { path: '/home'});
    // window.localStorage.setItem("logout", Date.now()guardialo on successguardialo on success);

    console.log("Logged out. Redirecting");
    Router.push("/");
    console.log("Successfully logged out!");
  }

  useEffect(() => {
  FullLogout();
  }, []);

  return <p>Saindo...</p>;
}
