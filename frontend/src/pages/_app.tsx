import type { AppProps } from "next/app";
import store, {persistedStore} from "@modules/shared/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/themeConfig';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <PersistGate loading={null} persistor={persistedStore}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </PersistGate>
                </ThemeProvider>
            </Provider>
        </AppRouterCacheProvider>
    );
};
export default MyApp;