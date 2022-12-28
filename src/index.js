import { Center, Loader } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthProvider";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./routers/AppRouter";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AuthProvider>
        <React.Suspense
          fallback={
            <Center>
              <Loader />
            </Center>
          }
        >
          <AppRouter />
        </React.Suspense>
      </AuthProvider>
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
