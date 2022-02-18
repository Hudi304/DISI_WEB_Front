const b2cPolicies = {
  names: {
    signUpSignIn: "",
    editProfile: "",
  },
  authorities: {
    signUpSignIn: {
      authority: "",
    },
    editProfile: {
      authority: "",
    },
  },
  authorityDomain: "",
};

export const msalConfig = {
  auth: {
    clientId: "78fcdfff-a2b7-4c42-87e1-c9a28645c3ea", // This is the ONLY mandatory field; everything else is optional.
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose sign-up/sign-in user-flow as your default.
    knownAuthorities: [b2cPolicies.authorityDomain], // You must identify your tenant's domain as a known authority.
    redirectUri: process.env.REACT_APP_REDIRECT_URI, // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
  },
};

export const apiConfig = {
  b2cScopes: [""],
  webApi: "",
};

export const loginRequest = {
  scopes: ["openid", ...apiConfig.b2cScopes],
};
