import { RematchDispatch } from "@rematch/core"
// import { getRetailerCategoriesApi, getRetailersApi } from "api/endpoints/retailers.api";
// import { RetailerModel } from "common/models/RetailerModel";

type State = Readonly<{
  // retailersList: RetailerModel[],
  // retailerCategories: string[]
}>

const model = {
  state: {
    retailersList: [],
    retailerCategories: []   
  } as State,
  reducers: {
    loadedRetailersList: (state: State, payload: any): State => ({
      //? 🍎 aici ajunge, pune-l pe state
      ...state,
      // retailersList: payload //🍏 
    }),
    loadedRetailerCategories: (state: State, payload: any): State => ({
      ...state,
      // retailerCategories: payload
    }),
  },
  effects: (dispatch: RematchDispatch<any>) => ({

    //? la asta faci dispatch 
    async fetchAllRetailers() {


      //? wait for API call 
      // const retailers = await getRetailersApi();

      //? dispatch result to make it go in reducer 🍎 
      // dispatch.retailers.loadedRetailersList(retailers)
    },
    async fetchRetailerCategories(payload: string) {
      // const retailerCategories = await getRetailerCategoriesApi(payload);
      // dispatch.retailers.loadedRetailerCategories(retailerCategories)
    },
  }),
}

export default model
