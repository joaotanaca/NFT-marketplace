import { GlobalProvider } from "components/atoms";
import Navbar from "molecules/Navbar";
import React from "react";

const Template: React.FC = ({ children }) => {
    return (
        <>
            <GlobalProvider>
                <Navbar />
                {children}
            </GlobalProvider>
        </>
    );
};

export default Template;
