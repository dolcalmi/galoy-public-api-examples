require('cross-fetch/polyfill');
const { gql, ApolloClient, InMemoryCache } = require('@apollo/client/core');

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
    const client = new ApolloClient({ uri: apiUrl, cache: new InMemoryCache() });
    const result = await client.query({ query, variables });
    console.log(JSON.stringify(result, null, 4))
  } catch (e) {
    console.error(e)
  }
})();
