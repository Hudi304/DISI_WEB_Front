import { init, RematchRootState, RematchDispatch, Models } from "@rematch/core";
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";

// import auth from "./auth";

import login from "./login";
import signUp from "./sign-up";
import forgotPassword from "./forgot-password";
import resetPassword from "./reset-password";
import reqDonation from "./req-donation";

interface RootModel extends Models<RootModel> {
  // auth: typeof auth;
  login: typeof login;
  signUp: typeof signUp;
  forgotPassword: typeof forgotPassword;
  resetPassword: typeof resetPassword;
  reqDonation: typeof reqDonation;
}

type FullModel = ExtraModelsFromLoading<RootModel>;

const models = {
  // auth,
  login,
  signUp,
  forgotPassword,
  resetPassword,
  reqDonation,
} as RootModel;

const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin()],
} as any);

export default store;
export type RootDispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
