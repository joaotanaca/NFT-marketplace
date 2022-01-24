import { Text } from "components/atoms";
import Button from "components/atoms/Button";
import { AssetResponse } from "lib/asset";
import Image from "next/image";
import React, { HTMLAttributes, useMemo } from "react";
import { Container } from "./styles";

type PropsT = HTMLAttributes<HTMLDivElement> & {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    data: AssetResponse;
};

const Card: React.FC<PropsT> = ({ className, onClick, data, ...props }) => {
    const { img, name } = data.immutable_data;
    return (
        <Container
            className={`${className} rounded-b-2xl p-5 relative`}
            {...props}
        >
            <Image
                src={`https://ipfs.io/ipfs/${img}`}
                alt="card-image"
                width={220}
                height={312}
                layout="responsive"
            />
            <div className="card-body my-7 flex flex-col gap-1">
                <Text className="text-lg font-bold">{name}</Text>
                <div className="flex gap-1">
                    <Text className="text-base font-bold">Rarity:</Text>
                    <Text className="text-base font-normal">
                        {data.data.rarity || "Common"}
                    </Text>
                </div>
            </div>
            <div className="divider absolute" />
            <div className="card-bottom flex justify-between items-center pt-4">
                <Text className="text-base font-normal">Fixed price</Text>
                <Button buttonType="outline" onClick={onClick}>
                    {data.price} WAX
                </Button>
            </div>
        </Container>
    );
};

export default Card;
