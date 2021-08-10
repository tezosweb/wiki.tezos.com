---
description: A list of past successful protocol upgrades and their features.
sidebar_position: 4
hide_table_of_contents: true
title: "Past Tezos Amendments"
hide_title: true

---

## Past Tezos Amendments

### \*\*\*\*[**Athens**](https://www.tezosagora.org/proposal/1) **\(Pt24m4xiP\)**

Athens was the first proposed protocol amendment for Tezos. Two proposals -  “[Athens A](https://forum.tezosagora.org/t/athens-a-pt24m4xip/29)” and “[Athens B](https://forum.tezosagora.org/t/athens-b-psd1ynubh/33)” were injected by the development team, [Nomadic Labs](https://blog.nomadic-labs.com/athens-our-proposals-for-the-first-voted-amendment.html) in February 2019. 

Of the two proposals, Athens A sought to increase the gas limit and reduce the roll size required to bake from 10,000 tez to 8,000 tez. Athens B sought to just increase the gas limit. Athens A was autonomously [activated](https://twitter.com/TezosAgoraBot/status/1133901612790034432?s=20) onto the protocol in May 2019. 

For a full list of changes be sure to read the corresponding blog [post](https://blog.nomadic-labs.com/athens-proposals-injected.html) from Nomadic Labs and [reflection](https://medium.com/tqtezos/reflecting-on-athens-the-first-self-amendment-of-tezos-4791ab3b1de1) by Jacob Arluck. 

### [**Babylon**](https://forum.tezosagora.org/t/babylon-2-0-1-psbabym1/1311) **\(PsBABY5nk\)**

The Babylon [proposal](https://forum.tezosagora.org/t/babylon-psbaby5nk/1171) was [injected](https://blog.nomadic-labs.com/babylon-proposal-injected.html) in August 2019 with contributions by development teams Nomadic Labs, Cryptium Labs \(Metastate\), and Marigold. 

Notable changes included a new consensus algorithm variant \(Emmy+\), addition of new Michelson features to aid smart contract developers, an account rehaul that enabled clearer distinction between tz and kt accounts, as well as refinements to the quorum formula and addition of a 5% proposed quorum threshold. 

Babylon was autonomously [activated](https://twitter.com/adrian_brink/status/1185137422432161792?s=20) onto the protocol in October 2019. 

For a full list of changes be sure to read the corresponding blog posts from [Nomadic Labs](https://blog.nomadic-labs.com/babylon-proposal-injected.html), and [Cryptium Labs](https://medium.com/metastatedev/on-babylon2-0-1-58058d9d2106) \(Metastate\). 

### [**Carthage**](https://www.tezosagora.org/proposal/7) **\(PtCarthav\)**

The Carthage [proposal](https://forum.tezosagora.org/t/carthage-ptcarthav/1466) was [injected](https://twitter.com/adrian_brink/status/1204447665230102529?s=20) in December 2019 with contributions by development teams Nomadic Labs and Cryptium Labs \(Metastate\). 

Notable changes included increasing the gas limit per block and operation by 30%, improving the accuracy of the formula used for calculating baking and endorsing rewards, as well as several minor improvements to Michelson. 

Carthage was autonomously [activated](https://twitter.com/tezos/status/1235590757416751105?s=20) onto the protocol in March 2020. 

For a full list of changes be sure to read the corresponding [changelog](https://tezos.gitlab.io/protocols/006_carthage.html#changelog) and blog posts from [Nomadic Labs](https://blog.nomadic-labs.com/carthage-changelog-and-testnet.html) and [Cryptium Labs](https://medium.com/metastatedev/updating-the-potential-carthage-proposal-and-resetting-the-carthagenet-test-network-f413a792571f) \(Metastate\). 

### [**Delphi**](https://www.tezosagora.org/proposal/8) **\(PsDELPH1K\)**

The Delphi [proposal](https://forum.tezosagora.org/t/delphi-psdelph1k/2157) was [injected](https://twitter.com/CryptiumLabs/status/1301819142018826242?s=20) in September 2020 with contributions by development teams Nomadic Labs, Metastate, and Gabriel Alfour. 

Notable changes included improving the performance of the Michelson interpreter, improving gas costs by adjusting the gas model, reducing storage costs by 4x, and various other small fixes. 

Delphi was autonomously [activated](https://twitter.com/tezos/status/1326877616322859009?s=20) as the new Tezos protocol in November 2020. 

For a full list of changes be sure to read the corresponding [changelog](https://blog.nomadic-labs.com/delphi-changelog.html#007-delphi-changelog) and blog post from [Nomadic Labs](https://blog.nomadic-labs.com/delphi-official-release.html). 

### [**Edo**](https://www.tezosagora.org/proposal/9) **\(PtEdoTezd\)**

The Edo proposal was injected in November 2020 with contributions by Nomadic Labs, Metastate, and Gabriel Alfour.

Edo adds two major features for Tezos smart contracts

* Sapling and BLS12-381 to enable privacy-preserving smart contracts
* Tickets for native on-chain permissions and asset issuance

Among other features, Edo also updates the Tezos amendment process by lowering period length to 5 cycles and by adding a 5th Adoption Period. A full changelog is available [here](https://tezos.gitlab.io/protocols/008_edo.html).

Edo was [activated](https://www.tezosagora.org/period/40) as the new Tezos protocol in February 2021.

### [**Florence**](https://www.tezosagora.org/period/46%20) \(PsFLorena\)

The Florence proposal was a joint effort from Nomadic Labs, Marigold, DaiLambda, and Tarides.

Florence's notable bug fixes and improvements are:

* Increasing maximum operation size
* Improved gas consumption for execution of more complex smart contracts
* Changing intercontract calls to a depth first ordering, as opposed to breadth first
* The elimination of the test chain activation

Baking Accounts were also included in the feature set, however, ongoing testing had uncovered some important and previously undocumented breaking changes in the Baking Account proposal. Baking Accounts should be postponed until a thorough audit of functionality is complete, or an alternative implementation produced. [The version of Florence without Baking Accounts is considered a safer choice.](https://blog.nomadic-labs.com/baking-accounts-proposal-contains-unexpected-breaking-changes.html)

A full changelog is available [here](http://doc.tzalpha.net/protocols/009_florence.html). 

### [**Granada**](https://www.tezosagora.org/period/51%20) \(PtGRAND\)

The Granada proposal injected in May of 2021 was a joint effort from Nomadic Labs, Marigold, TQ, Tarides and DaiLambda.  
  
Granada contains several major improvements to the protocol, as well as numerous bug fixes and minor improvements:

*  **Emmy\*:** will generally halve the time between blocks, **from 60 seconds to 30 seconds**, allows transactions to achieve significantly faster finality than under the previous consensus algorithm.
* **Liquidity Baking:** will incentivize large amounts of decentralized liquidity provision between tez and tzBTC by minting a small amount of tez every block and depositing it inside of a constant product market making smart-contract.
*  **Gas improvements:** A number of substantial improvements to performance have been made, which in turn result in dramatic reductions in gas consumption. Improvements by a factor of 3 to 6 \( sometimes 8 \) have been improved.  

A full changelog can be found [here](http://doc.tzalpha.net/protocols/010_granada.html%20).

