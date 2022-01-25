import { AssetResponse, getAssetCards, getAssetCardsUrl } from "lib/asset";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import api from "services/api";

export const sort: { [key: string]: string } = {
    asset_id: "Id do card",
    updated: "Atualizado",
    name: "Nome",
    transferred: "Transferido",
    template_mint: "template_mint",
    minted: "minted",
};

type AssetsContextT = {
    collections: string[];
    schemas: string[];
    filter: { [key: string]: any };
    assets?: AssetResponse[];
    search: string;
    loading: boolean;
    handleFilters?: (filter: any) => void;
};

const AssetsContext = createContext({
    collections: [],
    schemas: [],
    filter: null,
    assets: null,
    search: "",
    loading: false,
    handleFilters: () => {},
} as unknown as AssetsContextT);

export const AssetsProvider: React.FC = ({ children }) => {
    const [filter, setFilter] = useState<any>({
        collection_name: "",
        schema_name: "",
        order: "",
        sort: "",
        match: "",
    });
    const [assets, setAssets] = useState<AssetResponse[]>([]);
    const [collections, setCollections] = useState<string[]>([]);
    const [schemas, setSchemas] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const getAssets = useCallback(async () => {
        try {
            setAssets([]);
            setLoading(true);
            const {
                data: { data },
            } = await api.get(getAssetCardsUrl, {
                params: {
                    limit: 10,
                    page: 1,
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
    }, [filter.collection_name]);

    useEffect(() => {
        getAssets();
    }, [filter, getAssets]);

    useEffect(() => {
        setLoading(true);
        api.get("/collections").then(({ data: { data } }) => {
            const collections = data?.map(
                ({ collection_name: name_collection }: any) =>
                    name_collection || [],
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
                search: "",
                loading,
                handleFilters,
            }}
        >
            {children}
        </AssetsContext.Provider>
    );
};

export const useAssets = () => useContext(AssetsContext);
