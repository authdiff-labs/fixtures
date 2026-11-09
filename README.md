# AuthDiff fixtures

`amount-change.json` contains a synthetic nested authorization case.
`testnet-approve.json` contains two captured unsigned Stellar testnet
simulations against the native XLM asset contract. The expected change is the
amount argument, from 100 to 250 raw units. The capture records the source
account, ledger numbers, authorization XDR, and expected normalized changes.

Run the backend tests from sibling checkouts to replay the capture offline.
