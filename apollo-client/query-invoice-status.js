require('cross-fetch/polyfill');
const { gql, ApolloClient, InMemoryCache } = require('@apollo/client/core');

const apiUrl = 'https://api.staging.galoy.io/graphql';

const query = gql`
  query PaymentStatusQuery($input: LnInvoicePaymentStatusInput!) {
    lnInvoicePaymentStatus(input: $input) {
      status
    }
  }
`;

const variables = {
  input: {
    paymentRequest: "<paymentRequest del procedimiento anterior>",
  }
};

(async () => {
  try {
    const client = new ApolloClient({ uri: apiUrl, cache: new InMemoryCache() });
    const result = await client.query({ query, variables });
    console.log(JSON.stringify(result, null, 4))
  } catch (e) {
    console.error(JSON.stringify(e, null, 4))
  }
})();
