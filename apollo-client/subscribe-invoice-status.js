const WebSocket = require('ws');
const { WebSocketLink } = require('@apollo/client/link/ws')
const { gql, ApolloClient, InMemoryCache } = require('@apollo/client/core');

const apiUrl = 'wss://api.staging.galoy.io/graphql';

const query = gql`
  subscription PaymentStatusQuery($input: LnInvoicePaymentStatusInput!) {
    lnInvoicePaymentStatus(input: $input) {
      errors {
        message
      }
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
    const wsLink = new WebSocketLink({
      uri: apiUrl,
      webSocketImpl: WebSocket,
      options: {
        reconnect: true,
        reconnectionAttempts: 3,
        lazy: true
      }
    });
    const client = new ApolloClient({ link: wsLink, cache: new InMemoryCache() });
    const result = client.subscribe({ query, variables });
    result.subscribe({
      next: (data) => console.log('nuevos datos', data),
      error: (e) => console.error(e)
    })
  } catch (e) {
    console.error(e)
  }
})();
