import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { authProvider } from "./authProvider";
import theme from "./utils/theme";
import User from "./user";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    theme={theme}
    title={"title"}
    basename="base name"
  >
    <Resource name="users" {...User} />
  </Admin>
);
