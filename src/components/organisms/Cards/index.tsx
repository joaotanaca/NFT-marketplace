import Card from "molecules/Card";
import { AssetResponse } from "lib/asset";
import React, { useMemo } from "react";

import { Container } from "./styles";

type PropsT = { cards?: AssetResponse[] };

const Cards: React.FC<PropsT> = ({ cards }) => {
    const renderCards = useMemo(
        () =>
            cards?.map((card) => (
                <Card
                    data={card}
                    className="2xl:col-span-2 col-span-3"
                    key={card.asset_id}
                />
            )),
        [cards],
    );
    return <Container>{renderCards}</Container>;
};

export default Cards;
