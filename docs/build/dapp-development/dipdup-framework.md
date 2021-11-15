---
sidebar_position: 4
hide_table_of_contents: true
title: "DipDup Framework"
hide_title: true
description: >-
  Create a selective contract indexer in Python or Golang and explose indexed data via GraphQL
---

## DipDup

[DipDup](https://dipdup.net) is a Python framework for creating backends for Tezos dApps.

#### The problem

A minimal setup for a decentralized application is smart contract + web interface working on top of Tezos RPC. That should be enough for simple cases, however once you need history, aggregated data, time series, complex filtering, a custom backend is required. You can surely try to get around by using indexer APIs, like [TzKT](https://api.tzkt.io) or others, but they will never give you the level of customization you want.

#### Selective indexing

Here comes "layer-2" or "selective" indexing:
1. Only the data relevant to your dApp is fetched during the synchronization;
2. Your internal data model is dApp specific in oppose to blocks, operations, and other generic entities.

DipDup framework utilizes this approach and abstracts developer from the indexing workflow letting him focus on the business logic.

#### GraphQL interface

Although you can expose the indexed data in any way you want (e.g. write your own backend) DipDup works best together with the [Hasura](https://hasura.io/) engine which generates GraphQL endpoints (both for queries and subscriptions) right from the database schema.

DipDup automatically configures Hasura in runtime and saves the developer the hassle of API design and maintenance.

### Getting started

* [Quickstart](https://docs.dipdup.net/)
* [Deployment options](https://docs.dipdup.net/deployment)
* [Client-side integration](https://docs.dipdup.net/client-side/genql)
* [Full-stack video tutorial](https://www.youtube.com/watch?v=K-1s6fCBegc)
