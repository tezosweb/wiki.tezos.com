---
hide_table_of_contents: true
title: "Blockchain Indexers"
hide_title: true
sidebar_label: "Introduction"
slug: "/build/clients/"
sidebar_position: 1
---

## Blockchain Indexers

### What is an indexer?

A block explorer is typically made of:

* an indexer that extracts the on-chain data and stores it into a database
* an API that queries the database
* a frontend that displays the data

So, the indexer is the part of the explorer that fetches the raw data from the node, then processes it and stores it in the database in an efficient way to provide quick access to the blockchain data.

### Traditional Blockchain Explorer Backends

Indexers are node operators. The **ETL** extract, transform and load data into the **SQL database** by mapping the data into a pre-defined schema of tables with referential integrity in order to provide indexing and query processing services via the **API**.

* A **Tezos Node** is the heart of the blockchain, it manages the protocol.
* **ETL** stands for _extract, transform, and load_ The process of ETL plays a key role in data integration strategies. ETL allow businesses to gather data from multiple sources and consolidate it into a single, centralized location.
* **API** is the acronym for _Application Programming Interface_, which is a software intermediary that allows two applications to talk to each other.

### Focus on BlockWatch Indexer \(TzIndex\)

The Blockwatch Indexer [TzIndex](https://github.com/blockwatch-cc/tzindex) is used for the [TzStats explorer](https://tzstats.com/).

The **Blockwatch indexer** replaces the slow and expensive SQL datastore with a high-performance columnar database that allows for extremely fast analytical queries.

> **Columnar database** is a column-oriented storage for database. It is optimized for fast retrieval of data columns, for example for analytical applications. It significantly reduces the overall disk I/O requirements and limits the amount of data you need to load from the disk.

It's a custom-made database for blockchain analytics. Avoiding the storage bottleneck allows for more complex data processing.

> **Storage bottleneck** is a situation where the flow of data gets impaired or stopped completely due to bad performance or lack of resources.

State updates happen at each block, which means all the balance updates are always verified, and the indexer will follow chain reorganizations in real-time.

