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
    <div className="my-profile-page-container">
      <div className="my-profile-side-bar debug">
        <div className="grid grid-rows-2">
          <form>
          <label>Title</label>
            <input
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br/>
            <label>Text</label>
            <input
              name="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <br/>
            <input
              type="submit"
              value="Post"
            />
          </form>
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
