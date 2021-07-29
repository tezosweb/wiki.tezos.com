---
sidebar_position: 2
hide_table_of_contents: true
---

# Beacon Wallet

Beacon is the implementation of the [tzip-10 proposal](https://gitlab.com/tzip/tzip/tree/master/proposals/tzip-10), which describes an interaction standard between a wallet and a dApp.

A dApp implementing the [beacon-sdk](https://github.com/airgap-it/beacon-sdk) can build up a channel and send messages over a peer-to-peer communication layer to a wallet. This allows for communication between a mobile wallet and a desktop application. The requests of the dApp are sent to the wallet, signed, and returned to the application. The `beacon-sdk` can also communicate with chrome extensions if compatible ones are installed.

The `beacon-sdk` should allow developers to integrate this functionality with minimal coding, but still be customizable to support more complex flows.

The following resources are very helpful to get started with the Beacon wallet:

1. [Getting Started](https://docs.walletbeacon.io/)
2. [Your first Beacon dApp](https://docs.walletbeacon.io/getting-started/first-dapp/)
3. [Commonly Used Beacon Guides](https://docs.walletbeacon.io/guides/active-account/)

