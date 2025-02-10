import type { InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    baseUrlKey?: string;
  }
}
