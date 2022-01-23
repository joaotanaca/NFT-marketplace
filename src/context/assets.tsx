import axios from "axios";
import collections from "constants/collections";
import { useFetch } from "hooks/useSwr";
import { AssetResponse, getAssetCards, getAssetCardsUrl } from "lib/asset";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import api from "services/api";

export const sort = {
    name: "Id do card",
    price: "Atualizado",
};

type Filters = {
    attribute: string;
    values: string[];
};

type Sort = "name" | "price" | "";

type Order = "asc" | "desc";

type AssetsContextT = {
    collections: string[];
    filter: { [key: string]: any };
    assets?: AssetResponse[];
    search: string;
    order: Order;
    sort: Sort;
    handleFilters?: React.Dispatch<React.SetStateAction<string>>;
};

const AssetsContext = createContext({
    collections: [],
    filter: null,
    assets: null,
    search: "",
    sort: "",
    order: "asc",
    handleFilters: () => {},
} as unknown as AssetsContextT);

export const AssetsProvider: React.FC = ({ children }) => {
    const [filter, setFilter] = useState<any>({
        collection_name: "",
        schema_name: "",
    });
    const [order, setOrder] = useState<Order>("asc");
    const [sort, setSort] = useState<Sort>("");

    const { data } = useFetch<{ data: AssetResponse[] }>(
        getAssetCardsUrl,
        {
            params: { limit: 10, page: 1 },
        },
        {},
    );

    const {
        data: { data: collectionsResult },
    } = useFetch(
        "/collections",
        {
            data: {
                sort: "volume",
                order: "desc",
                symbol: "WAX",
                after: "1642669200000",
                collection_whitelist: collections.join(","),
            },
        },
        [],
        "post",
    );

    const getCollectionFilters = useCallback(async () => {
        try {
            const { data: filters } = await axios.get(
                `https://wax.api.atomichub.io/v1/data/filters/${filter.collection_name}`,
            );
            const { data: schemas } = await axios.get(
                `https://wax.api.atomichub.io/atomicmarket/v2/stats/schemas/${filter.collection_name}`,
            );
            const collection_filters: { [key: string]: any } = {};
            const schemas_result: string[] = [];

            filters.forEach(({ attribute, values }: Filters) => {
                collection_filters[attribute] = values;
            });

            schemas.results.forEach(
                ({ schema_name }: { schema_name: string }) => {
                    schemas_result.push(schema_name);
                },
            );

            handleFilters({ filter: collection_filters, schemas_result });
        } catch (err) {
            console.error(err);
        }
    }, [filter.collection_name]);

    const handleFilters = (filter: any) => {
        setFilter((prev: any) => ({ ...prev, ...filter }));
    };

    const collectionsMap = useMemo(
        () =>
            collectionsResult?.map(
                ({ collection_name: name_collection }: any) => name_collection,
            ),
        [collectionsResult],
    );

    useEffect(() => {
        if (filter.collection_name) getCollectionFilters();
    }, [filter.collection_name, getCollectionFilters]);

    return (
        <AssetsContext.Provider
            value={{
                collections: collectionsMap,
                assets: data?.data,
                filter,
                search: "",
                sort,
                order,
                handleFilters,
            }}
        >
            {children}
        </AssetsContext.Provider>
    );
};

export const useAssets = () => useContext(AssetsContext);
