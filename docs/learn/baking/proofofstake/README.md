---
hide_table_of_contents: true
---
# Proof-of-Stake

Participants \(“nodes”\) in decentralized, peer-to-peer networks provide the necessary computational resources that keep a network up and running. Proof-of-Stake \(PoS\) is the mechanism by which the various participants in Tezos reach consensus on the state of the blockchain. Unlike other PoS protocols, any stakeholder can participate in the consensus process in Tezos and be rewarded by the protocol itself for contributing to the security and stability of the network. Additionally, PoS is less costly than other consensus mechanisms and lowers the barriers to entry for involvement.

### What is Proof-of-Stake?

Proof-of-Stake \(PoS\) refers to a category of algorithms that are used to come to consensus in a blockchain system. In precise terms, Proof-of-Stake is a mechanism that prevents Sybil-attacks \(i.e. prevents a single participant from masquerading as N others\). In a PoS system, a participant's vote in a system is linked directly to the number of coins they have, so that a person who only has 100 coins cannot pretend to be 1000 different people with 100 coins each. It could pretend to 100 different people with 1 coin each, but since the voting power of a participant is proportional to the number of coins they own, this spoof does not help.

For a blockchain to make progress, new blocks must be created and added to chain. Who has the right to make these new blocks? In a Proof-of-Work system, block producers \(aka miners or validators\) compete for this right by expending computing power to solve random cryptographic puzzles. The winner gets to create the next block, and earns some reward for doing so. In this paradigm, the more computing power a miner has, the more likely they are to create the next block. By contrast, PoS systems revolve around the idea that the more coins a block producer has, the more likely they are to create the next block.

Broadly, there are 2 classes of proof-of-stake algorithms:

#### **Nakamoto-style Proof-of-Stake**

As with Bitcoin, one validator is randomly selected in each time slot to create a block that builds on the longest chain \(or heaviest chain, for some notion of weight\). However, instead of selecting a validator based on who solves the cryptographic puzzles first, the likelihood of selection is weighted according to how many coins they lock-up, that is, according to their "stake."

#### **Byzantine Fault Tolerant \(BFT\) -style Proof-of-Stake**

Instead of a random validator getting the right to create a block which every other participant must accept, BFT systems introduce the idea of _proposing_ and _accepting_. Like in Nakamoto-style PoS, a \(possibly randomly\) selected validator \(weighted by stake\) is chosen to propose a block to the other validators. All the validators must communicate with each other until agreement is reached. Once validators are in agreement, they accept the block and it is finalized as the latest block.

