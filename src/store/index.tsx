import { init, RematchRootState, RematchDispatch, Models } from "@rematch/core";
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";

import login from "./login";
import signUp from "./sign-up";
import forgotPassword from "./forgot-password";
import resetPassword from "./reset-password";
import reqDonation from "./req-donation";
import admin from "./admin";

interface RootModel extends Models<RootModel> {
  login: typeof login;
  signUp: typeof signUp;
  forgotPassword: typeof forgotPassword;
  resetPassword: typeof resetPassword;
  reqDonation: typeof reqDonation;
  admin: typeof admin;
}

type FullModel = ExtraModelsFromLoading<RootModel>;

const models = {
  login,
  signUp,
  forgotPassword,
  resetPassword,
  reqDonation,
  admin,
} as RootModel;

const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin()],
} as any);

export default store;
export type RootDispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
