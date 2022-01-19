import GlobalProvider from "components/atoms/GlobalProvider";
import { ThemeProvider } from "context/theme";
import type { AppProps } from "next/app";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <GlobalProvider>
                <Component {...pageProps} />
            </GlobalProvider>
        </ThemeProvider>
    );
}

export default MyApp;
