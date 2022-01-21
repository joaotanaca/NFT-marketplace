import { AssetResponse, getAssetCards } from "lib/asset";
import React, { createContext, useContext, useState } from "react";

export const sort = {
    name: "Id do card",
    price: "Atualizado",
};

type Sort = "name" | "price" | "";

type Order = "asc" | "desc";

type AssetsContextT = {
    search: string;
    order: Order;
    sort: Sort;
    handleFilters?: React.Dispatch<React.SetStateAction<string>>;
};

const AssetsContext = createContext({
    search: "",
    sort: "",
    order: "asc",
    handleFilters: () => {},
} as AssetsContextT);

export const AssetsProvider: React.FC = ({ children }) => {
    const [search, setSearch] = useState<string>("");
    const [order, setOrder] = useState<Order>("asc");
    const [sort, setSort] = useState<Sort>("");

    const handleFilters = setSearch;

    return (
        <AssetsContext.Provider
            value={{
                search,
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
