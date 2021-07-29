---
sidebar_position: 1
hide_table_of_contents: true
---

# Privacy

Transactions in blockchains are public by default. A company may not want its past transactions to be a matter of public record, thus solutions to make transactions completely private are important for user adoption. To introduce privacy-preserving transactions, developers in the blockchain ecosystem have offered up many competing solutions with different trade-offs and benefits such as Bulletproofs, Ring Signatures and Zero-knowledge proofs.

**zk-SNARKs**

The Tezos developer community has been particularly interested in enabling private transactions by implementing a specific type of zero-knowledge proof called zk-SNARKs. [**An implementation recently being explored**](https://gitlab.com/tezos/tezos/blob/1cd31972ed2de9deee77592b8ffc5fb3d0170d1a/vendors/ocaml-sapling/README.md) uses the same circuits and trusted setup from Zcash's recent "Sapling" upgrade through OCaml bindings to the original Rust libraries. Sapling is based on a near-optimal proof system developer by Jens Groth and the BLS12-381 pairing-friendly elliptic curve and is over an order of magnitude faster than earlier SNARK implementations \(read more about Sapling [**here**](https://z.cash/upgrade/sapling/)\).

These SNARKs are also much more succint \(as little as 144 bytes\), which may be useful in the future for the recursive SNARK scaling techniques described in the ["Scaling Tezos"](https://hackernoon.com/scaling-tezo-8de241dd91bd) blog post from 2017. This approach is also explored by the [Mina Protocol](https://minaprotocol.com/) and can be implemented to create Tezos sidechains.

