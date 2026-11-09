# AuthDiff fixtures

Reproducible baseline and candidate cases for authorization review. Every
normalized case is listed in `manifest.json` with its expected `kind` and
`path`, and `npm test` replays each one through the sibling
`auth-tree-core` engine.

| Case | Expected delta |
| --- | --- |
| `amount-change.json` | Nested `i128` amount changes from 100 to 250 |
| `added-child.json` | A second child invocation appears in order |
| `removed-child.json` | A child invocation disappears from the end |
| `reordered-children.json` | Two siblings swap, reported as two replacements |
| `principal-change.json` | Same credential, different principal |
| `credential-change.json` | Same principal, different credential type |
| `authorization-added.json` | The candidate gains its first entry |
| `authorization-removed.json` | The candidate drops its only entry |

`testnet-approve.json` contains two captured unsigned Stellar testnet
simulations against the native XLM asset contract. The expected change is the
amount argument, from 100 to 250 raw units. The capture records the source
account, ledger numbers, authorization XDR, and expected normalized changes.

Run the backend tests from sibling checkouts to replay the capture offline. Run
`npm test` here to validate the normalized cases. Keep the five AuthDiff
repositories as siblings so `../auth-tree-core` resolves.
