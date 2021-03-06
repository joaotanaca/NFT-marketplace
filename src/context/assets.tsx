import { AssetResponse, getAssetCardsUrl } from "lib/asset";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import api from "services/api";

export const sort: { [key: string]: string } = {
    asset_id: "Asset Id",
    updated: "Updated",
    name: "Name",
    transferred: "Transferred",
    template_mint: "template Mint",
    minted: "Minted",
};

type AssetsContextT = {
    collections: string[];
    schemas: string[];
    filter: { [key: string]: any };
    assets?: AssetResponse[];
    loading: boolean;
    pages: number;
    handleFilters?: (filter: any) => void;
};

const AssetsContext = createContext({
    collections: [],
    schemas: [],
    filter: null,
    assets: null,
    search: "",
    loading: false,
    pages: 0,
    handleFilters: () => {},
} as unknown as AssetsContextT);

export const AssetsProvider: React.FC = ({ children }) => {
    const [filter, setFilter] = useState<any>({
        collection_name: "",
        schema_name: "",
        order: "",
        sort: "",
        match: "",
        page: 1,
    });
    const [assets, setAssets] = useState<AssetResponse[]>([]);
    const [collections, setCollections] = useState<string[]>([]);
    const [schemas, setSchemas] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(0);

    const getAssets = useCallback(async () => {
        try {
            setAssets([]);
            setLoading(true);
            const {
                data: { data },
            } = await api.get(getAssetCardsUrl, {
                params: {
                    limit: 10,
                    ...filter,
                },
            });
            setAssets(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        api.get("/schemas", {
            params: { collection_name: filter.collection_name },
        }).then(({ data: { data } }) => {
            const schemasMap =
                data?.map(({ schema_name }: any) => schema_name) || [];
            setSchemas(schemasMap);
        });
        if (filter.collection_name) {
            api.get(`/collections/${filter.collection_name}/stats`).then(
                ({ data: { data } }) => {
                    const pagesArround = Math.ceil(data?.assets / 10);
                    setPages(pagesArround);
                },
            );
        } else {
            handleFilters?.({ page: 1 });
        }
    }, [filter.collection_name]);

    useEffect(() => {
        getAssets();
    }, [filter, getAssets]);

    useEffect(() => {
        setLoading(true);
        api.get("/collections").then(({ data: { data } }) => {
            const collections = data?.map(
                ({ collection_name: name_collection }: any) => name_collection,
            );
            setCollections(collections);
        });
        setLoading(false);
    }, []);

    const handleFilters = (filter: any) => {
        setFilter((prev: any) => ({ ...prev, ...filter }));
    };

    return (
        <AssetsContext.Provider
            value={{
                collections,
                schemas,
                assets,
                filter,
                loading,
                pages,
                handleFilters,
            }}
        >
            {children}
        </AssetsContext.Provider>
    );
};

export const useAssets = () => useContext(AssetsContext);
