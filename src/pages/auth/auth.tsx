
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { apiConfig } from "api/msalConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthProps = {
}

const loginRequest = {
  scopes: ["openid", ...apiConfig.b2cScopes],
};


export const AuthPage = (props: AuthProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const navigate = useNavigate()

  // useEffect(() => {
  //   let interactionInProgress = Object.keys(sessionStorage).toString().includes('interaction.status')
  //   let accounts = instance.getAllAccounts();
  //   if (isAuthenticated) {
  //     navigate("/main/dashboard");
  //   } else if (accounts.length > 0) {
  //     instance.acquireTokenSilent({
  //       ...loginRequest,
  //       account: accounts[0],
  //     });
  //   } else if (!interactionInProgress) {
  //     instance.loginRedirect(loginRequest);
  //   }
  // }, [isAuthenticated, navigate, instance]);

  return (
    <div className="grid justify-center items-center h-screen text-headline bg-gray-50">
      Loading...
    </div>
  )
};
