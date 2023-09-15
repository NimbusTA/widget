# Nimbus Liquid Staking Frontend

A frontend for Nimbus liquid staking KSM\DOT. Features staking, unstaking, and transferring tokens from relay chain to
parachain and vise versa.

It features the standard Lido frontend stack including Next.js, SWR, ethers, Lido UI, styled-components, and
includes additional blockchain-related library Polkadot-JS.

Nimbus KSM\DOT liquid staking works with two chains - substrate-based network (Kusama\Polkadot) called relay chain, and
ethereum-compatible Moonriver\Moonbeam network (Parachain). Moonriver is where all staking / unstaking takes place.
The relay chain is used mostly for transferring KSM\DOT tokens to the Moonriver network.

### Pre-requisites

- Node.js v14+
- Yarn package manager

### Environment variables

.env.moonbase - used for development chain deployment and testing
.env.moonriver - used for staging and production deployment

Each .env.\* config should define:
(Example env variables are used in moonbase testnet deployment and local testing)

```shell
# supported networks for connecting wallet
SUPPORTED_CHAINS=1287

# this chain uses when a wallet is not connected
DEFAULT_CHAIN=1287

# moonriver chain explorer link
EXPLORER_URL=<MOONRIVER_EXPLORER>

# custom endpoint for aggregating additional data
STATISTICS_URL=<STATS_ENDPOINT>

# provider urls
# Public value, used in polkadot.js. Do not use keys or sensitive data
RELAY_PROVIDER=wss://rpc.polkadot.io
# Internal value. Is not exposed to browser
PARACHAIN_API_RPC=https://rpc.api.moonbeam.network
# Public value, used in metamask. Do not use keys or sensitive data
PARACHAIN_PUBLIC_RPC=https://rpc.api.moonbeam.network

# comma-separated fallback providers. Do not use spaces
# optional
RELAY_FALLBACK_PROVIDERS=
PARACHAIN_FALLBACK_RPC=

# relay chain parameters
RELAY_CHAIN_NAME="Moonbase Alpha relay chain" # used in text and descriptions
PARACHAIN_TELEPORT_ID=1000 # moonbase teleport id

# default fees
DOWNWARD_PARACHAIN_FEE=4000000
UPWARD_RELAYCHAIN_FEE=19000000000
RELAY_TRANSACTION_FEE=16400000000
RELAY_WEIGHT_LIMIT=1000000000
PARACHAIN_TRANSACTION_FEE=3500000

# parachain parameters
PARACHAIN_NAME="Moonbase Alpha" # used in text and descriptions
PARACHAIN_ID=1287 # moonbase id

# symbols
NATIVE_TOKEN=KSM # relay chain token symbol
XC_TOKEN=vKSM # wraped token symbol
LIQUID_TOKEN=nKSM # liquid token symbol
PARACHAIN_TOKEN=MOVR # native parachain token

# contract addresses deployed in selected parachain
XC_TOKEN_ADDRESS=0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080
NATIVE_TOKEN_ADDRESS=0x0000000000000000000000000000000000000802
XTOKENS_ADDRESS=0x0000000000000000000000000000000000000804
LIQUID_TOKEN_ADDRESS=<nKSM_address>

# comma-separated trusted hosts for Content Security Policy. Do not use spaces
CSP_TRUSTED_HOSTS=https://moonbase.moonscan.io,wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network,https://rpc.testnet.moonbeam.network,wss://wss.testnet.moonbeam.network

# put "true" enable report only mode for CSP
# optional
CSP_REPORT_ONLY=
```

## Testnet and local testing

Development network with production build. Used for testing and deploying.

Step 1. Fill out the `.env.moonbase`.

Step 2. Build and start the production server

If you are using Windows, run `npm install -g win-node-env` before executing `yarn start`.

```bash
yarn build && yarn start
```

## Mainnet

Mainnet network with production build. Used for staging and production.

Step 1. Fill out the `.env.moonriver`.

Step 2. Build and start the production server

If you are using Windows, run `npm install -g win-node-env` before executing `yarn start`.

```bash
yarn build && yarn start
```

## Docker Setup

Step 1. Build container: `docker build -t kusama-staking-widget .`

Step 2. Run container: ` docker run --publish 3000:3000 --env-file=.env.moonbase kusama-staking-widget`

## Release flow

To create new release:

1. Merge all changes to the `main` branch
2. Navigate to Repo => Actions
3. Run action "Prepare release" action against `main` branch
4. When action execution is finished, navigate to Repo => Pull requests
5. Find pull request named "chore(release): X.X.X" review and merge it with "Rebase and merge" (or "Squash and merge")
6. After merge release action will be triggered automatically
7. Navigate to Repo => Actions and see last actions logs for further details
