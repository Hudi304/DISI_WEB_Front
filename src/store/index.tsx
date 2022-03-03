import { init, RematchRootState, RematchDispatch, Models } from "@rematch/core";
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";

// import auth from "./auth";

import login from "./login";

interface RootModel extends Models<RootModel> {
  // auth: typeof auth;
  login: typeof login;
}

type FullModel = ExtraModelsFromLoading<RootModel>;

const models = {
  // auth,
  login,
} as RootModel;

const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin()],
} as any);

export default store;
export type RootDispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
