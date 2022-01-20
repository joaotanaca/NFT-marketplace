import React from "react";

type PropsT = {
    size: number;
    color: string;
};

const Circle: React.FC<PropsT> = ({ size, color }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="8.16" cy="8.16" r="8.16" fill={color} />
        </svg>
    );
};

export default Circle;
