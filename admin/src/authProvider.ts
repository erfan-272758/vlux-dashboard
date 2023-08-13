import { AuthProvider, HttpError, fetchUtils } from "react-admin";

const apiUrl = process.env.API_URL;

const httpReq = async (
  url: string,
  options: fetchUtils.Options & { data?: object } = {}
) => {
  if (!options.headers)
    options.headers = new Headers({
      accept: "application/json",
      response: "json",
    });

  const response = await fetchUtils.fetchJson(url, {
    ...options,
    body: options.data ? JSON.stringify(options.data) : options.body,
  });
  return response.json;
};

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const data = await httpReq(`${apiUrl}/token/`, {
      method: "POST",
      data: {
        username,
        password,
      },
    });

    if (data) {
      // eslint-disable-next-line no-unused-vars
      let { access_token } = data;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", access_token);
      return Promise.resolve();
    }

    throw new HttpError("Unauthorized", 401, {
      message: "Invalid username or password",
    });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
