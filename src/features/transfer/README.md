# Transfer page with components

Used to perform transfers between Polkadot/Kusama and Moonriver/Moonbeam.

#### Dependences

```json
{
  "@polkadot/api": "^9.3.3",
  "@polkadot/extension-dapp": "^0.41.2",
  "@polkadot/extension-inject": "^0.44.6",
  "@polkadot/keyring": "^10.3.1",
  "@polkadot/networks": "^10.3.1",
  "@polkadot/react-identicon": "^2.11.1",
  "@polkadot/ui-settings": "^0.87.5",
  "@polkadot/util": "^10.3.1",
  "@polkadot/util-crypto": "^10.3.1",
  "@talismn/connect-wallets": "^1.2.3"
}
```

#### Dev dependences

```json
{
  "@polkadot/types": "^9.13.6"
}
```

#### `next.config.js`

All are publicRuntimeConfig values:

```javascript
const relayProvider = process.env.RELAY_PROVIDER;
const relayFallbackProviders = process.env.RELAY_FALLBACK_PROVIDERS;
const relayChainName = process.env.RELAY_CHAIN_NAME;
const parachainTeleportId = process.env.PARACHAIN_TELEPORT_ID;
const downwardParachainFee = process.env.DOWNWARD_PARACHAIN_FEE;
const upwardRelayFee = process.env.UPWARD_RELAYCHAIN_FEE;
const relayTransactionFee = process.env.RELAY_TRANSACTION_FEE;
const relayWeightLimit = process.env.RELAY_WEIGHT_LIMIT;
```

#### Envs for Kusama testnet

```dotenv
# Public value, used in polkadot.js. Do not use keys or sensitive data
RELAY_PROVIDER=wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network
# comma-separated fallback providers. Do not use spaces
# optional
RELAY_FALLBACK_PROVIDERS=
# relay chain parameters
RELAY_CHAIN_NAME="Moonbase Alpha relay chain"
PARACHAIN_TELEPORT_ID=1000
# default fees
DOWNWARD_PARACHAIN_FEE=4000000
UPWARD_RELAYCHAIN_FEE=19000000000
RELAY_TRANSACTION_FEE=16400000000
RELAY_WEIGHT_LIMIT=1000000000
```

#### Envs for polkadot testnet

```dotenv
# Public value, used in polkadot.js. Do not use keys or sensitive data
RELAY_PROVIDER=wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network
# comma-separated fallback providers. Do not use spaces
# optional
RELAY_FALLBACK_PROVIDERS=
# relay chain parameters
RELAY_CHAIN_NAME="Moonbase Alpha relay chain"
PARACHAIN_TELEPORT_ID=1000
# default fees
DOWNWARD_PARACHAIN_FEE=4000000
UPWARD_RELAYCHAIN_FEE=19000000000
RELAY_TRANSACTION_FEE=16400000000
RELAY_WEIGHT_LIMIT=1000000000
```

#### Envs for Kusama mainnet

```dotenv
# Public value, used in polkadot.js. Do not use keys or sensitive data
RELAY_PROVIDER=wss://kusama-rpc.polkadot.io
# comma-separated fallback providers. Do not use spaces
# optional
RELAY_FALLBACK_PROVIDERS=wss://kusama.api.onfinality.io/rpc?apikey=
# relay chain parameters
RELAY_CHAIN_NAME="Kusama"
PARACHAIN_TELEPORT_ID=2023
# default fees
DOWNWARD_PARACHAIN_FEE=104000000
UPWARD_RELAYCHAIN_FEE=19000000000
RELAY_TRANSACTION_FEE=60000000
RELAY_WEIGHT_LIMIT=1100000000
```

#### Envs for Polkadot mainnet

```dotenv
# Public value, used in polkadot.js. Do not use keys or sensitive data
RELAY_PROVIDER=wss://rpc.polkadot.io
# comma-separated fallback providers. Do not use spaces
# optional
RELAY_FALLBACK_PROVIDERS=wss://polkadot.api.onfinality.io/rpc?apikey=
# comma-separated fallback urls. Do not use spaces
# relay chain parameters
RELAY_CHAIN_NAME="Polkadot"
PARACHAIN_TELEPORT_ID=2004
# default fees
DOWNWARD_PARACHAIN_FEE=10000000
UPWARD_RELAYCHAIN_FEE=190000000
RELAY_TRANSACTION_FEE=180000000
RELAY_WEIGHT_LIMIT=1100000000
```
