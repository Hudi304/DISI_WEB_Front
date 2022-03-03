# README #

Production : https://main.d2k4ifw8dsgumv.amplifyapp.com/login

You'll need Node to run this app.

After you clone the repo:
  yarn (or yarn install)
  yarn start;

Regenerate models: yarn swagger
 it will generate enums, models and Api calls.
 Models : src/common/models
 Enums : src/common/enums
 API_calls : src/api/endpoints
 
 In order to use rematch for state management in your page:
    🍎 you need to create a store for your page (if the api calls are already in store use the ones already there)
      Ex store/login : 
      'code'
        type State = Readonly<{
         login: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
        }>;
        
      
