---
hide_table_of_contents: true
sidebar_position: 1
title: "Setting up a Tezos Baker"
hide_title: true
---
## Setting up a Tezos Baker

### Baking with Kiln

[Kiln](https://tezos-kiln.org) is a GUI-based tool for baking on the Tezos blockchain through an easy-to-use UI. Installing Kiln on MacOS, Ubuntu, and other Debian Linux distributions intends to be straightforward, intuitive, and does not require the use of the command line.

#### Key Resources

* [Kiln homepage](https://Tezos-kiln.org)
* [How to install Kiln on MacOS Catalina](https://medium.com/tezos-kiln/how-to-install-kiln-on-macos-catalina-ce0821f97dcf)
* [How to Install Kiln Ubuntu](https://medium.com/kiln/how-to-install-kiln-and-bake-on-ubuntu-a13d17df63c)

### Baking from the CLI

First, let's make sure you have the minimum requirements to run a node on your PC. It takes about 15 minutes to setup a node, just follow the step-by-step instructions and you will be be Baking in no time. Additionally, you can bake using an application called Kiln, in which you can easily setup a Baker through the GUI, but first let's go through the traditional route using command line.

**System Requirements**

* Disk: 100 GB SSD \(SSD is highly recommended over HDD\)
* Memory: Recommended RAM for running a Tezos Node is 8GB
* CPU: Running with at least 2 cores is recommended
* Wallet: Hardware Security Modules \(HSMs\), such as a Ledger Nano S or X

Tezos nodes are run on many different systems, including AWS and Azure. For reference, we are offering two setups: one on Ubuntu Linux, which is suitable also for a 24x7x365 server, andone on macOS, which is suitable for learning about the Tezos ecosystem.

**Ubuntu Linux:**

**Install the libraries that Tezos is dependent on \(~1 minute\)**

```text
sudo apt-get install build-essential git m4 unzip rsync curl
bubblewrap libev-dev libgmp-dev pkg-config libhidapi-dev
jbuilder -y
```

**Pull down the source code from the git repository \(~1 minute\)**

```text
git clone https://gitlab.com/tezos/tezos.git
cd tezos
git checkout latest-release
git rev-parse HEAD
cd
```

> The resulting hash of “git rev-parse HEAD” should be the same as the one above and if you have a later version of the software then these instructions may not be complete.

**Install the OPAM the package manager for OCaml \(~2 minutes\)**

```text
sudo add-apt-repository ppa:avsm/ppa
sudo apt update
sudo apt install opam
opam init
opam update
eval $(opam env)
```

> answer with ‘y’ or just return to all prompts

**Building Tezos from source \(~4 minutes\)**

> Note: When you run ‘make build-deps’ you will see: ‘\[ERROR\] No repository tezos found’, you can ignore this error.
>
> ```text
> cd tezos
> make build-deps
> make
> ```
>
> answer ‘y’ to all prompts

**Setting up your Tezos Node**

**Create the node identity \(~1 minute\)**

The identity information and chain are stored in the directory ./tezos-node in your home directory.

`./tezos-node identity generate`

**Start-up the node**

If you want to run the node and baking processes in their own process not attached to a terminal process then install [screen](https://linuxize.com/post/how-to-use-linux-screen/). The advantage of using ‘screen’ is that the process continues to run even if the terminal is closed.

`sudo apt install screen -y`

Run from a terminal \(currently takes over a week to sync\). You can also redirect the output to a log file so you can monitor the process.

```text
screen -S TezosMainNode
./tezos-node run --connections 20 --log-output $HOME/tezos.log`
Ctrl+a d
```

> The “Ctrl+a d” \(press and hold down the control key and then press the letter a, release both and press the letter d\) takes you out of the screen process but you can see the tezos node process running using the ps command.

`ps -ef | grep tezos`

To re-enter the screen process then you just re-attach to that screen. Useful if you want to kill the process.

`screen -r TezosMainNode`

If you want to view the logs in real-time then you can tail the log file.

`tail -f $HOME/tezos.log`

**Generating a Tezos Key**

The keys are stored in the directory ./tezos-client in your home directory. This is an important directory to backup. The -f option “forces” the key to be encrypted and so you will be prompted for a password, without it will create an unencrypted key.

`./tezos-client gen keys my_account -f`

**Let’s start Baking!**

The first step is to activate the account for baking so that you start to get baking and endorsement rights. It will take at least 2 cycles before you get rights in a snapshot and 5 cycles before you start to bake \(a cycle is just under 3 days\). So once you have activated, you won’t need to start your baker and endorsement processes for 21 days although it doesn’t matter if you start them straight away so they are ready to go. You also need to fund your baking address with at least 1 roll \(1 roll = 8,000 tez\); you don’t want to miss your first block or endorsement!

`./tezos-client register key <baking_address> as delegate`

to run a baker, endorser, and accuser in screen processes then replace  with your baking address below.

```text
screen -S TezosBaker
./tezos-baker-008-PsEDO run with local node ~/.tezos-node
<baking_address>
Ctrl+a d
screen -S TezosEndorser
./tezos-endorser-008-PsEDO run <baking_address>
Ctrl+a d
screen -S TezosAccuser
./tezos-accuser-008-PsEDO run
Ctrl+a d
```

**Using MacOS**

This section only applies to you if you want to bake using MacOS, most of the steps are the same as above except you will need to install the package managers in order to set up your node.

**Homebrew package manager \(~1 minute\)**

The macOS doesn’t have any installed package managers so the first step is to install the homebrew package manager.

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

**Install the libraries that Tezos is dependent on \(~1 minute\)**

`brew install hidapi libev`

On Catalina you may see the following error if you have xcode installed:

`“xcrun: error: invalid active developer path(/Library/Developer/CommandLineTools), missing xcrun at:/Library/Developer/CommandLineTools/usr/bin/xcrun”` If this is the case then run the following command to update your xcode install and restart the terminal \(~5 minutes\)

`xcode-select --install`

You are now ready to go ahead and install the node from the instructions above!

#### Do I need to sync the whole blockchain to set up a node?

**Fast sync from a mainnet snapshot**

No! You don't need to sync the entire blockchain, a snapshot will allow you to sync the chain in a few minutes, when setting up a new node you will by default download the entire history of the chain. You can skip this section if you are not starting from a snapshot and syncing the full chain. If you do start a node from a snapshot then an up-to-date snapshot can be downloaded from [Tezos Giganode](https://snapshots-tezos.giganode.io). An imported up-to-date snapshot will bring the disk space down from 50GB to 12GB

#### How do I particpate in the on-chain voting as Baker?

**Voting**

With a baker up and running, a vital part of participation is voting on proposals to upgrade the Tezos protocol. Proposals for Tezos go through a governance mechanism with 5 periods: Proposal &gt; Exploration &gt; Testing &gt; Promotion &gt; Adoption. You can track the latest proposals and learn about Tezos governance at [Tezos Agora](https://www.tezosagora.org).

**When new proposals are injected you can vote with the following commands**

`tezos-client submit proposals for <YOUR_ADDRESS> <proposal_name>`

When submitting a proposal, the baker is also submitting a vote for that proposal, equivalent to the number of rolls in its staking balance at the start of the period.

Once reaching a 5% Quorum in the proposal phase, then the proposal will go to the next phase which is Exploration, which requires a baker to vote. If reaching quorum with ‘yay’, then testing will apply which requires no action from the baker. After the testing phase, the proposal goes through its final phase which is Promotion, which requires bakers to vote and reach quorum. If the proposal reaches quorum with ‘yay’, then the proposal moves on to the adoption phase. The Adoption Period provides a "cool-down" allowing developers and bakers some additional time to adapt their code and infrastructure. After the Adoption phase the proposal will automatically be implemented and upgrade the Tezos protocol. The quorum is a minimum participation threshold; so if a baker votes ‘yay’, ‘nay’, or ‘pass’, that contributes to the quorum of the governance mechanism.

Voting Command for Exploration and Promotion phase

`tezos-client submit ballot for <YOUR_ADDRESS> <proposal_name> <yay|nay|pass>`

