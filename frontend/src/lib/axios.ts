import axios from "axios";
import type { AxiosInstance } from "axios";

interface ImportMetaEnv {
  MODE: "development" | "production";
}

const baseURL: string =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
