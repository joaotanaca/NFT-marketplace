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
    schemas: string[];
    filter: { [key: string]: any };
    assets?: AssetResponse[];
    search: string;
    order: Order;
    sort: Sort;
    handleFilters?: (filter: any) => void;
};

const AssetsContext = createContext({
    collections: [],
    schemas: [],
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
            params: {
                limit: 10,
                page: 1,
                collection_name: filter.collection_name,
                schema_name: filter.schema_name,
            },
        },
        {},
    );

    const {
        data: { data: collectionsResult },
    } = useFetch("/collections", {}, []);

    const {
        data: { data: schemas },
    } = useFetch(
        "/schemas",
        {
            params: { collection_name: filter.collection_name },
        },
        [],
    );

    // const getCollectionFilters = useCallback(async () => {
    //     try {
    //         const {
    //             data: { data: filters },
    //         } = await axios.get(
    //             `https://wax.api.atomichub.io/v1/data/filters/${filter.collection_name}`,
    //         );

    //         const collection_filters: { [key: string]: any } = {};

    //         filters?.forEach(({ attribute, values }: Filters) => {
    //             collection_filters[attribute] = values;
    //         });

    //         handleFilters({ filter: collection_filters });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, [filter.collection_name]);

    const handleFilters = (filter: any) => {
        setFilter((prev: any) => ({ ...prev, ...filter }));
    };

    const collectionsMap = useMemo(
        () =>
            collectionsResult?.map(
                ({ collection_name: name_collection }: any) =>
                    name_collection || [],
            ),
        [collectionsResult],
    );

    const schemasMap = useMemo(
        () => schemas?.map(({ schema_name }: any) => schema_name) || [],
        [schemas],
    );

    // useEffect(() => {
    //     if (filter.collection_name) getCollectionFilters();
    // }, [filter.collection_name, getCollectionFilters]);

    return (
        <AssetsContext.Provider
            value={{
                collections: collectionsMap,
                schemas: schemasMap,
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
