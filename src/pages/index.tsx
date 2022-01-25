import { Icon, Text } from "components/atoms";
import Cards from "organisms/Cards";
import { useTheme } from "context/theme";
import { useFetch } from "hooks/useSwr";
import { AssetResponse, getAssetCards, getAssetCardsUrl } from "lib/asset";
import type { NextPage } from "next";
import { useMemo } from "react";
import { useTheme as useThemeStyled } from "styled-components";
import Head from "next/head";
import { sort, useAssets } from "context/assets";
import Select, { SingleValue } from "react-select";
import { ButtonOrder } from "styles/pages";
import { CgSortZa, CgSortAz } from "react-icons/cg";

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

    const handleSort = (newValue: SelectType) => {
        handleFilters?.({ sort: newValue?.value });
    };

    const handleOrder = () => {
        switch (filter.order) {
            case "":
                handleFilters?.({ order: "asc" });
                break;
            case "asc":
                handleFilters?.({ order: "desc" });
                break;

            default:
                handleFilters?.({ order: "" });
                break;
        }
    };

    const sortButtonColor = useMemo(
        () =>
            theme !== "dark" && !filter.order
                ? themeStyled.purple
                : themeStyled.white,
        [filter.order, theme, themeStyled.purple, themeStyled.white],
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

    const sortOptions = useMemo(
        () =>
            Object.keys(sort)?.map((name) => ({
                label: sort[name],
                value: name,
            })),
        [],
    );

    const buttonSortClass = useMemo(() => {
        switch (filter?.order) {
            case "asc":
                return "col-span-1 col-start-12 py-1 px-2 rounded-lg justify-self-end asc";
            case "desc":
                return "col-span-1 col-start-12 py-1 px-2 rounded-lg justify-self-end desc";
            default:
                return "col-span-1 col-start-12 py-2 px-3 rounded-lg justify-self-end";
        }
    }, [filter?.order]);

    const sortButtons: { [key: string]: JSX.Element } = useMemo(
        () => ({
            asc: <CgSortZa color={sortButtonColor} size={24} />,
            desc: <CgSortAz color={sortButtonColor} size={24} />,
        }),
        [sortButtonColor],
    );

    const iconsSort = useMemo(
        () => sortButtons[filter.order],
        [filter.order, sortButtons],
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
                <div className="w-full mt-6 mb-4 grid grid-cols-12 gap-4">
                    <Select
                        className="w-full col-span-3"
                        placeholder="Selecione uma coleção"
                        options={[
                            { value: "", label: "Selecione uma coleção" },
                            ...collectionOptions,
                        ]}
                        onChange={handleCollections}
                        isClearable
                    />
                    <Select
                        className="w-full col-span-3"
                        placeholder="Selecione um esquema"
                        options={[
                            { value: "", label: "Selecione um esquema" },
                            ...(!filter?.collection_name ? [] : schemasOptions),
                        ]}
                        onChange={handleSchemas}
                        isClearable
                    />
                    <Select
                        className="w-full col-span-3"
                        placeholder="Organizar por"
                        options={[
                            { value: "", label: "Organizar por" },
                            ...sortOptions,
                        ]}
                        onChange={handleSort}
                        isClearable
                    />
                    <ButtonOrder
                        onClick={handleOrder}
                        className={buttonSortClass}
                    >
                        {filter.order ? (
                            iconsSort
                        ) : (
                            <Icon
                                name="grid"
                                color={sortButtonColor}
                                size={13.5}
                            />
                        )}
                    </ButtonOrder>
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
