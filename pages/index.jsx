import axios from "axios";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Error from "../src/components/errorType/error";
import Loading from "../src/components/loading/Loading";
import { setCookie } from "nookies";

export default function Home() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [bigError, setbigError] = useState("");
  const [removeLoading, setRemoveLoading] = useState(true);

  useEffect(() => {
    const cookies = parseCookies();
    const Token = cookies.nextAuthToken;

    if (Token != undefined) {
      Router.push("/home");
    }
  }, []);

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setRemoveLoading(false);
    signIn(user, password)


    async function signIn(user, password) {
      var data = JSON.stringify({
        user: `${user}`,
        password: `${password}`,
      });

      var config = {
        method: "post",
        url: "https://agille-cred.herokuapp.com/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setCookie(undefined, "nextAuthToken", response.data.token, {
            maxAge: 60 * 60 * 3, //3 Horas
          });

          Router.push("/home");
        })
        .catch(function (error) {
          const catchError = error.response.data.message;
          setbigError(catchError);
          setRemoveLoading(true);
        });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Entre na sua conta
            </h2>
            <Error style={"mt-6 text-center font-bold tracking-tight text-xl text-yellow-500"} texto={bigError} />
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            method="POST"
          >
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="usuario" className="sr-only">
                  Usuario
                </label>
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  autoComplete="usuario"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Usuario"
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="senha" className="sr-only">
                  senha
                </label>
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete="current-senha"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

              <div className="text-sm flex justify-center ">
                <a
                  href="test"
                  className="font-medium text-orange-500 hover:text-orange-400"
                >
                  Esqueceu sua senha?
                </a>
              </div>


            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* <!-- Heroicon name: mini/lock-closed --> */}
                  <svg
                    className="h-5 w-5 text-indigo-100 group-hover:text-indigo-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Entrar
              </button>
            </div>
            {!removeLoading && <Loading />}
          </form>
        </div>
      </div>
    </>
  );
}
