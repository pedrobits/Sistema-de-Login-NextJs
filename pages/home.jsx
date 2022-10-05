import Link from "next/link"
import { parseCookies } from "nookies";
import { useEffect } from 'react';
import Router from "next/router";

export default function home() {

    useEffect(() => {
        const cookies = parseCookies()
        const Token = cookies.nextAuthToken
        
        if(!Token) {
            Router.push("/");
        }
      }, []);

    return (
        <>
            <h1>HOME</h1>
            <a href="/logout">Sair</a>
        </>
    )
}