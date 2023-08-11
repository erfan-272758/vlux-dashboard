import queryString from "query-string";
import { fetchUtils } from "ra-core";
import { DataProvider } from "react-admin";

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

  // add your own headers here
  (options.headers as Headers).set(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  const response = await fetchUtils.fetchJson(url, {
    ...options,
    body: options.data ? JSON.stringify(options.data) : options.body,
  });
  return response.json;
};

const dataProvider: DataProvider = {
  async create(resource, params) {
    if (resource === "users") {
      params.data.used_traffic = 0;
      if (params.data.expire_at !== undefined)
        params.data.expire_at = new Date(params.data.expire_at);
      else params.data.expire_at = 0;
    }
    return {
      data: await httpReq(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
      }),
    };
  },
  async delete(resource, params) {
    return {
      data: await httpReq(`${apiUrl}/${resource}/${params.id}`, {
        method: "DELETE",
      }),
    };
  },
  deleteMany() {
    throw new Error("not implement yet");
  },
  async getList(resource, params) {
    console.log(params);
    const { page, perPage } = params.pagination;
    const [offset, limit] = [(page - 1) * perPage, perPage];
    const response = await httpReq(
      queryString.stringifyUrl({
        url: `${apiUrl}/${resource}`,
        query: { skip: offset, limit, ...(params.filter ?? {}) },
      }),
      {
        method: "GET",
      }
    );
    return { data: response, total: 10000 };
  },
  getMany() {
    throw new Error("not implement yet");
  },
  getManyReference() {
    throw new Error("not implement yet");
  },
  async getOne(resource, params) {
    return {
      data: await httpReq(`${apiUrl}/${resource}/${params.id}`, {
        method: "GET",
      }),
    };
  },
  async update(resource, params) {
    return {
      data: await httpReq(`${apiUrl}/${resource}/${params.id}`, {
        data: params.data,
        method: "PUT",
      }),
    };
  },
  updateMany() {
    throw new Error("not implement yet");
  },
};

export default dataProvider;
