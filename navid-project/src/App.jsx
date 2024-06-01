import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NetworkChecker from './components/shared/alerts/NetworkChecker';
import { StaleTime } from './components/shared/global/Global';
import { AppContextProvider } from './context/AppContext';
import { AuthContextProvider } from './context/AuthContext';
import './index.css';
import Router from './routes/routes';
import theme from './theme/theme';

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            staleTime: StaleTime,
            retry: 3,
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ThemeProvider theme={theme}>
                <AppContextProvider>
                    <AuthContextProvider>
                        <NetworkChecker />
                        <Router />
                    </AuthContextProvider>
                </AppContextProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
