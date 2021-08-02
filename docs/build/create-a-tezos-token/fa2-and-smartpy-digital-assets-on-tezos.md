---
sidebar_position: 1
hide_table_of_contents: true
title: "FA2 & SmartPy - Digital Assets on Tezos"
hide_title: true
---
## FA2 & SmartPy - Digital Assets on Tezos

This tutorial shows how to interact with the “FA2-SmartPy” implementation of the FA2 standard on some common use-cases. The first part uses `tezos-client` commands to operate basic transfers and queries. The second part goes further: it uses the `fatoo` command line interface to do batched-transfers and use the “operator” mechanism to delegate transfer rights.

### Basic Usage With tezos-client

This assumes you have `tezos-client` properly set up to talk to Carthagenet or to a “full” [sandbox](https://assets.tqtezos.com/docs/setup/2-sandbox) \(i.e. with bakers\).

This part requires 4 accounts with a few ꜩ imported into `tezos-client`, as `administrator`, `originator`, `alice` and `bob`.

In the case of the sandbox tutorial we use `alice` also as `originator` and `administrator`:

```text
 $ tezos-client import secret key alice \
                unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq \
                --force
   tezos-client import secret key originator \
                unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq \
                --force
   tezos-client import secret key administrator \
                unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq \
                --force
   tezos-client import secret key bob \
                unencrypted:edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt \
                --force
```

#### Get The Michelson Code

FA2-SmartPy uses SmartPy's meta-programming facilities to provide more than one Michelson contract, a.k.a. _“builds.”_. A few of the builds are available at [https://gitlab.com/smondet/fa2-smartpy/-/tree/master/michelson](https://gitlab.com/smondet/fa2-smartpy/-/tree/master/michelson), see [below] for a description of the various builds.

Let's download the “default” one:

```text
 $ wget -O fa2_default.tz \
        'https://gitlab.com/smondet/fa2-smartpy/-/raw/4acac092/michelson/20200910-203659+0000_5060996_contract.tz'

```

#### Origination

Origination works like for any contract, we need the above code, a few ꜩ, and a michelson expression to initialize the storage. In our case, it should look like:

```text
(Pair
   (Pair "" (Pair of-tokens> ))
   (Pair (Pair Unit )
         (Pair  )))
```

It is expected that is the cardinal of the map, and that only “known” tokens are used in the big-map. To maintain all invariants properly, it is recommended to initialize the storage empty, and use the `%mint` entrypoint to fill the contract.

Let's originate such an unpaused empty contract while setting the `administrator` address:

```text
 $ tezos-client originate contract myfa2 \
                transferring 0 from originator \
                running fa2_default.tz \
                --init '(Pair (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair 0 {})) (Pair (Pair Unit {}) (Pair False {})))' \
                --burn-cap 10 \
                --force --no-print-source
┃ Node is bootstrapped.
┃ Estimated gas: 135041 units (will add 100 for safety)
┃ Estimated storage: 4620 bytes added (will add 20 for safety)
┃ Operation successfully injected in the node.
┃ Operation hash is 'opa4ZVgJGkXzeRypcnqso1CF8LrgVEYq4R2QwGkFT2kzw2L9Tqp'
┃ Waiting for the operation to be included...
┃ Operation found in block: BM2FVXcXeYxBaDPkt1X2etZrnkJTG19pazm6wd5FVCrxGm6tS2o (pass: 3, offset: 0)
┃ 
┃ ...
┃ 
┃           tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb ... -ꜩ0.257
┃ New contract KT1FQrHRqqqZ23Md9Ec5KJ3WK66fNxi9izZJ originated.
┃ The operation has only been included 0 blocks ago.
┃ We recommend to wait more.
┃ Use command
┃   tezos-client wait for opa4ZVgJGkXzeRypcnqso1CF8LrgVEYq4R2QwGkFT2kzw2L9Tqp to be included --confirmations 30 --branch BLKYS2BuTtAp6Qb6Uu5K4JPNvGhJecHmqrtiNNQWb29fsf4JbhS
┃ and/or an external block explorer.
┃ Contract memorized as myfa2.
```

#### Mint

Here we want to make a transfer “as” the `administrator` set in the previous section.

The minting entry-point is not standardized in the FA2 specification, for fa2-smartpy it should look like this:

```text
(Pair (Pair "" ) (Pair "" ))
```

The default build assumes that token-IDs are consecutive natural numbers \(0, 1, 2, …\), if because of some particular constraint the user requires arbitrary token-IDs there is a build option in FA2-SmartPy to generate such a contract \(see [documentation](https://gitlab.com/smondet/fa2-smartpy/)\).

For instance, let's, as `administrator`, mint 100 `TK0` tokens to `alice`:

```text
 $ tezos-client transfer 0 from administrator to myfa2 \
                --entrypoint mint \
                --arg '(Pair (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" 100) (Pair "TK0" 0))' \
                --burn-cap 3
┃ Node is bootstrapped.
┃ Estimated gas: 117731 units (will add 100 for safety)
┃ Estimated storage: 163 bytes added (will add 20 for safety)
┃ Operation successfully injected in the node.
┃ Operation hash is 'ooL9T4cK1RyYz4HxjfyixPW3n5iJf2hX6G47iQToa7sDTb6fjHr'
┃ Waiting for the operation to be included...
┃ Operation found in block: BMGWJeRyTtUL2Pi9xgAi3MU7kkgMCr4pUeYALaVhQAi4uJS37ae (pass: 3, offset: 0)
┃ 
┃ ...
┃ 
┃       Consumed gas: 117731
┃       Balance updates:
┃         tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb ... -ꜩ0.163
┃ The operation has only been included 0 blocks ago.
┃ We recommend to wait more.
┃ Use command
┃   tezos-client wait for ooL9T4cK1RyYz4HxjfyixPW3n5iJf2hX6G47iQToa7sDTb6fjHr to be included --confirmations 30 --branch BM2FVXcXeYxBaDPkt1X2etZrnkJTG19pazm6wd5FVCrxGm6tS2o
┃ and/or an external block explorer.
```

#### Transfer

The transfer entry-point in FA2 is “batched” at two levels i.e. one contract call contains a list of transfer elements, each transfer element is a “from-address” and a list of outgoing transactions:

```text
{
  Pair "" {Pair "" (Pair  )} ;
  Pair "" {Pair "" (Pair  ) ; Pair "" (Pair  )} ;
  ...
}
```

Here we, as `alice`, transfer 5 of our 100 TK0 to `bob`:

```text
 $ tezos-client transfer 0 from alice to myfa2 \
                --entrypoint transfer \
                --arg '{ Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" {Pair "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6" (Pair 0 5)} }' \
                --burn-cap 3
┃ Node is bootstrapped.
┃ Estimated gas: 119800 units (will add 100 for safety)
┃ Estimated storage: 67 bytes added (will add 20 for safety)
┃ Operation successfully injected in the node.
┃ Operation hash is 'opU6fKDzso3fE3x61GCPGbgu5Bqg6wrXm9w1wxM3MeyVkc242gQ'
┃ Waiting for the operation to be included...
┃ Operation found in block: BM2yNL1kjRJvrSeuzX2P6iid4f5Fx7JBjn2K2MYYsYTF3eFcVQ4 (pass: 3, offset: 0)
┃ This sequence of operations was run:
┃ 
┃ ...
┃ 
┃       Consumed gas: 119800
┃       Balance updates:
┃         tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb ... -ꜩ0.067
┃ The operation has only been included 0 blocks ago.
┃ We recommend to wait more.
┃ Use command
┃   tezos-client wait for opU6fKDzso3fE3x61GCPGbgu5Bqg6wrXm9w1wxM3MeyVkc242gQ to be included --confirmations 30 --branch BMGWJeRyTtUL2Pi9xgAi3MU7kkgMCr4pUeYALaVhQAi4uJS37ae
┃ and/or an external block explorer.
```

#### Get Balance Off-Chain

As an example of interaction with big-maps in the contract's storage using Michelson and `tezos-client`, here we obtain `alice`'s balance of TK0 tokens.

We need a script which takes the contract's storage type as parameter \(literally copy-pasted\), and uses Michelson to extract the value in the `%ledger` big-map; in this case we just display it with the `FAILWITH` instruction, but one could do much more, including putting in storage \(left as exercise for the reader ☺\). Let's save it as `get-balance.tz`:

```text
parameter
    (pair (pair (address %administrator)
                (pair (nat %all_tokens) (big_map %ledger (pair address nat) nat)))
          (pair (pair (unit %version_20200910_tzip_93e5415e_contract)
                      (big_map %operators
                         (pair (address %owner) (pair (address %operator) (nat %token_id)))
                         unit))
                (pair (bool %paused)
                      (big_map %tokens
                         nat
                         (pair (nat %token_id)
                               (pair (string %symbol)
                                     (pair (string %name) (pair (nat %decimals) (map %extras string string))))))))) ;
storage unit;
code
 {
    CAR ; # Get parameter
    CAR ; # Get the pair (admin , _)
    CDR ; # Get the pair (all_token, ledger)
    CDR ; # Get %ledger
    PUSH (pair address nat) (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" 0);
    GET ; # Get the value in the ledger at the above key
    FAILWITH
 };
```

In this case, we expect the `tezos-client` command to fail, since we want to read the error message:

```text
 $ tezos-client run script get-balance.tz on storage Unit \
                and input \
                "$(tezos-client get contract storage for myfa2)"
‖ 
‖ ...
‖ 
‖   22:     GET ; 
‖   23:     FAILWITH
‖   24:  };
‖ At line 23 characters 4 to 12,
‖ script reached FAILWITH instruction
‖ with (Some 95)
‖ Fatal error:
‖   error running script
```

We can _clearly_ see in the error value \(passed to `FAILWITH`\) that `alice`'s balance is 95 TK0 \(100 minted _minus_ 5 transferred to `bob`\).

### The `fatoo` Application

#### Obtain and Setup Client

In this section we use the `fatoo` command line interface to some _builds_ of FA2-SmartPy. You need `fatoo` installed in your `$PATH` or you may use Docker:

```text
 $ fatoo --version
   
   docker run -it --rm --entrypoint fatoo registry.gitlab.com/smondet/fa2-smartpy:4acac092-run --version
```

The `fatoo` application has many commands, see `fatoo [subcommand] --help`. At the same time, it is work-in-progress, so feel free to submit issues and feature requests in the main [repository](https://gitlab.com/smondet/fa2-smartpy/).

Two environment variables can be used to configure

* `fatoo_root_path`: logs, outputs
* `fatoo_client`: the more important one, it is an URI describing how to configure `tezos-client` and talk to the node:

See command `fatoo show-client-uri-documentation`:

> The URI follows the usual pattern:`://:/?`:
>
> *  can be `http` or `http` \(`--tls` option\);
> * `:` defines the connection to the node;
> *  is the private-key \(URI\) for the “funder” account which is used to pay for gas and storage.
>
> Available are:
>
> * `bake=true`: use the `funder` account to also bake blocks after injecting operations \(useful for “manual” sandboxes\);
> * `wait=`: set the `--wait` option of `tezos-client` \(how many blocks to wait after an operation is injected\);
> * `command=`: use an alternative command for `tezos-client`.
>
> See for instance the current default: `http://:2020/unencrypted:edsk3S7mCwuuMVS21jsYTczxBU4tgTbQp98J3YmTGcstuUxsrZxKYd?bake=true`.

 Assuming we are using the \[sandbox\]\(https://assets.tqtezos.com/docs/setup/2-sandbox\) setup, we can configure the client using \`alice\`'s private key as follows:

```text
export fatoo_client='http://:20000/unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq?wait=0'



alias fatoo='docker run -it -u "$UID" --network host -v "$PWD:/work" -w /work --rm -e fatoo_client="http://:20000/unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq?wait=0" --entrypoint fatoo registry.gitlab.com/smondet/fa2-smartpy:4acac092-run'
```

The application has a `client` subcommand which just calls `tezos-client` properly, one may test their setup with:

```text
 $ fatoo client bootstrapped
┃ Node is bootstrapped.
```

#### Setup Accounts

Here we create four key-pairs from mnemonic seeds, to be used in the following sections:

```text
 $ fatoo account-of-seed \
         "the-only-administrator-of-the-contract" \
         --output admin.csv
   fatoo account-of-seed \
         "the-0th-aka-first-owner" \
         --output owner0.csv
   fatoo account-of-seed \
         "ready-owner-one" \
         --output owner1.csv
   fatoo account-of-seed \
         "this-is-a-potential-token-owner-too" \
         --output owner2.csv

```

The resulting CSVs are in the same format as with [flextesa](https://tezos.gitlab.io/flextesa/), they contain:`,,,` see for instance:

```text
 $ echo "Public key hash: $(cut -d, -f 3 admin.csv)"
   echo "Secret key: $(cut -d, -f 4 admin.csv)"
┃ Public key hash: tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe
┃ Secret key: unencrypted:edsk3ZAm4BwNkG2uUmCcA64BadPWuwNt16zZisnfcQEuvyStaBa6oG
```

Let's name all of these:

```text
 $ export admin_pkh="$(cut -d, -f 3 admin.csv)"
   export admin_sk="$(cut -d, -f 4 admin.csv)"
   export owner0_pkh="$(cut -d, -f 3 owner0.csv)"
   export owner0_sk="$(cut -d, -f 4 owner0.csv)"
   export owner1_pkh="$(cut -d, -f 3 owner1.csv)"
   export owner1_sk="$(cut -d, -f 4 owner1.csv)"
   export owner2_pkh="$(cut -d, -f 3 owner2.csv)"
   export owner2_sk="$(cut -d, -f 4 owner2.csv)"

```

#### Originate

The application contains the code for a few variants of the contract:

```text
 $ fatoo list-contract-variants \
         --details description --format markdown
┃ * `contract`: The default.
┃ * `dbg_contract`: The default in debug mode.
┃ * `baby_contract`: The default in Babylon mode.
┃ * `nolay_contract`: The default without right-combs.
┃ * `mutran_contract`: The default with mutez transfer entry-point.
┃ * `tokset_contract`: The default with non-consecutive token-IDs.
┃ * `perdesc_noops_contract`: The default without operators and with permissions-descriptor.
┃ * `perdesc_noops_dbg_contract`: The perdesc_noops_contract but in debug mode.
┃ * `single_contract`: The default for single-asset.
┃ * `single_mutran_contract`: The single-asset with mutez transfer entry-point.
┃ * `nft_mutran_contract`: The default in NFT mode with mutez transfer entry-point.
┃ * `lzep_contract`: The default with lazy-entry-points flag.
┃ * `lzepm_contract`: The default with lazy-entry-points-multiple flag.
┃ * `lzep_mutran_contract`: The default with mutez-transfer and lazy-entry-points flag.
┃ * `lzepm_mutran_contract`: The default with mutez-transfer and lazy-entry-points-multiple flag.
```

One can dump the Michelson code into a file \(see `fatoo get-code --help`\), but there is no need since one can directly originate contracts from the application. Let's originate `mutran_contract`, the full blown FA2 implementation with an extra entry-point which allows the administrator to transfer funds which may potentially end-up in the contract's balance.

```text
 $ fatoo originate mutran_contract \
         --administrator "${admin_pkh}" \
         --output-address kt1_mutran_contract.txt

‖ [FA2->Info]:
‖   Originations:
‖     * Success: mutran_contract (The default with mutez transfer entry-point)
‖       -> KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w
```

The command has saved the contract address in the file:

```text
 $ cat kt1_mutran_contract.txt
┃ KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w
```

And we can already display the state of the contract \(storage\):

```text
 $ fatoo show-storage "$(cat kt1_mutran_contract.txt)"
‖ [FA2->Info]:
‖   Contract: KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w
‖     Balance: 0 mutez
‖     Administrator: "tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe"
‖     Status: Ready
‖     Tokens-big-map: 26
‖     Ledger-big-map: 24
‖     Operators-big-map: 25
‖     All-Tokens: None
‖     Known-Owners-and-Operators: None
```

#### Mint and Multi-Transfer

In order to mint tokens, the administrator needs to be able to call the contract on chain, for this we need to transfer at least a few μꜩ to that address. One can use `tezos-client` but `fatoo` has shortcut command to transfer from the configured “funding” account \(amounts are in `mutez`\):

```text
 $ fatoo fund-address \
         "${admin_pkh}" \
         10_000_000
‖ [FA2->Info]: Balance for tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe is now
‖   4058182245 mutez.
```

Note that for now `owner0` does not exist on chain, we're still minting tokens to them:

```text
 $ fatoo call-mint --token-id 0 --token-symbol TQ0 \
         "${owner0_pkh}" 1_000_000 \
         --source "${admin_sk}" \
         --address "$(cat kt1_mutran_contract.txt)"
┃ (Pair (Pair "tz1MUP3sCWTUQRG2Hon7uhRfmuYZ4guEQntS" 1000000) (Pair "TQ0" 0))
```

Let's add another token `TQ1` still minting some to `owner0`:

```text
 $ fatoo call-mint --token-id 1 --token-symbol TQ1 \
         "${owner0_pkh}" 2_000 \
         --source "${admin_sk}" \
         --address "$(cat kt1_mutran_contract.txt)"
┃ (Pair (Pair "tz1MUP3sCWTUQRG2Hon7uhRfmuYZ4guEQntS" 2000) (Pair "TQ1" 1))
```

Let's see the storage; we see the new tokens `TQ0` and `TQ1` and, since we provide a “known token owner” on the command-line, we can see their balances:

```text
 $ fatoo show-storage "$(cat kt1_mutran_contract.txt)" \
         --known-address "$(cut -d, -f 3 owner0.csv)"
‖ [FA2->Info]:
‖   Contract: KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w
‖     Balance: 0 mutez
‖     Administrator: "tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe"
‖     Status: Ready
‖     Tokens-big-map: 26
‖     Ledger-big-map: 24
‖     Operators-big-map: 25
‖     All-Tokens: 0 = TQ0.
‖                 1 = TQ1.
‖     Known-Owners-and-Operators:
‖       * Owner: "tz1MUP3sCWTUQRG2Hon7uhRfmuYZ4guEQntS" [0 ops]
‖         - Balance: 1000000 TQ0(0)
‖         - Balance: 2000 TQ1(1)
```

Now let's get `owner0` to do a batch-transfer. First, we need to feed some gas to that address:

```text
 $ fatoo fund-address \
         "${owner0_pkh}" \
         1_000_000
‖ [FA2->Info]: Balance for tz1MUP3sCWTUQRG2Hon7uhRfmuYZ4guEQntS is now 4335411
‖   mutez.
```

Then, since the token-owner can do self-transfer we use `owner1`'s secret-key to transfer TQ0s and TQ1s to `owner1` and `owner2`:

```text
 $ fatoo call-transfer \
         "from:${owner0_pkh} to:${owner1_pkh} amount: 10 token: 0" \
         "from:${owner0_pkh} to:${owner1_pkh} amount: 100 token: 1" \
         "from:${owner0_pkh} to:${owner2_pkh} amount: 10 token: 1" \
         --source "${owner0_sk}" \
         --address "$(cat kt1_mutran_contract.txt)"
┃ { Pair "tz1MUP3sCWTUQRG2Hon7uhRfmuYZ4guEQntS" { Pair "tz1YYrxf529d3EYzEv5TnsiTpRCzFFB87dAS" (Pair 0 10) ; Pair "tz1YYrxf529d3EYzEv5TnsiTpRCzFFB87dAS" (Pair 1 100) ; Pair "tz1TyFYCuKrQ7A3yB4AvpoPRLacb3J6iQB9V" (Pair 1 10)}}
```

We can then observe the resulting state:

```text
 $ fatoo show-storage "$(cat kt1_mutran_contract.txt)" \
         --known-address "$(cut -d, -f 3 owner0.csv)" \
         --known-address "$(cut -d, -f 3 owner1.csv)" \
         --known-address "$(cut -d, -f 3 owner2.csv)"
‖ [FA2->Info]:
‖   Contract: KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w
‖     Balance: 0 mutez
‖     Administrator: "tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe"
‖     Status: Ready
‖     Tokens-big-map: 26
‖     Ledger-big-map: 24
‖     Operators-big-map: 25
‖     All-Tokens: 0 = TQ0.
‖                 1 = TQ1.
‖     Known-Owners-and-Operators:
‖       * Owner: "tz1MUP3sCWTUQRG2Hon7uhRfmuYZ4guEQntS" [0 ops]
‖         - Balance: 999990 TQ0(0)
‖         - Balance: 1890 TQ1(1)
‖       * Owner: "tz1YYrxf529d3EYzEv5TnsiTpRCzFFB87dAS" [0 ops]
‖         - Balance: 10 TQ0(0)
‖         - Balance: 100 TQ1(1)
‖       * Owner: "tz1TyFYCuKrQ7A3yB4AvpoPRLacb3J6iQB9V" [0 ops]
‖         - Balance: 10 TQ1(1)
```

#### Using Operators

Let's create an `operator` key-pair:

```text
 $ fatoo account-of-seed \
         "youve-been-operated-ill-be-back" \
         --output operator.csv
   export operator_pkh="$(cut -d, -f 3 operator.csv)"
   export operator_sk="$(cut -d, -f 4 operator.csv)"
```

We will now get all the owners to delegate _all_ their tokens to “operator,” see also the command `fatoo call-update-operators --help`:

```text
 $ fatoo call-update-operators \
         "add@ operator: ${operator_pkh} owner: ${owner0_pkh} token: 0" \
         "add@ operator: ${operator_pkh} owner: ${owner0_pkh} token: 1" \
         --source "${owner0_sk}" \
         --address "$(cat kt1_mutran_contract.txt)"
   fatoo fund-address \
         "${owner1_pkh}" \
         1_000_000
   fatoo call-update-operators \
         "add@ operator: ${operator_pkh} owner: ${owner1_pkh} token: 0" \
         "add@ operator: ${operator_pkh} owner: ${owner1_pkh} token: 1" \
         --source "${owner1_sk}" \
         --address "$(cat kt1_mutran_contract.txt)"
   fatoo fund-address \
         "${owner2_pkh}" \
         1_000_000
   fatoo call-update-operators \
         "add@ operator: ${operator_pkh} owner: ${owner2_pkh} token: 0" \
         "add@ operator: ${operator_pkh} owner: ${owner2_pkh} token: 1" \
         --source "${owner2_sk}" \
         --address "$(cat kt1_mutran_contract.txt)"
```

We see that now, the same operator is present in every account:

```text
 $ fatoo show-storage "$(cat kt1_mutran_contract.txt)" \
         --known-address "$(cut -d, -f 3 owner0.csv)" \
         --known-address "$(cut -d, -f 3 owner1.csv)" \
         --known-address "$(cut -d, -f 3 owner2.csv)" \
         --known-address "$(cut -d, -f 3 operator.csv)"
‖ [FA2->Info]:
‖   Contract: KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w
‖     Balance: 0 mutez
‖     Administrator: "tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe"
‖     Status: Ready
‖     Tokens-big-map: 26
‖     Ledger-big-map: 24
‖     Operators-big-map: 25
‖     All-Tokens: 0 = TQ0.
‖                 1 = TQ1.
‖     Known-Owners-and-Operators:
‖       * Owner: "tz1MUP3sCWTUQRG2Hon7uhRfmuYZ4guEQntS"
‖         - Operator: "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" -> [0, 1]
‖         - Balance: 999990 TQ0(0)
‖         - Balance: 1890 TQ1(1)
‖       * Owner: "tz1YYrxf529d3EYzEv5TnsiTpRCzFFB87dAS"
‖         - Operator: "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" -> [0, 1]
‖         - Balance: 10 TQ0(0)
‖         - Balance: 100 TQ1(1)
‖       * Owner: "tz1TyFYCuKrQ7A3yB4AvpoPRLacb3J6iQB9V"
‖         - Operator: "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" -> [0, 1]
‖         - Balance: 10 TQ1(1)
‖       * Owner: "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" [0 ops] [0 toks]
```

Finally, let's get `operator` to run a _batch-transfer-heist_ of all the tokens:

```text
 $ fatoo fund-address \
         "${operator_pkh}" \
         2_000_000_000

‖ [FA2->Info]: Balance for tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85 is now
‖   5999358655 mutez.
```

```text
 $ fatoo call-transfer \
         "from:${owner0_pkh} to:${operator_pkh} amount: 999990 token: 0" \
         "from:${owner0_pkh} to:${operator_pkh} amount: 1890 token: 1" \
         "from:${owner1_pkh} to:${operator_pkh} amount: 10 token: 0" \
         "from:${owner1_pkh} to:${operator_pkh} amount: 100 token: 1" \
         "from:${owner2_pkh} to:${operator_pkh} amount: 10 token: 1" \
         --source "${operator_sk}" \
         --address "$(cat kt1_mutran_contract.txt)"
┃ { Pair "tz1MUP3sCWTUQRG2Hon7uhRfmuYZ4guEQntS" { Pair "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" (Pair 0 999990) ; Pair "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" (Pair 1 1890)} ; Pair "tz1YYrxf529d3EYzEv5TnsiTpRCzFFB87dAS" { Pair "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" (Pair 0 10) ; Pair "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" (Pair 1 100)} ; Pair "tz1TyFYCuKrQ7A3yB4AvpoPRLacb3J6iQB9V" { Pair "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" (Pair 1 10)}}

```

We can then observe the resulting state where all the balances are `0` except for `operator` who owns the total supply:

```text
 $ fatoo show-storage "$(cat kt1_mutran_contract.txt)" \
         --known-address "$(cut -d, -f 3 owner0.csv)" \
         --known-address "$(cut -d, -f 3 owner1.csv)" \
         --known-address "$(cut -d, -f 3 owner2.csv)" \
         --known-address "$(cut -d, -f 3 operator.csv)"
‖ [FA2->Info]:
‖   Contract: KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w
‖     Balance: 0 mutez
‖     Administrator: "tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe"
‖     Status: Ready
‖     Tokens-big-map: 26
‖     Ledger-big-map: 24
‖     Operators-big-map: 25
‖     All-Tokens: 0 = TQ0.
‖                 1 = TQ1.
‖     Known-Owners-and-Operators:
‖       * Owner: "tz1MUP3sCWTUQRG2Hon7uhRfmuYZ4guEQntS"
‖         - Operator: "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" -> [0, 1]
‖         - Balance: 0 TQ0(0)
‖         - Balance: 0 TQ1(1)
‖       * Owner: "tz1YYrxf529d3EYzEv5TnsiTpRCzFFB87dAS"
‖         - Operator: "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" -> [0, 1]
‖         - Balance: 0 TQ0(0)
‖         - Balance: 0 TQ1(1)
‖       * Owner: "tz1TyFYCuKrQ7A3yB4AvpoPRLacb3J6iQB9V"
‖         - Operator: "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" -> [0, 1]
‖         - Balance: 0 TQ1(1)
‖       * Owner: "tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85" [0 ops]
‖         - Balance: 1000000 TQ0(0)
‖         - Balance: 2000 TQ1(1)
```

#### Retrieve The Contract's Balance

The build of the contract we originated above has an extra entry-point to be able to transfer the balance of the contract, e.g. in case somebody accidentally transfers μꜩ to the contract.

So let's imagine than after the above heist, `operator` wants to publicly tip/bribe the contract's administrator\(s\) by going through the contract itself \(this may be a convoluted excuse to put XTZ on the contract …\). We call the `transfer` entry-point with an empty list of transfer-items but with a few XTZ as amount:

```text
 $ tezos-client import secret key operator \
                "${operator_sk}" --force
   tezos-client transfer 1_000 from operator \
                to "$(cat kt1_mutran_contract.txt)" \
                --entrypoint transfer \
                --arg '{}' --burn-cap 1
┃ 
┃ ...
┃ 
┃       Balance updates:
┃         tz1NkpWhHsBSZHPg2Ljz2hycRiZvcYdcyu85 ... -ꜩ1000
┃         KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w ... +ꜩ1000
┃ The operation has only been included 0 blocks ago.
┃ We recommend to wait more.
┃ Use command
┃   tezos-client wait for op3KWkf8zB431zBCkK5KYxHKRResGrri95vcQmxFyiJnUtg2S8Z to be included --confirmations 30 --branch BMTLWbbEZGgzNyqtvfdFA4mrhAXAheGUUtmCrTVvBYpP9oZinP5
┃ and/or an external block explorer.
```

We see that `fatoo` shows a non-zero balance for the contract now:

```text
 $ fatoo show-storage "$(cat kt1_mutran_contract.txt)"
‖ [FA2->Info]:
‖   Contract: KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w
‖     Balance: 1000000000 mutez
‖     Administrator: "tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe"
‖     Status: Ready
‖     Tokens-big-map: 26
‖     Ledger-big-map: 24
‖     Operators-big-map: 25
‖     All-Tokens: 0 = TQ0.
‖                 1 = TQ1.
‖     Known-Owners-and-Operators: None
```

Let's make `admin` retrieve that money for themselves; the entry-point is called `mutez_transfer` and takes a pair `mutez × address`:

```text
 $ tezos-client import secret key admin \
                "${admin_sk}" --force
   tezos-client transfer 0 from admin \
                to "$(cat kt1_mutran_contract.txt)" \
                --entrypoint mutez_transfer \
                --arg "Pair 1000000000 \"${admin_pkh}\"" \
                --burn-cap 1
┃ 
┃ ...
┃ 
┃         Balance updates:
┃           KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w ... -ꜩ1000
┃           tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe ... +ꜩ1000
┃ The operation has only been included 0 blocks ago.
┃ We recommend to wait more.
┃ Use command
┃   tezos-client wait for oooyQH1YZnngpPaf8KDuVStqQEnq7Y2XD1LRoQTnnWjJ4zZkaeg to be included --confirmations 30 --branch BLu5hPEMU3KBawfcRcDgsbMAoBrXGKT2r555seMpaiN7yhiePPX
┃ and/or an external block explorer.
```

We see that the balance is gone from the KT1:

```text
 $ fatoo show-storage "$(cat kt1_mutran_contract.txt)"
‖ [FA2->Info]:
‖   Contract: KT1Qmqtc6pYnivEkR1Pedt684XSH4RjmoU6w
‖     Balance: 0 mutez
‖     Administrator: "tz1ZnxqPNMXyiZLTANYJLJ9ZTBpQ5Qu16BXe"
‖     Status: Ready
‖     Tokens-big-map: 26
‖     Ledger-big-map: 24
‖     Operators-big-map: 25
‖     All-Tokens: 0 = TQ0.
‖                 1 = TQ1.
‖     Known-Owners-and-Operators: None
```

… and see that `admin` is wealthier:

```text
 $ tezos-client get balance for \
                "${admin_pkh}"
┃ 5057.816076 ꜩ
‖ Warning:  the --addr --port --tls options are now deprecated; use --endpoint instead
```

### Further Reading

Hopefully this tutorial introduced the FA2-SmartPy implementation of FA2 from a user's perspective. Please provide any feedback using the repository's [issues](https://gitlab.com/smondet/fa2-smartpy/-/issues). Further reading includes:

* the TZIP-12 [specification](https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-12/tzip-12.md) itself;
* the implementation source code [`multi_asset.py`](https://gitlab.com/smondet/fa2-smartpy/-/blob/master/multi_asset.py);
* the Agora \(blog\) [post](https://forum.tezosagora.org/t/implementing-fa2-an-update-on-the-fa2-specification-and-smartpy-implementation-release/1870) introducing the project;
* 🚧 and more to come … 👷

