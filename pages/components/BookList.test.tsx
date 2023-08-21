// import { server } from "@/mocks/server";
import { server } from "@/mocks/server";
import BookListComponent from "@/pages/components/BookList";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MockedProvider } from "@apollo/react-testing";
import { render, screen, waitFor } from "@testing-library/react";
import { graphql } from "msw";
import { setupServer } from "msw/lib/node";
//Support fetch in Jest
import "whatwg-fetch";

const client = new ApolloClient({
  //   uri: "https://api.github.com/graphql",
  uri: "http://localhost:3000",
  cache: new InMemoryCache({
    resultCaching: false,
    typePolicies: {
      UnconventionalRootQuery: {
        // The RootQueryFragment can only match if the cache knows the __typename
        // of the root query object.
        queryType: true,
      },
    },
  }),
});

const mocks: any = [];

describe("BooList", () => {
  test("Render", async () => {
    render(
      <ApolloProvider client={client}>
        <BookListComponent setData={(): void => {}} />
      </ApolloProvider>
    );

    expect(await screen.findByText("Learn NextJS")).toBeInTheDocument();
  });
  test("Render1", async () => {
    server.use(
      graphql.query("getBooks", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.data({
            books: [],
          })
        );
      })
    );
    render(
      <MockedProvider mocks={mocks}>
        <BookListComponent setData={(): void => {}} />
      </MockedProvider>
    );
    expect(await screen.findByText("No data book!")).toBeInTheDocument();
    // await waitFor(() => screen.getByText("No data book!"));
  });
});
