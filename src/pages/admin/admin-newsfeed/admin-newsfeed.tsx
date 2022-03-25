import { Card } from "components/card/card";
import { Checkbox } from "components/form-components/checkbox/checkbox";
import { Input } from "components/form-components/input/input";
import { Grid } from "components/grid/grid";
import { useState } from "react";
import { FormProvider } from "react-hook-form";

export const AdminNewsfeed = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  
  return (
    <div className="flex items-center justify-center ">
      <div className="my-profile-page-container-without-grid-template ">
        <div className="my-profile-side-bar debug">
          <div className="grid grid-rows-12">
            <form className="px-10">
              <br/>
              <label className="px-2">Title</label>
              <input
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <br/>
              <br/>
              <label className="px-2">Text</label>
              <input
                name="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <br/>
              <div className="flex items-center justify-center">
                <input
                  className="mt-5 px-3"
                  type="submit"
                  value="Post"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
  
  // <div className="admin-page">
  //   <div className="users-table-container">
  //     <Card className="login-card">
  //       Information Posting
  //       {/* <FormProvider {...}> */}
  //       <input id="title" name="title"></input>
  //       <label for="title"></label>



  //       {/* </FormProvider> */}
  //       {/* <FormProvider {...methods}>
  //         <form onSubmit={methods.handleSubmit(onSubmit)}>
  //           <Input name="email" defaultValue="" label="Email" required={true} />
  //           <Input name="password" defaultValue="Password" label="Password" required={true} />
  //           <div className="login-buttons-bar">
  //             <Button onClick={redirectsToSignUp}>Sign up</Button>
  //             <Button type="submit">Login</Button>
  //           </div>
  //           <button className="reset-pass-btn" type="button" onClick={redirectsToResetPassword}>
  //             Forgot your password?
  //           </button>
  //         </form>
  //       </FormProvider> */}
  //     </Card>
  //   </div>
  // </div>
  
};
