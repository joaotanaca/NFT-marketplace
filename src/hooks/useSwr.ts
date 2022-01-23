import { AxiosRequestConfig } from "axios";
import api from "services/api";
import useSWR from "swr";

type Method = "get" | "post" | "delete" | "patch";

export function useFetch<Response = any, Error = any>(
    url: string,
    config?: AxiosRequestConfig<any>,
    fallbackData?: any,
    method: Method = "get",
) {
    const { data, error } = useSWR<Response, Error>(
        url,
        async (url) => {
            const { data } = await api[method]<Response>(url, config);

            return data;
        },
        { fallbackData },
    );

    return { data, error };
}
