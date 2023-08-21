import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

const client = new ApolloClient({
  // uri: "https://api.github.com/graphql",
  uri: "http://localhost:3000",
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
