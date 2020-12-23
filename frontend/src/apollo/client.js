import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      " https://3yb4blwpqnawvi3wnfcbwso5ia.appsync-api.us-west-2.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-dwmk6nxukzaf5kgqpem6uuglna", // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})