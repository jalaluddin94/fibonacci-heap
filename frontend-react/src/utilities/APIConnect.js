// import history from "./history";
import {getItem} from "./Storage";

const axios = require("axios").default;

axios.interceptors.request.use(
    function(config){
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
          } else {
            config.headers["Content-Type"] = "application/json";
        }

        if (getItem("access_token")) {
          config.headers.Authorization = "Bearer " + getItem("access_token");
        }

        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
  function(response){
    return response;
  },
  function(error){
    if(error.request.responseType === 'blob'){
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
          let a = reader.result;
            error.response.data = a;
            let customError = {
              code: error.response ? error.response.status : 500,
              message: error.response ? error.response.statusText : "Internal Error",
              data: error.response ? error.response.data : {}
            };

            // if (customError.code === 401) {
            //   history.replace("/error/401");
            // } else if (customError.code === 403) {
            //   history.replace("/error/403");
            // } else if (customError.code === 404) {
            //   history.replace("/error/404");
            // } else if (customError.code === 500) {
            //   history.replace("/error/500");
            // }
            
            resolve(Promise.reject(customError));
        };

        reader.onerror = () => {
            reject(error);
        };

        reader.readAsText(error.response.data);
      })
    }

    let customError = {
      code: error.response ? error.response.status : 500,
      message: error.response ? error.response.statusText : "Internal Error",
      data: error.response ? error.response.data : {}
    };

    // if (customError.code === 401) {
    //   history.replace("/error/401");
    // } else if (customError.code === 403) {
    //   history.replace("/error/403");
    // } else if (customError.code === 404) {
    //   history.replace("/error/404");
    // } else if (customError.code === 500) {
    //   history.replace("/error/500");
    // }

    return Promise.reject(customError);
  }
);

const decode = obj => {
    try {
      return new URLSearchParams(obj).toString();
    } catch (error) {
      return false;
    }
};

export async function RequestGet(uri, query, config) {
    if (query) {
      query = "?" + decode(query);
    }
    var url =
      uri.indexOf("https://") === 0 || uri.indexOf("http://") === 0
        ? uri
        : process.env.REACT_APP_URL_API + uri;
    return await axios.get(url + (query || ""), config);
}

export async function RequestPost(uri, data, config) {
  var url =
    uri.indexOf("https://") === 0 || uri.indexOf("http://") === 0
      ? uri
      : process.env.REACT_APP_URL_API + uri;
  return await axios.post(url, data, config);
}

export async function RequestPut(uri, data) {
  var url =
    uri.indexOf("https://") === 0 || uri.indexOf("http://") === 0
      ? uri
      : process.env.REACT_APP_URL_API + uri;
  return await axios.put(url, data);
}

export async function RequestDelete(uri){
  var url =
    uri.indexOf("https://") === 0 || uri.indexOf("http://") === 0
      ? uri
      : process.env.REACT_APP_URL_API + uri;
  return await axios.delete(url);
}