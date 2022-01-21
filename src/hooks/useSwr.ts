import axios, { AxiosRequestConfig } from "axios";
import useSWR from "swr";

export function useFetch<Response = any, Error = any>(
    url: string,
    config?: AxiosRequestConfig<any>,
    fallbackData?: any,
) {
    const { data, error } = useSWR<Response, Error>(
        url,
        async (url) => {
            const { data } = await axios.get<Response>(url, config);

            return data;
        },
        { fallbackData },
    );

    return { data, error };
}
