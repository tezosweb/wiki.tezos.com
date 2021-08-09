---
hide_table_of_contents: true
title: "The Tezos Consensus Algorithm"
hide_title: true
---
## The Tezos Consensus Algorithm

### Emmy+, the consensus algorithm in Tezos <a id="consensus"></a>

Tezos uses a Nakamoto-style PoS algorithm for consensus, which since [Babylon](https://tezos.gitlab.io/protocols/005_babylon.html), is called Emmy+, which is a variant of the protocol proposed in the Tezos white paper \(later nick-named Emmy\). To understand it, we will break it up into the five main sections:

1. **Block Creation \(Baking\)**

   Block creation is the way that the blockchain makes progress. In Tezos, participants who create blocks are called _bakers_. To be considered a baker, a participant needs to own at least 8,000 ꜩ \(1 roll\). The more rolls someone has, the higher their chance of being given the rights to bake the next block. If there are 10 rolls activated at some point in time, and a baker owns 2/10 of those rolls, they have a 20% chance of being given the rights to create the next block. This means that if a baker has 8,000 ꜩ or 15,999 ꜩ, they have the same baking rights in the system.

   Baking rights are set in terms of priorities. For example, if there are 10 rolls, the protocol could randomly select a priority list as follows:

   ```text
    Priority1 = Roll 6
    Priority2 = Roll 9
    Priority3 = Roll 4
    Priority4 = Roll 3
    .
    .
    .
    Priority10 = Roll 7
   ```

   This means that the person who owns Roll 6 will have first priority in proposing the block. If they do not create and broadcast a block within a certain period \(detailed [below](consensus.md#block-delay)\), the person who owns Roll 9 may take over. The more rolls one owns, the greater one's chances of being given high priority. Furthermore, a baker may receive several priorities.

2. **Endorsing**

   Besides baking, a participant can also endorse a block. Endorsing rights are set in the same way as baking rights. At every block height, 32 random rolls are selected, and their owners are supposed to endorse a block. Endorsing serves as a vote on a block. Endorsements on a block are included in the next block. Endorsing is a sign of activity so the more endorsements blocks contain, the healthier the chain.

3. **Block Delay Rule** {\#block-delay}

   The priority of a block and the number of endorsements included in it determine the minimal time at which the next block can be baked. The higher the priority and the more endorsements, the quicker the next block can be baked. The minimal block delay is currently set to 60 seconds.

4. **Fork Choice Rule**

   In case a participant observes two different chains, a so-called _fork_, a participant uses the _fork choice rule_ to decides which chain fork is the "correct" one. The rule is simply to chose the longest chain, and it includes also the check that blocks are not baked sooner than [allowed](consensus.md#block-delay).

5. **Incentives**

   To encourage participation, baking and endorsing are rewarded by the protocol in the form of newly minted ꜩ. Since [Carthage](https://tezos.gitlab.io/protocols/006_carthage.html), the rewards for a block of priority `p` with `e` endorsements is a function of `p` and `e`. For priority 0, the baking reward and the endorsing reward are equal to `1.25 x e ꜩ`. This choice of design prevents [deflationary baking](https://blog.nomadic-labs.com/a-new-reward-formula-for-carthage.html). For priority 1 and above, the baking reward for a block with `e` endorsements is `0.1875 x e ꜩ` and the endorsing reward is `0.833333 x e ꜩ`.

   To prevent the Nothing-at-Stake problem, baking and endorsing require a security deposit, thus ensuring participants have "skin in the game". The security deposits are 512 ꜩ for baking and 64 ꜩ for endorsing, and are locked up for 5 cycles \(~14 days\). Security deposits are slashed in case of double baking/endorsing if an accusation is included as evidence in a future block. Precisely, assume that baker _B_ includes a valid double baking/endorsing accusation about _A_ and assume that _A_ has in total _x_ ꜩ in security deposits and future rewards. Then half of _x_ is burnt and half goes to _B_ in the form of a block reward.

### Delegation <a id="delegation"></a>

If someone does not have 8,000 ꜩ or does not want to set up computing infrastructure to bake blocks, they can delegate their coins to a baker. Delegating lets coin holders "lend" their coins to a baker. As a result, the baker has a higher probability of being selected, and the baker in turn shares the additional revenue with the coin holder. Importantly, this process does not actually transfer ownership of coins. The baker cannot spend the ꜩ delegated to them, and bakers cannot run away with other people's money.

Groups have sprung up offering competitive rates for their baking services, and most charge ~10-20% fees on the rewards that people obtain by delegating to them.

This use of delegation is the reason many people refer to Tezos as a [Liquid Proof-of-Stake](https://medium.com/tezos/liquid-proof-of-stake-aec2f7ef1da7) system.

**To summarize:** The Tezos consensus protocol called Emmy+ is a Nakamoto-style Liquid PoS consensus algorithm. Delegates \(people who have at least 8,000 ꜩ of delegated funds\) are given the responsibility of creating and endorsing blocks. They are rewarded for their action. They are also required to stake some of their own capital in order to ensure honest behavior.

### Finality in Tezos <a id="finality"></a>

Emmy+, being a Nakamoto-style consensus, offers only _probabilistic_, not _deterministic_ finality. The implication is that forks can have arbitrary length — but forked states become exponentially unstable and tend to collapse down to a single branch \([assuming decent bounds on network latency](https://blog.nomadic-labs.com/emmy-in-the-partial-synchrony-model.html)\).

By gathering information from missing endorsements, missing blocks, and from future assigned baking rights, an observer can determine whether or not an actor controlling a given amount of the rolls is able to re-organize a given block. For instance, as shown experimentally in an [analysis of Emmy+](https://blog.nomadic-labs.com/analysis-of-emmy.html), a user may be _reasonably sure_ that a block is final if it has 6 confirmations \(that is, blocks on top of it\) over a healthy chain when considering a Byzantine attacker with a stake fraction of 33% of the total active stake. Given that in a healthy chain blocks are baked every minute, 6 confirmations are equivalent to 6 minutes.

A reasonable threshold, which we quantify as `1e-8`, would puts our expectation of being wrong about a block being final at roughly once every two centuries.

Blocks have priority 0 and \(almost\) all the required endorsements. A concrete healthiness measure is the delay of the chain with respect to the ideal chain where each block has a delay of one minute with respect to the previous block.

### Scalability <a id="scalability"></a>

Currently, Tezos does around 30-40 transactions per second.

### The past and future of Emmy+

Emmy is the predecessor of Emmy+. In both Emmy and Emmy+, the fork choice rule is expressed in terms of the _fitness_ of the last block in the chain. In Emmy, a block's fitness also takes into account the number of endorsements contained in a block, not only the block's height: the more endorsements in a block, the higher the block's fitness. This design was somewhat problematic in that a baker may hesitate if to wait for more endorsements or to bake the block with the endorsements it already had. Emmy+ addressed this problem by simply making fitness not depend on the number of endorsements in a block: the fitness increases by 1 unit with each level. In turn, the number of endorsements in a block is reflected in the block delay rule.

The rewards in Emmy+ have been updated in Carthage to address deflationary baking.

[Emmy★ is proposed](https://gitlab.com/tzip/tzip/-/merge_requests/134) as a successor of Emmy+. Emmy★ is designed to offer faster finality, about twice as fast as in Emmy+. without compromising its security. Emmy★ achieves this with a tweak in the definition of the minimal delay function, which allows for blocks to be produced every 30 seconds, and with an increase in the number of endorsements per block. As a consequence, on a healthy chain and for an attacker with 33% stake for instance, the number of confirmations decreases from 6 blocks to 2 blocks, therefore from 6 minutes to 1 minute, a 6 fold improvement.

### Further resources <a id="resources"></a>

Please check the [consensus entry](https://tezos.gitlab.io/007/proof_of_stake.html) in the Tezos developer documentation.

[Nomadic Labs](https://www.nomadic-labs.com/) published a series of [blog posts](https://blog.nomadic-labs.com/) analyzing Emmy+:

* [the motivation behind updating Emmy to Emmy+](https://blog.nomadic-labs.com/emmy-an-improved-consensus-algorithm.html)
* [Faster Finality with Emmy\*](https://blog.nomadic-labs.com/faster-finality-with-emmy.html%20)
* \[a first analysis of

  Emmy+\]\([https://blog.nomadic-labs.com/analysis-of-emmy.html](https://blog.nomadic-labs.com/analysis-of-emmy.html)\)

  providing estimations on the number of block confirmations and some insights

  on choosing the constants in the Emmy+ block delay formula

* \[an update of rewards in

  Carthage\]\([https://blog.nomadic-labs.com/a-new-reward-formula-for-carthage.html](https://blog.nomadic-labs.com/a-new-reward-formula-for-carthage.html)\)

  to take into account inflation and to deal with deflationary baking

* \[a review of a research paper on

  Emmy+\]\([https://blog.nomadic-labs.com/on-defending-against-malicious-reorgs-in-tezos-proof-of-stake.html](https://blog.nomadic-labs.com/on-defending-against-malicious-reorgs-in-tezos-proof-of-stake.html)\)

  expanding on the choices of constants in Emmy

* an analysis of \[Emmy+ in partial

  synchrony\]\([https://blog.nomadic-labs.com/emmy-in-the-partial-synchrony-model.html](https://blog.nomadic-labs.com/emmy-in-the-partial-synchrony-model.html)\),

  extending the first analysis to consider a more realistic network model where

  messages can be delayed arbitrarily; the conclusion is that to be able to have

  decent numbers of confirmations, one needs to have a good estimation on

  message delays

* \[an analysis of mixed

  forks\]\([https://blog.nomadic-labs.com/the-case-of-mixed-forks-in-emmy.html](https://blog.nomadic-labs.com/the-case-of-mixed-forks-in-emmy.html)\)

  showing that scenarios where an attacker tries to maintain a \(malicious\) fork

  for as long as possible do not have a significant impact on the \[previous

  analysis\]\([https://blog.nomadic-labs.com/emmy-in-the-partial-synchrony-model.html](https://blog.nomadic-labs.com/emmy-in-the-partial-synchrony-model.html)\)

