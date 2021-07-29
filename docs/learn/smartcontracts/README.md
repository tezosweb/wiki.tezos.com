---
hide_table_of_contents: true
---
# Smart Contracts on Tezos

In this section, we explain what makes smart contracts on Tezos unique, and go over the powerful high-level languages you can choose from to write those smart contracts.

1. [Michelson](michelson.md)
2. [SmartPy](smartpy.md)
3. [LIGO](ligo.md)
4. [Morley framework](morley-framework/)
   1. [Morley](morley-framework/#morley)
   2. [Lorentz](morley-framework/#lorentz)
   3. [Indigo](morley-framework/#indigo)
   4. [Cleveland](morley-framework/#cleveland)
5. [Archetype](archetype.md)
6. [Formal Verification for Smart Contracts](michelsonandcoq.md)

## Tezos Smart Contracts Overview

Smart contracts are programs that are stored on the blockchain. Once a pre-defined condition in the code is met, the smart contract will execute its functions. While this may sound no different than regular code, the key distinction is that following execution, the smart contract interacts with the blockchain, which then ensures that the transaction takes place in a fully distributed, and trustless environment.

While there exist many resources explaining what smart contracts are and how they work, it is important to emphasize some of the powerful features that make smart contracts on Tezos unique.

Tezos offers a platform to create smart contracts and build decentralized applications that cannot be censored or shut-down by third parties. Furthermore, Tezos facilitates formal verification, a technique used to improve security by mathematically proving properties about programs such as smart contracts. Formal verification methods are commonly used in mission-critical environments including aerospace, nuclear, and semiconductor industries where unexpected code behavior can have tragic and costly consequences.

Since Tezos was designed from the ground up to facilitate formal verification, it helps avoid costly bugs and the contentious debates that follow them.

## High-Level Languages of Tezos

Tezos has several popular high-level languages which offer more approachable syntaxes and familiar developer experience \(e.g. local variables\) compared to writing Michelson directly. While Michelson is the domain-specific smart contract language that was developed for Tezos, SmartPy and LIGO are the most popular and widely-supported languages for writing Tezos smart contracts.

