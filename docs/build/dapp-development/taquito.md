---
sidebar_position: 1
hide_table_of_contents: true
---
# Taquito

As mentioned in previous sections, the Tezos-node offers a JSON/RPC interface. However, we want to be able to communicate with the _Tezos-node_ **without** using the _Tezos-client_ so that we can write applications and simply hand them over to the client without having to do anything else. 

For that we have [Taquito](https://tezostaquito.io/), a Tezos TypeScript library. You can find the source code in the [official repository](https://github.com/ecadlabs/taquito).

It includes **various features**, among others:

* the **@taquito/taquito** package that builds upon the other packages in the Tezos TypeScript Library Suite and offers higher level utility,
* the **@taquito/rpc** package that wraps the RPC endpoints,
* the **@taquito/signer** package to sign with tezos keys, and
* the **@taquito/tezbridge-wallet**, **@taquito/beacon-wallet**, and **@taquito/temple-wallet** packages implementing the Wallet API.

In addition, it is very well documented. Navigate [here](https://tezostaquito.io/docs/quick_start/) for Taquito's Quick Start documentation, and here for the Taquito [boilerplate](https://github.com/ecadlabs/taquito-boilerplate).

  


