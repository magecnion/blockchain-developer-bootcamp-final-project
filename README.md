# :lock:NFog:unlock:

NFog is a descentralized application which gives you the power of creating you own ~~secret~~ foggy NFT. When you create an NFog the text content is encrypted and only the owner is able to desencrypt and then view it. Once the NFog was desencrypted it is marked as `open`. As buyer the main value is to buy something that is not open, even you can buy some NFog close and then to sell it without opening.

For creating, see opening info and decrypt/view content go to [NFog web](https://nfog.netlify.app/)

For trading the marketplace available is [OpenSea](https://testnets.opensea.io/)

Address of the author: `0x2f947703b818B44A0d657f7435a2865454BE7D21`

# Table of Contents
- [Getting started](#getting-started)
    - [Directory structure](#directory-structure)
    - [How to run client locally](#how-to-run-client-locally)
    - [How to compile](#how-to-compile)
- [UX decisions](#ux-decisions)
- [Dapp](#dapp)
    - [Walkthrough](#walkthrough)
    - [Create a NFog](#create-a-nfog)
    - [Open a NFog](#open-a-nfog)
    - [View a NFog](#view-a-nfog)
- [NFT Metadata](#nft-metadata)
- [Avoiding common attacks](./docs/avoiding_common_attacks.md)
- [Design pattern desicions](./docs/design_patterns_desicions.md)
- [Deployed address](./deployed_address.txt)

# Getting started

## Directory structure

```sh
├── client                              # Frontend react client application
├── contracts                           # Contracts solidity code
├── deploy                              # Scripts for deploying to blockchain
├── deployments                         # Network deployments information
├── docs                                # Docs related to design decisions
│   ├── avoiding_common_attacks.md           
│   ├── design_pattern_decisions.md
└── test                                # Solidity testing files
```
## How to run client locally

Go to `client` folder and run `npm ci` and then `npm start`. You will need to have configured the following .env file:
```
REACT_APP_PINATA_API_KEY=
REACT_APP_PINATA_SECRET_API_KEY=
REACT_APP_PINATA_URL=https://api.pinata.cloud/pinning/
REACT_APP_MUMBAI_KEY=
REACT_APP_RINKEBY_KEY=
```

## How to test

Go to root project folder and run `npm ci` and then `npm run test`

## How to compile

Go to root project folder and run `npm ci` and then `npm run compile`

# UX decisions

It is desirable that a user can visit the app and visualize what exists even though he or she can't interact with the dapp. For that reason the UX was designed so you can see the NFog created and if they are open or not, also you can go to the market place and see its movements.

# Dapp

## Walkthrough

[![youtube link](https://img.youtube.com/vi/APRJfJTKDvM/0.jpg)](https://www.youtube.com/watch?v=APRJfJTKDvM)

## Create a NFog

First you need to have you metamask wallet connected to the dapp. There is two networks available (rinkeby and mumbai), this means that is needed to be in the correct network to be able to use the dapp: create a NFog, open it...

## Open a NFog

Being in the correct network you will be able to open yours NFog. Each NFog shows in which network was created. The lock shows if it has been already open.

## View a NFog

After opening the NFog you will be able to view it, since this moment the NFog is not to be closed anymore


# NFT Metadata

NFog metadata it is upload to IPFS following this format:
```
{
 "name": "<string>",
 "description": "<string>",
 "image": "https://ipfs.io/ipfs/<cid>",
 "content":  "https://ipfs.io/ipfs/<cid>" 
}
```
- `image`: result of uploading to ipfs a color (hexadecimal format) that depends on encrypted content
- `content`: content encrypted

Notice that if you encrypt the same data the obtained color is the same, like a hash function
```
hash(encrypted_content) = color
```
In this way we can see if the same secret is duplicated


