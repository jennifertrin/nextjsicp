# How to deploy a Next.js app on-chain

This article provides an overview of how to deploy a Next.js React frontend application on-chain. The example deploys a token drop starter application built using the [Thirdweb SDK](https://thirdweb.com/) onto the [Internet Computer](https://internetcomputer.org/). 

>> Note: Don’t just stop there though! You can deploy a full-stack application with a backend and frontend on the Internet Computer. Check out our documentation to learn more: [https://internetcomputer.org/docs](https://internetcomputer.org/docs)

## Why Deploy On-Chain
Deploying an application on-chain unlocks various use cases that are not achievable if deployed on a centralized server such as Vercel or Netlify.

### Governance
Multiple contributors develop applications with community organizations such as decentralized autonomous organizations (DAOs). By deploying an application on-chain, DAOs can require multiple contributors or community members to review and approve the update before it goes live.

DAOs can establish different types of reviews based on membership. For example, only members who are certified developers can review code quality while members who are focused on marketing and content can review content and UX.

Think of it as **on-chain peer reviews.**

### Own Your Website
We currently own cryptocurrency and NFTs on the blockchain. The Internet Computer smart contracts can store up to 96 GB of stable memory, allowing for the storage of new larger types of data and applications on-chain. 

Think of websites as a **new asset class on the blockchain**. 

## Tutorial 

### Your Next.js Project
This tutorial assumes that you already have a Next.js application that you would like to deploy on-chain.

We are deploying this [ERC-20 Token Drop starter project](https://github.com/thirdweb-example/token-drop) from ThirdWeb.

You can run this command to create a project from this same starter project. 

```
npx thirdweb create --template token-drop
```

Make sure to choose Next.js and Typescript as options. 

### Download and start DFX

[DFX](https://internetcomputer.org/docs/current/references/cli-reference/) is the command-line execution environment that serves as the primary tool for creating, deploying, and managing dapps on the Internet Computer. 

Run the following commands to install and run DFX.

```
sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"
dfx --version
dfx start --background
```
For more information on how to install DFX, please check out [this link](https://support.dfinity.org/hc/en-us/articles/10552713577364-How-do-I-install-dfx-).

### Build your Next.js application

You must also generate and point the static files of a properly-built Next.js application for deployment on the Internet Computer.

In order to generate the static files of a Next.js application, add this to your ```next.config.js``` file:

```
output: 'export'
```
Your next.config.js file should look similar to this. Please note that you may have existing settings that you should avoid overriding. 

```
const nextConfig = {
  output: 'export',
};
```
Build your Next.js application by running the following command:

```npx run build```

This should now generate an ```out``` folder which consists of the static assets that make up the website.

In the next step, we will instruct the Internet Computer to deploy the website on-chain using these static files. 

When deploying on the Internet Computer, these static files are not public to anyone including the nodes. Only the WASM file which is a binary instruction file which does not leak any of your code is public to nodes. 

### Create a dfx.json file
In the top-level directory of your repository, at the source of add a ```dfx.json``` file and add the following:

```
{
    "canisters": {
      "erc20icp": {
        "frontend": {
          "entrypoint": "out/index.html"
        },
        "source": ["out"],
        "type": "assets"
      }
    },
    "output_env_file": ".env"
}
```
```dfx.json``` is the configuration file for deploying all of your code to canister smart contracts on the Internet Computer mainnet or production environment.

Please note that you can adjust the following:

**erc20icp** - name of the canister smart contract

Also, make sure that these do point to the correct file:
```
"entrypoint": "out/index.html"
```

and folder:

```
 "source": ["out"],
```

### Run dfx generate

Run the following command to generate the correct types.

```
dfx generate
```

### Deploy application to the Internet Computer


Run the following command to deploy the Next.js application locally:

```
dfx deploy
```

Run the following command to deploy the Next.js application on the Internet Computer mainnet or production environment:

```
dfx deploy --network ic
```

After running this command, you will see a generated link where you can navigate to your Next.js application.
