import axios from "axios";
import { getAuthHeader } from "utils/auth";

export const serverAxios = axios.create({ baseURL: "http://localhost:8001" });

export const fetcher = (url) => serverAxios.get(url).then((res) => res.data);

export const authFetcher = (url) => serverAxios.get(url, getAuthHeader()).then((res) => res.data);
