import GlobalError from "../components/common/gobalError";
import { ErrorProvider } from "../context/errorContext";
import { LoginProvider } from "../context/logincontext";
import {UserProvider } from "../context/userContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorProvider>
    <LoginProvider>
      <UserProvider>
          <GlobalError />
          <Component {...pageProps} />
      </UserProvider>
    </LoginProvider>
    </ErrorProvider>
    
  )

}
