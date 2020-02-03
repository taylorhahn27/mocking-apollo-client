import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

function School() {
  const { loading, error, data } = useQuery(gql`
    {
      allSchools {
        name
        location
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allSchools.map(({ name, location }) => (
    <div key={name}>
      <p>
        {name}: {location}
      </p>
    </div>
  ));
}

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>4U Schools</h2>
      <School />
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
