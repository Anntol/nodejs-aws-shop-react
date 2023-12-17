import React from "react";
import { createRoot } from "react-dom/client";
import App from "~/components/App/App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { theme } from "~/theme";
import axios, { AxiosError } from "axios";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError && error.response) {
      const statusCode: number = error.response.status;
      switch (statusCode) {
        case 401:
          alert("Unauthorized request. Please provide Autorization header");
          break;
        case 403:
          alert("Forbidden request. Please provide valid credentials");
          break;
        default:
          console.error(error.message);
      }
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
      /*queryFn: async ({ queryKey }) => {
        const response = await api.get(queryKey[0] as string);
        return response.data;
      },*/
    },
  },
  /*queryCache: new QueryCache({
    onError: (error: unknown) => {
      console.error("cache error: ", error);
      if (error instanceof AxiosError) {
        alert(`Something went wrong: ${error.message}`);
      }
    },
  }),*/
});

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({ onUnhandledRequest: "bypass" });
}

const container = document.getElementById("app");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
