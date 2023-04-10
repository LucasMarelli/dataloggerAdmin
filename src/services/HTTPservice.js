import axios from "axios";
import config from "../config";
function responseIsSuccessful({ status }) {
    let successful = false;
    if (status >= 200 && status < 300) {
        successful = true;
    }
    return successful;
}

class HTTPService {
    constructor(baseRouteUrl) {
        this.http = axios.create();
        this.http.defaults.baseURL = config.url + (baseRouteUrl || "");
        this.http.interceptors.request.use(this.handleRequest);
        this.get = this.createRequestHandler("get");
        this.post = this.createRequestHandler("post");
        this.put = this.createRequestHandler("put");
        this.patch = this.createRequestHandler("patch");
        this.delete = this.createRequestHandler("delete");
    }

    createRequestHandler(verb) {
        return async function (...args) {
            let hasError = false;
            let data = null;
            let statusCode = null;
            let msg = "";
            try {
                const response = await this.http[verb](...args);
                if (!responseIsSuccessful(response)) {
                    throw response
                } else {
                    data = response.data;
                }
                statusCode = response.status;
            } catch (err) {
                hasError = true;
                statusCode = err.status;
                console.error(err)

            }
            return { data, hasError, msg, statusCode };
        };
    }

    setDefaultHeader(header, value) {
        this.http.defaults.headers.common[header] = value;
    }

    setDefaultBaseUrl(url = "") {
        this.http.defaults.baseURL = config.backendUrl + url + "/";
    }


    handleRequest = (config) => {
        const accessToken = this.getAccessToken();
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }

        return config;
    };


    getAccessToken() {
        return localStorage.getItem("jwt");
    }
}

export default HTTPService;