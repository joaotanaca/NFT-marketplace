import Card from "molecules/Card";
import { AssetResponse } from "lib/asset";
import React, { useCallback, useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Container } from "./styles";
import { useAssets } from "context/assets";
import { useTheme } from "styled-components";
import { Text } from "components/atoms";
import Modal from "components/molecules/Modal";
import Image from "next/image";

type PropsT = { cards?: AssetResponse[] };

const Cards: React.FC<PropsT> = ({ cards }) => {
    const { loading, pages, filter, handleFilters } = useAssets();
    const theme = useTheme();
    const [card, setCard] = useState<string | null>(null);

    const handleShowModal = useCallback(
        (card: AssetResponse) => setCard(card?.data?.img),
        [],
    );

    const handleHiddenModal = useCallback(() => setCard(null), []);

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
                        onClick={() => handleShowModal(card)}
                        data={card}
                        className="xl:col-span-2 col-span-3"
                        key={card.asset_id}
                    />
                ))
            ),
        [cards, handleShowModal],
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
            {card ? (
                <Modal secondButton={{ click: handleHiddenModal }}>
                    <div className="w-full flex flex-col items-center gap-4">
                        <Text className="font-bold text-2xl">
                            Confirm purchase?
                        </Text>
                        <div className="w-full">
                            <Image
                                src={`https://ipfs.atomichub.io/ipfs/${card}`}
                                alt="card-image"
                                width={178}
                                height={252}
                                layout="responsive"
                            />
                        </div>
                    </div>
                </Modal>
            ) : null}
        </Container>
    );
};

export default Cards;
