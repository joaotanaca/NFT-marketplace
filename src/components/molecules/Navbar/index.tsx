import Icon from "components/atoms/Icon";
import Input from "components/atoms/Input";
import Text from "components/atoms/Text";
import Toogle from "components/atoms/Toogle";
import { useTheme } from "context/theme";
import Image from "next/image";
import React, { useMemo } from "react";
import { useTheme as useThemeStyled } from "styled-components";

import { Container } from "./styles";

const Navbar: React.FC = () => {
    const { handleTheme, theme } = useTheme();
    const themeStyled = useThemeStyled();
    const toogleValue = useMemo(() => theme === "dark", [theme]);
    return (
        <Container>
            <div className="flex items-center gap-1 h-full">
                <Icon
                    name="leaf"
                    color={
                        theme === "light"
                            ? themeStyled.purple
                            : themeStyled.white
                    }
                    size={14}
                />
                <Text
                    className="text-base font-medium"
                    color={theme === "light" ? "purple" : "white"}
                >
                    Fake Market
                </Text>
                <Text
                    className="flex items-center font-medium text-base ml-20 h-full relative menu-item active"
                    color="lightText"
                    
                >
                    Dashboard
                </Text>
            </div>
            <div className="flex items-center gap-5">
                <Toogle onClick={handleTheme} value={toogleValue} />
                <Input
                    icon={
                        <Icon
                            name="search"
                            color={themeStyled.gray}
                            size={13}
                        />
                    }
                    placeholder="Search artwork"
                />
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8">
                        <Image
                            src="/person.png"
                            alt="user"
                            width={30}
                            height={30}
                            layout="responsive"
                            quality={100}
                        />
                    </div>
                    <Text color="lightText" className="text-sm font-normal">
                        Leslie Alexander
                    </Text>
                </div>
            </div>
        </Container>
    );
};

export default Navbar;
