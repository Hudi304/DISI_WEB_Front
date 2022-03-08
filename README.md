# README #

## Please base your branches on the dev, Tudor will merge it into master once it's ready!

Production : https://main.d2k4ifw8dsgumv.amplifyapp.com/login

TailWind Cheat Sheet : https://nerdcave.com/tailwind-cheat-sheet

Design : https://www.figma.com/file/wgdgjE585LmVbrRHGTFIyM/DISI---SavingLives?node-id=0%3A1

Swagger : https://matei-anechitei-ds-2.herokuapp.com/swagger-ui/index.html#/

You'll need Node to run this app.

After you clone the repo:
```
 > yarn (or yarn install)
 > yarn start;
```
Regenerate models: 
```
> yarn swagger
```
## It will generate enums, models and Api calls.
- Models : src/common/models
- Enums : src/common/enums
- API_calls : src/api/endpoints
 
 In order to use rematch for state management in your page:
    🍎 you need to create a store for your page (if the api calls are already in store use the ones already there)
#### Ex store/login : 
```
type State = Readonly<{
 login: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
}>;
        
const model = {
  state: {
    login: {},
  } as State,
  reducers: {
    loginLoaded: (state: State, payload: any): State => {
      console.log("📅 REDUCER Login : ", payload);
      return {
        //? 🍎 aici ajunge, pune-l pe state
        ...state,
        login: payload, //🍏
      };
    },
    loadedRetailerCategories: (state: State, payload: any): State => ({
      ...state,
      // retailerCategories: payload
    }),
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    //? la asta faci dispatch
    async login(payload: LoginRequest) {
      //? wait for API call [src\api\endpoints\jwt-authentication-controller.api.ts]
      const loginResponse = await createAuthenticationTokenApi(payload);
      console.log("-----------", loginResponse);
      //? dispatch result to make it go in reducer 🍎
      dispatch.login.loginLoaded(loginResponse);
    },
    async fetchRetailerCategories(payload: string) {
      // const retailerCategories = await getRetailerCategoriesApi(payload);
      // dispatch.retailers.loadedRetailerCategories(retailerCategories)
    },
  }),
};

export default model;
```

Put it in the global store so you can acces it from anywhere:
### store/idnex.tsx

```
import login from "./login";

interface RootModel extends Models<RootModel> {
  login: typeof login;
}

type FullModel = ExtraModelsFromLoading<RootModel>;

const models = {
  login,
} as RootModel;

const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin()],
} as any);

export default store;
export type RootDispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
```

### Back in pages/your-page.tsx
```
type LoginProps = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const LoginComponent: FC<LoginProps> = ({ login }: LoginProps) => {
  return (<div>Your nice looking page</div>)
}

const mapProps = (state: RootState) => ({
   loginResponse: state.login.loginResponse, //? 🍏 aici vine response-ul
});

const mapDispatch = (dispatch: RootDispatch) => ({
  login: dispatch.login.login, //? 🍎  de aici iei fuctia care face API call-ul
});
export const Login = connect(mapProps, mapDispatch)(LoginComponent);
```

### Or, just as well you can use hoooks


```
type LoginProps = {
  itemId: string | null;
};


export const Login: FC<LoginProps> = ({ login }: LoginProps) => {
  //  🍎 just an example you have acces to anyting from the store like this (it's the preffered way industry wide)
  const selectedProducts = useSelector((state: RootState) => state.auditCatalog?.products);
  const updateItemTags = useDispatch<RootDispatch>().auditCatalog.updateItemTags;
  const updateWorkspaceTags = useDispatch<RootDispatch>().auditCatalog.updateWorkspaceTags;

  return (<div>Your nice looking page</div>)
}

```


        
      
