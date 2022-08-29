const { request, gql } = require('graphql-request');

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
    const result = await request(apiUrl, query, variables);
    console.log(JSON.stringify(result, null, 4))
  } catch (e) {
    console.error(e)
  }
})();
