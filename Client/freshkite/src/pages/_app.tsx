import { LoginProvider } from "../context/logincontext";
import {UserProvider } from "../context/userContent";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoginProvider>
      <UserProvider>
          <Component {...pageProps} />
      </UserProvider>
    </LoginProvider>
    
  )

}
