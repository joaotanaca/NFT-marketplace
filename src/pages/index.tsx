import { Icon, Text } from "components/atoms";
import Cards from "organisms/Cards";
import { useTheme } from "context/theme";
import { useFetch } from "hooks/useSwr";
import { AssetResponse, getAssetCards, getAssetCardsUrl } from "lib/asset";
import type { NextPage } from "next";
import { ChangeEvent, useMemo } from "react";
import { useTheme as useThemeStyled } from "styled-components";
import Head from "next/head";
import { useAssets } from "context/assets";
import Select, { SingleValue } from "react-select";

type SelectType = SingleValue<{
    value: string;
    label: string;
}>;

const Home: NextPage<{ cards: AssetResponse[] }> = ({ cards }) => {
    const { collections, filter, schemas, handleFilters } = useAssets();

    const { data } = useFetch<{ data: AssetResponse[] }>(
        getAssetCardsUrl,
        {
            params: {
                limit: 10,
                page: 1,
                collection_name: filter.collection_name,
            },
        },
        cards,
    );
    const { theme } = useTheme();
    const themeStyled = useThemeStyled();

    const handleCollections = (newValue: SelectType) => {
        handleFilters?.({ collection_name: newValue?.value });
    };

    const handleSchemas = (newValue: SelectType) => {
        handleFilters?.({ schema_name: newValue?.value });
    };

    const sortButtonColor = useMemo(
        () => (theme !== "dark" ? themeStyled.purple : themeStyled.white),
        [theme, themeStyled.purple, themeStyled.white],
    );

    const assets = useMemo(() => {
        return data?.data?.map((asset) => ({
            ...asset,
            price: Math.random().toPrecision(3),
        }));
    }, [data]) as unknown as AssetResponse[];

    const collectionOptions = useMemo(
        () => collections?.map((name) => ({ value: name, label: name })) || [],
        [collections],
    );

    const schemasOptions = useMemo(
        () => schemas?.map((name) => ({ value: name, label: name })) || [],
        [schemas],
    );

    return (
        <>
            <Head>
                <title>Fake Market</title>
            </Head>
            <div className="container mx-auto mt-10 px-4">
                <Text className="font-normal text-2xl" color="lightText">
                    NFTs
                </Text>
                <div className="w-full mt-6 mb-4 flex gap-4">
                    <Select
                        className="w-full"
                        placeholder="Selecione uma coleção"
                        options={[
                            { value: "", label: "Selecione uma coleção" },
                            ...collectionOptions,
                        ]}
                        onChange={handleCollections}
                        isClearable
                    />
                    <Select
                        className="w-full"
                        placeholder="Selecione uma coleção"
                        options={[
                            { value: "", label: "Selecione um esquema" },
                            ...schemasOptions,
                        ]}
                        onChange={handleSchemas}
                        isClearable
                    />
                    <button>
                        <Icon name="grid" color={sortButtonColor} size={13.5} />
                    </button>
                </div>
                <Cards cards={assets ?? cards} />
            </div>
        </>
    );
};

export async function getStaticProps() {
    const cards = await getAssetCards();
    return {
        props: { cards }, // will be passed to the page component as props
    };
}

export default Home;
