import Card from "molecules/Card";
import { AssetResponse } from "lib/asset";
import React, { useMemo } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Container } from "./styles";
import { useAssets } from "context/assets";
import { useTheme } from "styled-components";
import { Text } from "components/atoms";

type PropsT = { cards?: AssetResponse[] };

const Cards: React.FC<PropsT> = ({ cards }) => {
    const { loading, pages, filter, handleFilters } = useAssets();
    const theme = useTheme();

    const renderPagination = useMemo(() => {
        const pagination = [];
        for (let index = 1; index <= pages; index++) {
            pagination.push(
                <Text
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleFilters?.({ page: index })}
                >
                    {index}
                </Text>,
            );
        }
        return pagination;
    }, [handleFilters, pages]);
    const renderCards = useMemo(
        () =>
            !cards?.length ? (
                <div className="col-span-12 flex justify-center default-message">
                    Parece que não existem cards nessa coleção
                </div>
            ) : (
                cards?.map((card) => (
                    <Card
                        data={card}
                        className="2xl:col-span-2 col-span-3"
                        key={card.asset_id}
                    />
                ))
            ),
        [cards],
    );
    return (
        <Container>
            {loading ? (
                <div className="col-span-12 flex justify-center">
                    <AiOutlineLoading3Quarters
                        className="animate-spin"
                        size={35}
                        color={theme.text}
                    />
                </div>
            ) : (
                renderCards
            )}
            {pages > 1 && filter.collection_name ? (
                <div className="col-span-12 flex justify-center gap-4">
                    {renderPagination}
                </div>
            ) : null}
        </Container>
    );
};

export default Cards;
