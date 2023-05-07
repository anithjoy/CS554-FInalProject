import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "../components/authContext";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";
import "../styles/globals.css";
import '../styles/login.css'
import '../styles/general.css'

const noAuthRequired = ["/login", "/register", "/reset-password"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
