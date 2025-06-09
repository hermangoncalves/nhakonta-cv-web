import axios from "axios";
import { env } from "@/lib/env";

console.log(env)

export const API = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});
