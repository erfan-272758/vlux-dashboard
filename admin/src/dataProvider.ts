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
      params.data.download = 0;
      params.data.upload = 0;
      if (params.data.expire_at !== undefined)
        params.data.expire_at = new Date(params.data.expire_at).toISOString();
      else params.data.expire_at = 0;
      params.data.max_traffic *= 1024 ** 3;

      if (!params.data.password) delete params.data.password;
      if (!params.data.username) delete params.data.username;
    }
    return {
      data: await httpReq(`${apiUrl}/${resource}/`, {
        method: "POST",
        body: JSON.stringify(params.data),
      }),
    };
  },
  async delete(resource, params) {
    return {
      data: await httpReq(`${apiUrl}/${resource}/${params.id}/`, {
        method: "DELETE",
      }),
    };
  },
  deleteMany() {
    throw new Error("not implement yet");
  },
  async getList(resource, params) {
    const { page, perPage } = params.pagination;
    const [offset, limit] = [(page - 1) * perPage, perPage];
    const data: any[] = await httpReq(
      queryString.stringifyUrl({
        url: `${apiUrl}/${resource}/`,
        query: { skip: offset, limit, ...(params.filter ?? {}) },
      }),
      {
        method: "GET",
      }
    );

    let total: number;
    try {
      total =
        (await httpReq(`${apiUrl}/${resource}/count/`, { method: "GET" })) ?? 0;
    } catch (err) {
      total = 10000;
    }

    if (resource === "users") {
      data.forEach((d) => {
        d.max_traffic = +(d.max_traffic / 1024 ** 3).toFixed(2);
        d.upload = +(d.upload / 1024 ** 3).toFixed(2);
        d.download = +(d.download / 1024 ** 3).toFixed(2);
        d.expire_at = `${d.expire_at}Z`;
      });
    }
    return { data, total };
  },
  getMany() {
    throw new Error("not implement yet");
  },
  getManyReference() {
    throw new Error("not implement yet");
  },
  async getOne(resource, params) {
    const data = await httpReq(`${apiUrl}/${resource}/${params.id}/`, {
      method: "GET",
    });
    if (resource === "users") {
      data.max_traffic = data.max_traffic / 1024 ** 3;
      data.upload = +(data.upload / 1024 ** 3).toFixed(2);
      data.download = +(data.download / 1024 ** 3).toFixed(2);
      data.expire_at = `${data.expire_at}Z`;
      // const exp = new Date(data.expire_at);
      // if (exp.getTime() <= 0) delete data.expire_at;
    }
    return {
      data,
    };
  },
  async update(resource, params) {
    if (resource === "users") {
      // delete params.data.used_traffic;

      if (params.data.expire_at !== undefined)
        params.data.expire_at = new Date(params.data.expire_at);
      else params.data.expire_at = 0;

      if (params.data.max_traffic !== undefined)
        params.data.max_traffic *= 1024 ** 3;
    }

    return {
      data: await httpReq(`${apiUrl}/${resource}/${params.id}/`, {
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
