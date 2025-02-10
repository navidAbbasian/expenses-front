"use client";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ReactQueryClientProvider from "./react-query/ReactQueryClientProvider";
import ThemeProvider from "./theme/ThemeProvider";

interface IProps {
  children?: ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    // <ErrorBoundary FallbackComponent={GlobalError}>
      <ReactQueryClientProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ReactQueryClientProvider>
    // </ErrorBoundary>
  );
}
