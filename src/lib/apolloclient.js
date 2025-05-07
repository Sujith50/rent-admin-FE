const { ApolloClient, InMemoryCache } = require("@apollo/client");

const Userverify = () => {
  const server = typeof window !== "undefined";
  if (server) {
    const user = localStorage?.getItem("istenant");
    return user;
  }
};

const client = new ApolloClient({
  // uri: "http://localhost:4000",
  // uri: "http://192.168.1.6:4000/",
  uri: "http://192.168.1.12:4000/graphql",
  cache: new InMemoryCache(),
  headers: { Authorization: Userverify() },
});
export default client;
