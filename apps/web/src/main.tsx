import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { GlobalContextProvider } from "./context/GlobalContext";

const queryCluent = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <GlobalContextProvider>
      <QueryClientProvider client={queryCluent}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster />
    </GlobalContextProvider>
  </>
);
