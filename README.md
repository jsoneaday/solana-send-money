By David Choi

Solana sample app to show wallet connection, message send, and lamport send.

The video explaining this code is here https://youtu.be/wVPGJ_CZTAw


#### To use this react app do the following, assuming that you have Solana keygen setup

1. Run ``` npm install ```
2. Run this ``` solana config set --url https://api.devnet.solana.com ``` to shift cluster to devnet.
3. Start the cluster using this command  ```solana-test-validator```
4. Run ```npm start```
5. Try sending Lamport to another devnet address.
6. You can also check wallet balance using https://www.sollet.io/