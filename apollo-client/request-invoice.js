require('cross-fetch/polyfill');
const { gql, ApolloClient, InMemoryCache } = require('@apollo/client/core');

const apiUrl = 'https://api.staging.galoy.io/graphql';

const mutation = gql`
  mutation createInvoice($input: LnUsdInvoiceCreateOnBehalfOfRecipientInput!) {
    lnUsdInvoiceCreateOnBehalfOfRecipient(input: $input) {
      errors {
        message
      }
      invoice {
        paymentRequest
      }
    }
  }
`;

const variables = {
  input: {
    recipientWalletId: "<wallet id del procedimiento anterior>",
    amount: 1050, // cantidad en centavos
    memo: "Orden # 21 - 10.5 USD" // opcional
  }
};

(async () => {
  try {
    const client = new ApolloClient({ uri: apiUrl, cache: new InMemoryCache() });
    const result = await client.mutate({ mutation, variables });
    console.log(JSON.stringify(result, null, 4))
  } catch (e) {
    console.error(e)
  }
})();
