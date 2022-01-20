import GlobalProvider from "components/atoms/GlobalProvider";
import Navbar from "components/molecules/Navbar";
import React from "react";

const Template: React.FC = ({ children }) => {
    return (
        <>
            <GlobalProvider>
                <Navbar>{children}</Navbar>
            </GlobalProvider>
        </>
    );
};

export default Template;
