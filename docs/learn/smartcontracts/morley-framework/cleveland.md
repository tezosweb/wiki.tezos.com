---
sidebar_position: 4
hide_table_of_contents: true
title: "Cleveland"
hide_title: true
---


## Cleveland

[Cleveland](https://gitlab.com/morley-framework/morley/-/tree/master/code/cleveland) is a Haskell library for testing Michelson contracts.

Cleveland makes it trivial to load a contract from disk, originate it, transfer XTZ, check its storage/balance, call its entrypoints, check whether it failed with a given error, etc.

Cleveland tests can be run:

* on an actual blockchain;
* or via Morley's in-memory interpreter for a faster feedback loop.

It supports example-based testing \(via the [tasty](https://hackage.haskell.org/package/tasty) testing framework\) and property-based testing \(via [hedgehog](https://hackage.haskell.org/package/hedgehog)\).

### Cleveland Resources

* [Cleveland project page](https://gitlab.com/morley-framework/morley/-/tree/master/code/cleveland)
* [Cleveland documentation and tutorial](https://gitlab.com/morley-framework/morley/-/blob/master/code/cleveland/testingEDSL.md/)

