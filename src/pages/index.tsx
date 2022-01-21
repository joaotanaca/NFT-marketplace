import { Icon, Text } from "components/atoms";
import Cards from "organisms/Cards";
import { useTheme } from "context/theme";
import { useFetch } from "hooks/useSwr";
import { AssetResponse, getAssetCards, getAssetCardsUrl } from "lib/asset";
import type { NextPage } from "next";
import { useMemo } from "react";
import { useTheme as useThemeStyled } from "styled-components";
import Head from "next/head";

const Home: NextPage<{ cards: AssetResponse[] }> = ({ cards }) => {
    const { data } = useFetch<{ data: AssetResponse[] }>(
        getAssetCardsUrl,
        {
            params: { limit: 12 },
        },
        cards,
    );
    const { theme } = useTheme();
    const themeStyled = useThemeStyled();
    const sortButtonColor = useMemo(
        () => (theme !== "dark" ? themeStyled.purple : themeStyled.white),
        [theme, themeStyled.purple, themeStyled.white],
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
                <div className="w-full mt-6 mb-4 flex-">
                    <button>
                        <Icon name="grid" color={sortButtonColor} size={13.5} />
                    </button>
                </div>
                <Cards cards={data?.data} />
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
