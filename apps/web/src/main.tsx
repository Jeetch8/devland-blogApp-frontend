import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryCluent = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <QueryClientProvider client={queryCluent}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
    <Toaster />
  </>
);
