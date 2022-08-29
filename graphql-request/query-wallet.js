const { request, gql } = require('graphql-request');

const apiUrl = 'https://api.staging.galoy.io/graphql';

const query = gql`
  query accountDefaultWallet($username: Username!, $walletCurrency: WalletCurrency) {
    accountDefaultWallet(username: $username, walletCurrency: $walletCurrency) {
      id
      walletCurrency
    }
  }
`;

const variables = { username: '<su nombre de usuario en testnet>', walletCurrency: 'USD' };

(async () => {
  try {
    const result = await request(apiUrl, query, variables);
    console.log(JSON.stringify(result, null, 4))
  } catch (e) {
    console.error(e)
  }
})();
