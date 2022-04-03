---
sidebar_position: 4
hide_table_of_contents: true
title: "Governance"
hide_title: true
---

## Governance

### Improving the Amendment Process

Another powerful feature of Tezos is that amendment rules can themselves be amended. This means that people can vote to change the way in which votes are carried out. This is important because voting systems can sometimes be gamed, and a change in the governance mechanism itself may at times be necessary.

Examples of ideas which are being explored in this domain are lengthened proposal periods, proposal fees, changes to quorum floors, and the moving of vote counts from the beginning of a voting period to the end. This [blog post](https://medium.com/tezos/amending-tezos-b77949d97e1e) outlines a few ways in which the amendment process might be improved in the future.

### Constitutionalism

Constitutionalism refers to the adherence to a set of rules regarding protocol upgrades. Theis set of rules would create additional safeguards for the Tezos blockchain during protocol upgrades. One such rule might be that certain files \(such as the one that handles the generation of new tokens\) are elevated to a privileged status. These files would then require a higher vote threshold or a longer voting period to be changed.

One [idea which has been discussed](https://medium.com/tezos/a-few-directions-to-improve-tezos-15359c79ec0f) is a refactoring of the code so that every creation or destruction of a Tezos token has to happen through a single OCaml module, a rule which could be enforced via the type system. This module would then programmatically limit the yearly issuance of tez. Protocol amendments which modify the module would be held to a higher vote threshold than amendments which do not.

Another method to enforce constitutionalism would be to have a proof checker \(e.g. Coq\) embedded into the Tezos protocol. The proof checker works by employing a set of filters. Each filter ensures that certain files are not modified or removed. A protocol upgrade that passes all the filters has been shown not to violate any of the rules stated in the constitution.

### Futarchy

Futarchy is a governance concept first proposed by [Robin Hanson](http://mason.gmu.edu/~rhanson/futarchy.html), who proposed the notion of "voting on values and betting on beliefs."

As discussed in this [longer form piece](https://medium.com/tezos/towards-futarchy-in-tezos-54a7b8926967) on futarchy in Tezos, futarchy might be best adopted as a proposal filtering mechanism, with terminal decision-making best left to a voting mechanism.

For example, suppose that there is a proposal increasing the block size of the Tezos blockchain to 1 MB. Suppose also that this proposal has been agreed upon by most stakeholders. The market would then vote on whether the proposal would be beneficial to the Tezos blockchain. There would only be 2 possible outcomes in this betting market: a "Yes" or "No" answer to the question of whether an increased block size would be beneficial to Tezos. The outcome would be reflected in the price of the token. An increase in the price of a Tez would represent an overall "Yes", while an decrease in the price of a Tez would represent an overall "No."

The market-making in these contracts would be subsidized by issuing coins to market makers. This would improve price discovery and liquidity. In a tightly coupled futarchic mechanism, the amendment deemed most likely by the market's price would be automatically adopted.

