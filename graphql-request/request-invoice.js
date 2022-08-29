const { request, gql } = require('graphql-request');

const apiUrl = 'https://api.staging.galoy.io/graphql';

const query = gql`
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
    const result = await request(apiUrl, query, variables);
    console.log(JSON.stringify(result, null, 4))
  } catch (e) {
    console.error(e)
  }
})();
