Object.assign(global, { WebSocket: require('ws') });
const { request, gql } = require('graphql-request');
const { SubscriptionClient } = require('graphql-subscriptions-client');

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
    const client = new SubscriptionClient(apiUrl, {
      reconnect: true,
      lazy: true,
      connectionCallback: (error) => {
        error && console.error(error);
      },
    });

    // llamar subscription.unsubscribe() una vez finalizado el proceso
    const subscription = client
      .request({ query, variables })
      .subscribe({
        next: (data) => console.log('nuevos datos', data),
        error: (e) => console.error(e)
      });
  } catch (e) {
    console.error(e)
  }
})();
