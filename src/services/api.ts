import axios from "axios";
import { base } from "lib/asset";

const api = axios.create({ baseURL: base });

export default api;
