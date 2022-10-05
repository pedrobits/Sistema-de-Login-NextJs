import axios from "axios";
import Router from "next/router";
import { setCookie } from "nookies";

export async function signIn( user, password ) {
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
      console.log(error.response.data.message);
    });
}
