---
sidebar_position: 6
hide_table_of_contents: true
---

# Formal Verification

## Introduction <a id="intro"></a>

Formal verification is the process of using formal definitions to verify that a program conforms to certain specifications. In other words, it uses mathematics to answer the question, "Have we made what we were trying to make?"

In contrast, programmers currently write unit tests to ensure that a program conforms to certain specifications. They test the program with as many inputs as possible, verifying each time that the output fits what is mentioned in the specification. For example, to test that a program correctly sorts a list of numbers into ascending value, it will be tested with an input of `[2, 3, 1]`. The test's output should yield `[1, 2, 3]`, or else the program is invalid.

However, the unit test approach may not be able to cover all possible inputs \(or edge cases\), and these may lead a program to failure. The solution to this is formal verification. Formal verification involves writing mathematical definitions of the program. To drawing on the same example given above, one may write a definition, "For every item j in a list, ensure that the element j ≤ j+1". This is a huge step-up from unit tests, as the correctness of the program is shown to be mathematically universal.

## Michelson and GADTs <a id="gadt"></a>

GADT stands for Generalized Algebraic Data Types. GADTs allow OCaml developers to describe rich relations between data constructors and the types they inhabit. Currently, the Michelson language uses GADT \(Generalized Algebraic Data Types\) for formal verification of types.

## Michelson with Coq <a id="coq"></a>

[Coq](https://coq.inria.fr/) is an interactive theorem prover. It is based on a very expressive logic called the Calculus of Inductive Constructions, which is powerful enough to both prove advanced mathematical theorems such as the [Feit-Thompson Odd Order Theorem](https://hal.inria.fr/hal-00816699/document) and verify the correctness of complex software such as [CompCert](https://compcert.org/). More concretely, Coq allows one to:

* define functions or predicates that can be evaluated efficiently;
* state mathematical theorems and software specifications;
* interactively develop formal proofs of these theorems;
* machine-check these proofs by a relatively small certification “kernel”;
* extract certified programs to languages like OCaml, Haskell or Scheme.

[Mi-Cho-Coq](https://gitlab.com/nomadic-labs/mi-cho-coq) is a formalization of the Michelson smart contract language in Coq. It can be used to specify and verify Tezos smart contracts such as [this multisig contract](https://gitlab.com/nomadic-labs/mi-cho-coq/-/blob/master/src/contracts_coq/generic_multisig.v), [the default “manager” contract](https://gitlab.com/nomadic-labs/mi-cho-coq/-/blob/master/src/contracts_coq/manager.v), and the [spending-limit contract of the Cortez wallet](https://blog.nomadic-labs.com/formally-verifying-a-critical-smart-contract.html). Mi-Cho-Coq also serves as the compilation target for the [Albert compiler](https://albert-lang.io/).

## Why is this important for financial contracts?

Smart contracts are programs that hold a given amount of money. As such, it is crucial that they be error-free and correct. Unit testing is not sufficient to cover all edge cases and all errors that may occur in the wild.

Complex financial contracts involve steps and processes that involve the trust of the involved parties, as well as of other parties that have a stake in the trustworthiness of the system on which the contract is built. An incorrectly constructed contract can breach trust in the system. In worst cases, unintended program effects can lead to a loss of money, as was have seen in multiple instances with Ethereum.

With formal verification, computer scientists and developers can prove indisputably that certain programs are error-free. They can do this to the same degree of certainty that is required of a mathematician who wishes to prove a theorem. These advances are being used to secure everything from unmanned drones, to the internet.

