import Template from "components/organisms/Template";
import { ThemeProvider } from "context/theme";
import type { AppProps } from "next/app";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Template>
                <Component {...pageProps} />
            </Template>
        </ThemeProvider>
    );
}

export default MyApp;
