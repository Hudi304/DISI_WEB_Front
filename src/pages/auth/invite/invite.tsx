import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, RootDispatch } from "store";

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

// const loginRequest = {
//   scopes: ["openid", ...apiConfig.b2cScopes],
// };

const InviteComponent: FC<Props> = ({ addMemberWorkspace }: Props) => {
  // useEffect(() => {
  //   let interactionInProgress = Object.keys(sessionStorage).toString().includes('interaction.status')
  //   if (isAuthenticated) {
  //     addMemberWorkspace(token || "").then(() => {
  //       navigate("/main/dashboard");
  //     });
  //   } else if (!interactionInProgress) {
  //     instance.loginRedirect(loginRequest);
  //   }
  // }, [isAuthenticated, navigate, instance, addMemberWorkspace, token]);

  return <div className="grid justify-center items-center h-screen text-headline bg-gray-50">Loading...</div>;
};

const mapProps = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({
  addMemberWorkspace: dispatch.workspaces.addMemberWorkspace,
});

export const Invite = connect(mapProps, mapDispatch)(InviteComponent);
